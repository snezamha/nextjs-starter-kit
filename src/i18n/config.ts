import { locales, defaultLocale } from '@/config/languages';

export const i18n = {
  defaultLocale,
  locales,
  localeDetection: true,
} as const;

export type I18nConfig = typeof i18n;
