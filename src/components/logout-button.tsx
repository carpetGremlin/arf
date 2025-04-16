'use client';

import { usePrivy } from '@privy-io/react-auth';
import { LogOut } from 'lucide-react';
import { toast } from 'sonner';

export default function LogoutButton() {
  const { logout } = usePrivy();

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Successfully logged out');
    } catch (error) {
      console.error('Logout failed:', error);
      toast.error('Failed to log out');
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-white/70 transition-colors hover:bg-white/10 hover:text-white"
    >
      <LogOut className="h-4 w-4" />
      <span>Logout</span>
    </button>
  );
} 