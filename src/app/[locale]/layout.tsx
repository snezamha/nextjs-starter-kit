import { Inter, Vazirmatn } from 'next/font/google';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { ThemeProvider } from '@/providers/theme-provider';
import { cn } from '@/lib/utils';
import { i18n } from '@/i18n/config';
import { Locale } from '@/config/languages';
import '@/styles/globals.css';
import fs from 'fs';
import path from 'path';
import DirectionProvider from '@/providers/direction-provider';

const inter = Inter({ subsets: ['latin'] });
const vazir = Vazirmatn({ subsets: ['arabic'] });

export function generateStaticParams() {
  return i18n.locales.map((locale) => ({ locale }));
}

async function getMessages(locale: string) {
  try {
    const messages: Record<string, unknown> = {};

    const frontendDir = path.join(process.cwd(), 'messages', 'frontend', locale);
    if (fs.existsSync(frontendDir)) {
      const frontendFiles = fs.readdirSync(frontendDir);
      for (const file of frontendFiles) {
        if (file.endsWith('.json')) {
          const filePath = path.join(frontendDir, file);
          const fileContent = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
          const fileName = file.replace('.json', '');
          messages[fileName] = fileContent;
        }
      }
    }

    const backendDir = path.join(process.cwd(), 'messages', 'backend', locale);
    if (fs.existsSync(backendDir)) {
      const backendFiles = fs.readdirSync(backendDir);
      for (const file of backendFiles) {
        if (file.endsWith('.json')) {
          const filePath = path.join(backendDir, file);
          const fileContent = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
          const fileName = file.replace('.json', '');
          messages[fileName] = fileContent;
        }
      }
    }

    if (Object.keys(messages).length === 0) {
      console.error('No translation files found for locale:', locale);
      notFound();
    }

    return messages;
  } catch (error) {
    console.error('Error loading translations:', error);
    notFound();
  }
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { locale } = await Promise.resolve(params);

  if (!i18n.locales.includes(locale as Locale)) {
    console.error('Invalid locale:', locale);
    notFound();
  }
  const isRTL = locale === 'fa';

  const messages = await getMessages(locale);
  const font = locale === 'fa' ? vazir : inter;

  return (
    <html lang={locale} dir={locale === 'fa' ? 'rtl' : 'ltr'} suppressHydrationWarning>
      <body className={cn(font.className)}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ThemeProvider>
            <DirectionProvider direction={isRTL ? 'rtl' : 'ltr'}>{children} </DirectionProvider>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
