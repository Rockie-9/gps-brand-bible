import Anthropic from '@anthropic-ai/sdk';
import { NextRequest, NextResponse } from 'next/server';
import {
  COMPLIANCE_SYSTEM_PROMPT,
  AUDIENCE_CONTEXTS,
  PURPOSE_CONTEXTS,
} from '@/lib/compliance-prompt';

const anthropic = new Anthropic();

export async function POST(request: NextRequest) {
  try {
    const { text, audience, purpose } = await request.json();

    if (!text || typeof text !== 'string' || text.trim().length === 0) {
      return NextResponse.json(
        { error: 'Text input is required.' },
        { status: 400 }
      );
    }

    if (text.length > 10000) {
      return NextResponse.json(
        { error: 'Text exceeds maximum length of 10,000 characters.' },
        { status: 400 }
      );
    }

    let userPrompt = `Analyze this text for GPS brand compliance:\n\n---\n${text}\n---`;

    if (audience && AUDIENCE_CONTEXTS[audience]) {
      userPrompt += `\n\nAudience context: ${AUDIENCE_CONTEXTS[audience]}`;
    }

    if (purpose && PURPOSE_CONTEXTS[purpose]) {
      userPrompt += `\n\nPurpose context: ${PURPOSE_CONTEXTS[purpose]}`;
    }

    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 2048,
      system: COMPLIANCE_SYSTEM_PROMPT,
      messages: [{ role: 'user', content: userPrompt }],
    });

    const responseText =
      message.content[0].type === 'text' ? message.content[0].text : '';

    let result;
    try {
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      result = jsonMatch ? JSON.parse(jsonMatch[0]) : { error: 'Failed to parse response', raw: responseText };
    } catch {
      result = { error: 'Failed to parse AI response', raw: responseText };
    }

    return NextResponse.json(result);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    const status = (error as { status?: number })?.status;

    if (status === 429) {
      return NextResponse.json(
        { error: 'Rate limited. Please wait a moment and try again.' },
        { status: 429 }
      );
    }

    return NextResponse.json(
      { error: `AI service error: ${message}` },
      { status: 500 }
    );
  }
}
