import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale, localePrefix } from '@/config/locales';

export default createMiddleware({
  locales,
  defaultLocale,
  localePrefix
});
export const config = {
  matcher: [
    '/((?!api|static|.*\\..*|_next|favicon.ico|sitemap.xml|.*.svg$|robots.txt).*)'
  ]
};
