import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'GPS Brand Bible — Mega Portal v4.0',
  description: 'TSMC Global Physical Security Brand Standards Portal',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,300;0,400;0,700;0,900;1,300;1,400&family=Noto+Sans+TC:wght@300;400;500;700&family=DM+Serif+Display:ital@0;1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="lang-en">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-white focus:text-turquoise-600 focus:rounded-md focus:shadow-lg"
          style={{ fontSize: '12px', fontWeight: 700 }}
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
