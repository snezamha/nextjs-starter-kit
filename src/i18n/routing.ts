import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';
import { locales, defaultLocale } from '@/config/languages';

export const routing = defineRouting({
  locales,
  defaultLocale,
  localePrefix: 'never',
});

export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing);
