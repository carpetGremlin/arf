'use client';

import { useState, useEffect } from 'react';
import { usePrivy, useWallets } from '@privy-io/react-auth';
import Image from 'next/image';
import Link from 'next/link';
import { toast } from 'sonner';

import LogoutButton from '@/components/logout-button';

export default function HomePage() {
  const { user, authenticated, ready } = usePrivy();
  const { wallets } = useWallets();
  const [mainWallet, setMainWallet] = useState<string | null>(null);

  useEffect(() => {
    // Find the first embedded wallet or connected wallet
    if (wallets && wallets.length > 0) {
      const embeddedWallet = wallets.find(w => w.walletClientType === 'privy');
      const firstWallet = embeddedWallet || wallets[0];
      
      if (firstWallet?.address) {
        setMainWallet(firstWallet.address);
        // Display welcome toast only on initial load
        toast.success('Successfully logged in!');
      }
    }
  }, [wallets]);

  // Show loading state while Privy initializes
  if (!ready) {
    return (
      <div className="flex h-screen items-center justify-center bg-black">
        <div className="text-center">
          <div className="inline-block h-16 w-16 animate-spin rounded-full border-4 border-indigo-500 border-t-transparent"></div>
          <p className="mt-4 text-white">Loading...</p>
        </div>
      </div>
    );
  }

  // Redirect is handled by middleware, but this is a fallback
  if (ready && !authenticated) {
    return (
      <div className="flex h-screen items-center justify-center bg-black">
        <div className="text-center">
          <p className="text-white">Please login to access this page</p>
          <Link 
            href="/"
            className="mt-4 inline-block rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
          >
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between p-4">
          <div className="flex items-center gap-2">
            <Image 
              src="/logo.svg" 
              alt="Logo" 
              width={32} 
              height={32} 
              className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 p-1"
            />
            <span className="text-lg font-bold">ARI</span>
          </div>
          
          <div className="flex items-center gap-4">
            {mainWallet && (
              <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-white/70">
                {mainWallet.slice(0, 6)}...{mainWallet.slice(-4)}
              </div>
            )}
            <LogoutButton />
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto px-4 pt-24">
        <div className="rounded-xl border border-white/10 bg-white/5 p-6">
          <h1 className="mb-4 text-2xl font-bold">Welcome, {user?.email?.address || 'User'}</h1>
          
          <p className="mb-6 text-white/70">
            This is a protected page only accessible to authenticated users.
          </p>
          
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-lg border border-indigo-500/20 bg-indigo-500/10 p-4">
              <h2 className="mb-2 text-xl font-semibold">Your Wallets</h2>
              {wallets && wallets.length > 0 ? (
                <ul className="space-y-2">
                  {wallets.map((wallet) => (
                    <li key={wallet.address} className="text-sm text-white/70">
                      {wallet.walletClientType === 'privy' ? '🔒 ' : '🔗 '}
                      {wallet.address.slice(0, 10)}...{wallet.address.slice(-6)}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-white/70">No wallets connected.</p>
              )}
            </div>
            
            <div className="rounded-lg border border-cyan-500/20 bg-cyan-500/10 p-4">
              <h2 className="mb-2 text-xl font-semibold">Get Started</h2>
              <p className="text-sm text-white/70">
                Connect additional wallets or explore the ARI Copilot to enhance your Solana experience.
              </p>
              <button 
                className="mt-4 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 px-4 py-2 text-sm font-medium text-white"
                onClick={() => toast.info('Feature coming soon!')}
              >
                Launch ARI Copilot
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 