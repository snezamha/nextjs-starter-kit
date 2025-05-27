import { getRequestConfig } from 'next-intl/server';
import { locales } from '@/config/languages';
import fs from 'fs';
import path from 'path';

const defaultLocale = 'en';

type Messages = {
  [key: string]: string | Messages;
};

async function loadMessages(locale: string): Promise<Messages> {
  const messages: Messages = {};
  const baseDir = path.join(process.cwd(), 'messages');

  function loadJsonFiles(dir: string) {
    const files = fs.readdirSync(dir);

    files.forEach((file) => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);

      if (stat.isDirectory()) {
        loadJsonFiles(filePath);
      } else if (file.endsWith('.json')) {
        const content = JSON.parse(fs.readFileSync(filePath, 'utf-8')) as Messages;
        Object.assign(messages, content);
      }
    });
  }

  const localeDir = path.join(baseDir, locale);
  if (fs.existsSync(localeDir)) {
    loadJsonFiles(localeDir);
  }

  return messages;
}

export async function getMessages(locale: string) {
  if (!locales.includes(locale as (typeof locales)[number])) {
    return {};
  }

  return loadMessages(locale);
}

export default getRequestConfig(async ({ locale }) => {
  const currentLocale = locale || defaultLocale;

  return {
    messages: await getMessages(currentLocale),
    locale: currentLocale,
  };
});
