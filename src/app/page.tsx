'use client';

import { useRef } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { useLogin } from '@privy-io/react-auth';
import { GitHubLogoIcon } from '@radix-ui/react-icons';
import { BookOpen as BookOpenIcon } from 'lucide-react';

import { cn } from '@/lib/utils';

// UI Components
const Header = ({ handleLogin }: { handleLogin: () => void }) => {
  return (
    <div className="fixed left-0 right-0 top-0 z-50">
      <div className="mx-auto max-w-7xl px-4 py-6">
        <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/70 p-4 backdrop-blur-xl">
          <div className="flex items-center gap-2">
            <Image 
              src="/logo.svg" 
              alt="Logo" 
              width={42} 
              height={42} 
              className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 p-1.5 shadow-lg"
            />
            <span className="text-lg font-bold text-white">ARI</span>
          </div>
          
          <div className="hidden md:flex md:items-center md:gap-8">
            <Link 
              href="https://github.com/artificial-retard-intelligence" 
              target="_blank"
              className="flex items-center gap-2 text-sm font-medium text-white/70 transition-colors hover:text-white"
            >
              <GitHubLogoIcon className="h-4 w-4" />
              GitHub
            </Link>
            <Link 
              href="https://docs.artificial-retard-intelligence.com" 
              target="_blank"
              className="flex items-center gap-2 text-sm font-medium text-white/70 transition-colors hover:text-white"
            >
              <BookOpenIcon className="h-4 w-4" />
              Docs
            </Link>
          </div>
          
          <button
            onClick={handleLogin}
            className="flex items-center justify-center rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 px-5 py-2.5 font-medium text-white shadow-lg shadow-indigo-500/25 transition-all duration-300 hover:scale-105 hover:shadow-indigo-500/40"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

const Hero = ({ handleLogin }: { handleLogin: () => void }) => {
  const heroRef = useRef<HTMLDivElement>(null);
  
  return (
    <section className="relative min-h-screen overflow-hidden bg-black pt-32 md:pt-36" ref={heroRef}>
      {/* Background gradient effects */}
      <div className="absolute left-1/4 top-1/3 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/20 blur-[120px]" />
      <div className="absolute right-1/4 top-2/3 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-600/20 blur-[100px]" />
      <div className="absolute left-2/3 top-1/4 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/20 blur-[80px]" />
      
      {/* Grid lines overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(17,17,34,0.8)_1px,transparent_1px),linear-gradient(90deg,rgba(17,17,34,0.8)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      
      <div className="relative z-10 mx-auto max-w-6xl px-4 text-center">
        <div className="space-y-6">
          <div className="inline-flex items-center rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-sm text-indigo-400">
            <span className="relative flex h-2 w-2 mr-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-indigo-500"></span>
            </span>
            Introducing Artificial Retard Intelligence Agent
          </div>
          
          <h1 className="relative text-5xl font-bold tracking-tight text-white md:text-6xl lg:text-7xl">
            <span className="bg-gradient-to-r from-white via-white to-white/70 bg-clip-text text-transparent">The</span>{' '}
            <span className="relative">
              <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-500 bg-clip-text text-transparent">
                Retarded Copilot
              </span>
              <span className="absolute -inset-1 blur-xl bg-gradient-to-r from-blue-400/20 via-cyan-400/20 to-purple-500/20 opacity-30"></span>
            </span>{' '}
            <span className="bg-gradient-to-r from-white via-white to-white/70 bg-clip-text text-transparent">for Solana</span>
          </h1>
          
          <p className="mx-auto max-w-2xl text-lg text-white/70">
            Elevate your Solana experience with AI-powered insights and delegated actions
          </p>
          
          <div className="mt-10 flex justify-center">
            <button
              onClick={handleLogin}
              className="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 px-8 py-4 font-medium text-white shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-indigo-500/40"
            >
              <span className="relative z-10">Get Started</span>
              <span className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
              <span className="absolute right-0 top-0 h-8 w-8 -translate-y-1/2 translate-x-1/2 rounded-full bg-gradient-to-r from-cyan-300 via-cyan-200 to-white opacity-70 blur-lg"></span>
            </button>
          </div>
        </div>
        
        {/* Features Section */}
        <div className="relative z-10 mx-auto mt-32 max-w-6xl px-4">
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
              <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">Tailored for Solana</span>
            </h2>
            <p className="mt-4 text-white/60">Seamless integration with the world's leading AI-models</p>
          </div>
          
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: "🧠",
                title: "Cutting-Edge AI",
                description: "Harness the power of the world's most advanced AI models for intelligent analysis."
              },
              {
                icon: "⚡",
                title: "Seamless Execution",
                description: "Experience ultra-efficient, frictionless transactions powered by our deep Solana integration."
              },
              {
                icon: "🔗",
                title: "Ecosystem Integration",
                description: "Connect with the full spectrum of Solana's protocols and services."
              }
            ].map((feature, index) => (
              <div 
                key={index}
                className="group relative overflow-hidden rounded-xl border border-white/10 bg-gradient-to-b from-white/5 to-white/[0.02] p-6 transition-all duration-300 hover:border-indigo-500/30 hover:bg-gradient-to-b hover:from-indigo-500/10 hover:to-purple-500/[0.05]"
              >
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 text-xl">
                  {feature.icon}
                </div>
                <h3 className="mb-3 text-xl font-bold text-white">{feature.title}</h3>
                <p className="text-white/60">{feature.description}</p>
                <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-gradient-to-br from-blue-600/20 to-purple-600/20 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="relative z-10 mt-32 border-t border-white/10 py-8">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex items-center gap-2">
              <Image 
                src="/logo.svg" 
                alt="Logo" 
                width={32} 
                height={32} 
                className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 p-1 shadow-lg"
              />
              <span className="text-sm font-bold text-white">ARI</span>
            </div>
            
            <p className="text-center text-sm text-white/50">
              © 2024 Artificial Retard Intelligence. All rights reserved.
            </p>
            
            <div className="flex items-center gap-4">
              <Link 
                href="https://github.com/artificial-retard-intelligence" 
                target="_blank"
                className="rounded-full bg-white/5 p-2 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
              >
                <GitHubLogoIcon className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </section>
  );
};

export default function Home() {
  const isMaintenanceMode = process.env.NEXT_PUBLIC_MAINTENANCE_MODE === 'true';
  const router = useRouter();
  let { login } = useLogin({
    onComplete: async (
      user,
      isNewUser,
      wasAlreadyAuthenticated,
      loginMethod,
      loginAccount,
    ) => {
      router.push('/home');
    },
  });

  if (isMaintenanceMode) {
    login = () => {
      window.location.href = 'https://x.com/ari_sh';
    };
  }

  return (
    <div className="flex min-h-screen flex-col bg-black">
      <Header handleLogin={login} />
      <main className="flex-1">
        <Hero handleLogin={login} />
      </main>
    </div>
  );
}
