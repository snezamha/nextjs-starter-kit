import type { Metadata } from 'next';
import '@/styles/globals.css';
import localFont from 'next/font/local';
import { Inter } from 'next/font/google';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { Toaster } from '@/components/ui/toaster';
import DirectionProvider from '@/providers/direction-provider';
import { ThemeProvider } from '@/providers/theme-provider';
import { NextIntlClientProvider } from 'next-intl';
import NextTopLoader from 'nextjs-toploader';
import { cookies } from 'next/headers';
import type { ThemeConfig } from '@/types/theme';
import { cn } from '@/lib/utils';
import { themes } from '@/config/themes';

const rtlFont = localFont({ src: '../../assets/fonts/IRANSans.ttf' });
const ltrFont = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    template: `%s | Nextjs Starter Kit`,
    default: `Nextjs Starter Kit`
  }
};

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const cookieStore = await cookies();
  const themeConfig = cookieStore.get('theme-config');
  const { theme, radius } = JSON.parse(
    themeConfig?.value ?? '{"theme":"default","radius":"default"}'
  ) as ThemeConfig;

  const { locale } = await Promise.resolve(params);

  if (!routing.locales.includes(locale)) {
    notFound();
  }

  const messages = await getMessages({ locale });

  const themeObject = themes.find((t) => t.name === theme) || themes[0];
  const themePrimaryColor = `hsl(${themeObject.activeColor['light']})`;

  return (
    <html
      suppressHydrationWarning
      lang={locale}
      dir={['fa'].includes(locale) ? 'rtl' : 'ltr'}
    >
      <body
        suppressHydrationWarning
        className={cn(
          locale === 'fa' ? rtlFont.className : ltrFont.className,
          `theme-${theme}`
        )}
        style={
          radius === 'default'
            ? {}
            : ({ '--radius': `${radius}rem` } as React.CSSProperties)
        }
      >
        <NextTopLoader
          color={themePrimaryColor}
          height={5}
          showSpinner={false}
        />
        <ThemeProvider attribute='class' defaultTheme='light' enableSystem>
          <NextIntlClientProvider messages={messages}>
            <DirectionProvider
              direction={['fa'].includes(locale) ? 'rtl' : 'ltr'}
            >
              {children}
              <Toaster />
            </DirectionProvider>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
