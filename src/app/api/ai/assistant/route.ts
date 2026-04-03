import Anthropic from '@anthropic-ai/sdk';
import { NextRequest } from 'next/server';
import { ASSISTANT_SYSTEM_PROMPT, TEMPLATES } from '@/lib/assistant-prompt';

const anthropic = new Anthropic();

export async function POST(request: NextRequest) {
  try {
    const { messages, template, image } = await request.json();

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return Response.json({ error: 'Messages are required.' }, { status: 400 });
    }

    // Build message content with optional template prepend and image
    const processedMessages = messages.map(
      (msg: { role: 'user' | 'assistant'; content: string }, idx: number) => {
        if (idx === messages.length - 1 && msg.role === 'user') {
          const contentParts: Anthropic.MessageCreateParams['messages'][0]['content'] = [];

          // Add image if provided
          if (image) {
            const mediaType = image.startsWith('data:image/png')
              ? 'image/png'
              : image.startsWith('data:image/gif')
                ? 'image/gif'
                : image.startsWith('data:image/webp')
                  ? 'image/webp'
                  : 'image/jpeg';
            const base64Data = image.replace(/^data:image\/\w+;base64,/, '');
            contentParts.push({
              type: 'image' as const,
              source: { type: 'base64' as const, media_type: mediaType, data: base64Data },
            });
          }

          // Add template context + user text
          let text = msg.content;
          if (template && TEMPLATES[template]?.prompt) {
            text = `[Template: ${TEMPLATES[template].nameEn}]\n${TEMPLATES[template].prompt}\n\nUser request: ${text}`;
          }
          contentParts.push({ type: 'text' as const, text });

          return { role: msg.role, content: contentParts };
        }
        return { role: msg.role, content: msg.content };
      }
    ) as Anthropic.MessageCreateParams['messages'];

    // Stream the response
    const stream = anthropic.messages.stream({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 4096,
      system: ASSISTANT_SYSTEM_PROMPT,
      messages: processedMessages,
    });

    const encoder = new TextEncoder();

    const readableStream = new ReadableStream({
      async start(controller) {
        try {
          for await (const event of stream) {
            if (
              event.type === 'content_block_delta' &&
              event.delta.type === 'text_delta'
            ) {
              controller.enqueue(
                encoder.encode(`data: ${JSON.stringify({ text: event.delta.text })}\n\n`)
              );
            }
          }
          controller.enqueue(encoder.encode('data: [DONE]\n\n'));
          controller.close();
        } catch (err) {
          const msg = err instanceof Error ? err.message : 'Stream error';
          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify({ error: msg })}\n\n`)
          );
          controller.close();
        }
      },
    });

    return new Response(readableStream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
      },
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    const status = (error as { status?: number })?.status;

    if (status === 429) {
      return Response.json(
        { error: 'Rate limited. Please wait a moment and try again.' },
        { status: 429 }
      );
    }

    return Response.json({ error: `AI service error: ${message}` }, { status: 500 });
  }
}
