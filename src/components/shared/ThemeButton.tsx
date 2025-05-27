'use client';

import { Button } from '@/components/ui/button';
import { MoonIcon, SunIcon } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function ThemeButton() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Only show the theme button after mounting to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button size="icon" variant="outline">
        <div className="h-5 w-5" />
      </Button>
    );
  }

  return (
    <Button
      size="icon"
      variant="outline"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="relative overflow-hidden"
    >
      <SunIcon
        className={`h-5 w-5 transition-all duration-300 text-yellow-500 ${
          theme === 'dark' ? 'rotate-90 scale-0' : 'rotate-0 scale-100'
        }`}
      />
      <MoonIcon
        className={`absolute h-5 w-5 transition-all duration-300 text-blue-500 ${
          theme === 'dark' ? 'rotate-0 scale-100' : '-rotate-90 scale-0'
        }`}
      />
    </Button>
  );
}
