import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import localFont from 'next/font/local';

import '@/core/globals.css';

const interSans = Inter({
  variable: '--font-inter-sans',
  subsets: ['latin'],
  display: 'swap',
});

const googleSans = localFont({
  variable: '--font-google-sans',
  src: [
    {
      path: '../core/fonts/GoogleSans-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    // {
    //   path: '../core/fonts/GoogleSans-Italic.woff2',
    //   weight: '400',
    //   style: 'italic',
    // },
    {
      path: '../core/fonts/GoogleSans-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    // {
    //   path: '../core/fonts/GoogleSans-MediumItalic.woff2',
    //   weight: '500',
    //   style: 'italic',
    // },
    {
      path: '../core/fonts/GoogleSans-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
    // {
    //   path: '../core/fonts/GoogleSans-BoldItalic.woff2',
    //   weight: '700',
    //   style: 'italic',
    // },
  ],
});

export const metadata: Metadata = {
  title: 'MS',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${interSans.variable} ${googleSans.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
