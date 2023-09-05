import './globals.css';
import 'react-toastify/dist/ReactToastify.css';

import type { Metadata } from 'next';
import { Open_Sans } from 'next/font/google';

import { ThemeProvider } from '@/components/providers/theme-provider';
import ToastProvider from '@/components/providers/toast-provider';
import QueryProvider from '@/components/providers/query-provider';

const font = Open_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: `Discord Clone`,
  description: 'A discord clone',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en">
      <body className={font.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          storageKey="discord-theme"
        >
          <QueryProvider>
            <ToastProvider />
            {children}
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
