import type { Metadata } from 'next';
import { Comic_Neue } from 'next/font/google';

import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

import AuthProviders from '@/components/provider-auth';
import { ThemeProvider } from '@/components/provider-theme';
import { Toaster } from '@/components/ui/sonner';
import { cn } from '@/lib/utils';

import './globals.css';

// Use Comic Neue as our main font
const comicNeue = Comic_Neue({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-comic-neue',
});

export const metadata: Metadata = {
  title: {
    template: '%s | Artificial Retard Intelligence',
    default: 'Artificial Retard Intelligence - The Intelligent Copilot for Solana',
  },
  description: 'The Intelligent Copilot elevating your Solana experience.',

  icons: {
    icon: '/logo.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          `${comicNeue.variable}`,
          'overflow-x-hidden antialiased font-comic-sans',
        )}
      >
        <AuthProviders>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <main className="sticky bottom-0 overflow-hidden md:overflow-visible">
              {children}
              <Toaster />
            </main>
          </ThemeProvider>
        </AuthProviders>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
