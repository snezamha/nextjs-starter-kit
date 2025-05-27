'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/routing';
import { Button } from '@/components/ui/button';
import { useTransition } from 'react';
import { CheckIcon, LanguagesIcon } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Flag from 'react-world-flags';
import { useTranslations } from 'next-intl';

export default function LanguageButton() {
  const [, startTransition] = useTransition();
  const router = useRouter();
  const pathname = usePathname();
  const localActive = useLocale();
  const t = useTranslations('common');

  const locales = [
    {
      name: t('languages.german'),
      value: 'de',
      code: 'de',
    },
    {
      name: t('languages.english'),
      value: 'en',
      code: 'gb',
    },
    {
      name: t('languages.persian'),
      value: 'fa',
      code: 'ir',
    },
  ];

  const onSelectChange = (nextLocale: string) => {
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" variant="outline" className="w-9 h-9">
          <LanguagesIcon className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[150px]">
        {locales.map((locale) => (
          <DropdownMenuItem
            key={locale.value}
            onClick={() => onSelectChange(locale.value)}
            disabled={locale.value === localActive}
            className="flex items-center gap-2"
          >
            <Flag code={locale.code} className="w-5 h-5" />
            <span>{locale.name}</span>
            {locale.value === localActive && <CheckIcon className="ml-auto h-4 w-4" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
