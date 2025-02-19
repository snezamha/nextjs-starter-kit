'use client';

import * as React from 'react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { Moon, Sun } from 'lucide-react';

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  return (
    <Button
      size='icon'
      variant='outline'
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
    >
      <Sun className='h-[1.2rem] w-[1.2rem] rotate-90 scale-0 text-yellow-600 transition-transform duration-500 ease-in-out dark:rotate-0 dark:scale-100' />
      <Moon className='scale-1000 absolute h-[1.2rem] w-[1.2rem] rotate-0 text-blue-600 transition-transform duration-500 ease-in-out dark:-rotate-90 dark:scale-0' />
    </Button>
  );
};

export default ThemeToggle;
