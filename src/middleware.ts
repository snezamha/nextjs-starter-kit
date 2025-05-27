import { i18n } from '@/i18n/config';
import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: i18n.locales,
  defaultLocale: i18n.defaultLocale,
  localePrefix: 'never',
});

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};
