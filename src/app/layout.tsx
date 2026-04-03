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
      <body className="lang-en">{children}</body>
    </html>
  );
}
