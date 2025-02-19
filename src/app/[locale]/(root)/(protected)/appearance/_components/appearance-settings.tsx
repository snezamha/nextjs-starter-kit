'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { setCookie } from 'cookies-next';
import { CheckIcon } from 'lucide-react';
import { useTheme } from 'next-themes';

import type { ThemeConfig } from '@/types/theme';

import { Button } from '@/components/ui/button';
import { themes } from '@/config/themes';
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';

const RADIUS = ['default', 0, 0.3, 0.5, 0.75, 1.0] as const;

export function AppearanceSettings({ theme, radius }: ThemeConfig) {
  const router = useRouter();
  const t = useTranslations('appearance');

  const { resolvedTheme: themeMode, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  function themeConfigHandler({ theme, radius }: ThemeConfig) {
    setCookie('theme-config', JSON.stringify({ theme, radius }), {
      path: '/'
    });
    router.refresh();
  }

  if (!mounted) return null;

  return (
    <div className='space-y-8'>
      <section id='mode' className='space-y-4'>
        <h3 className='font-heading text-lg drop-shadow-md dark:bg-gradient-to-br dark:from-neutral-200 dark:to-neutral-600 dark:bg-clip-text dark:text-transparent'>
          {t('themeMode')}:
        </h3>

        <div className='flex flex-col items-center justify-center gap-4 sm:flex-row'>
          {['light', 'dark'].map((mode) => (
            <div
              key={mode}
              className='cursor-pointer'
              onClick={() => setTheme(mode)}
            >
              <div
                className={cn(
                  'rounded-lg border bg-background p-4 transition-all hover:bg-accent hover:text-foreground',
                  mode === themeMode && 'border-2 border-primary'
                )}
              >
                <div
                  className={cn(mode, 'space-y-2 rounded-sm bg-background p-2')}
                >
                  <div className='space-y-2 rounded-md bg-muted p-2 shadow-sm'>
                    <div className='h-2 w-[80px] rounded-lg bg-muted-foreground/25' />
                    <div className='h-2 w-[100px] rounded-lg bg-muted-foreground/25' />
                  </div>

                  <div className='flex items-center space-x-2 rounded-md bg-muted p-2 shadow-sm'>
                    <div className='size-4 rounded-full bg-muted-foreground/25' />
                    <div className='h-2 w-[100px] rounded-lg bg-muted-foreground/25' />
                  </div>
                </div>
              </div>
              <span className='block w-full p-2 text-center text-sm font-normal capitalize text-muted-foreground'>
                {t(mode)}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section id='themes' className='space-y-4'>
        <h3 className='font-heading text-lg drop-shadow-md dark:bg-gradient-to-br dark:from-neutral-200 dark:to-neutral-600 dark:bg-clip-text dark:text-transparent'>
          {t('themes')}:
        </h3>

        <div className='flex flex-wrap justify-center gap-2'>
          {themes.map(({ name, activeColor }) => (
            <Button
              key={name}
              size='sm'
              variant='outline'
              onClick={() => themeConfigHandler({ theme: name, radius })}
              className={cn(
                'w-auto justify-start rounded-lg p-3 transition-all',
                name === theme && 'border-2 border-primary'
              )}
              style={
                {
                  '--theme-primary': `hsl(${
                    activeColor[themeMode === 'dark' ? 'dark' : 'light']
                  })`
                } as React.CSSProperties
              }
            >
              <span className='flex items-center gap-2'>
                <span className='flex size-5 shrink-0 items-center justify-center rounded-full bg-[--theme-primary]'>
                  {theme === name && (
                    <CheckIcon className='size-4 text-white' />
                  )}
                </span>
                {name}
              </span>
            </Button>
          ))}
        </div>
      </section>

      <section id='radius' className='space-y-4'>
        <h3 className='font-heading text-lg drop-shadow-md dark:bg-gradient-to-br dark:from-neutral-200 dark:to-neutral-600 dark:bg-clip-text dark:text-transparent'>
          {t('radius')}:
        </h3>

        <div className='flex flex-wrap justify-center gap-2'>
          {RADIUS.map((value) => (
            <Button
              size='sm'
              variant='outline'
              key={value}
              onClick={() => themeConfigHandler({ theme, radius: value })}
              className={cn(
                'w-24 rounded-lg p-3 capitalize transition-all',
                radius === value && 'border-2 border-primary'
              )}
              style={
                value === 'default'
                  ? {}
                  : ({ '--radius': `${value}rem` } as React.CSSProperties)
              }
            >
              {value === 'default' ? t('default') : value}
            </Button>
          ))}
        </div>
      </section>
    </div>
  );
}
