import './globals.css';

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const font = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: `Web app`,
  description: 'A web app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html data-theme="dark" lang="en">
      <body className={font.className}>{children}</body>
    </html>
  );
}
