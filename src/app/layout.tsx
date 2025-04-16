import type { Metadata } from 'next';
import { Comic_Neue } from 'next/font/google';

import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { PrivyProvider } from '@privy-io/react-auth';
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
  title: 'ARI - Artificial Retard Intelligence for Solana',
  description: 'The Retarded Copilot for Solana: Elevate your Solana experience with AI-powered insights and delegated actions',
  icons: {
    icon: '/logo.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const privyAppId = process.env.NEXT_PUBLIC_PRIVY_APP_ID;
  
  if (!privyAppId) {
    return (
      <html lang="en">
        <body>
          <div className="flex h-screen items-center justify-center">
            <p className="text-red-500">
              Error: Privy app ID not configured. Please check the environment variables.
            </p>
          </div>
        </body>
      </html>
    );
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          `${comicNeue.variable}`,
          'overflow-x-hidden antialiased font-comic-sans',
        )}
      >
        <PrivyProvider
          appId={privyAppId}
          config={{
            loginMethods: ['email', 'wallet'],
            appearance: {
              theme: 'dark',
              accentColor: '#6366f1', // indigo-600
              logo: '/logo.svg',
            },
            embeddedWallets: {
              createOnLogin: 'users-without-wallets',
              noPromptOnSignature: true,
            },
          }}
        >
          {children}
          <Toaster position="top-right" />
          <Analytics />
          <SpeedInsights />
        </PrivyProvider>
      </body>
    </html>
  );
}
