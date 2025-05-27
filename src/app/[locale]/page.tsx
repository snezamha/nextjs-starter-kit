'use client';

import { useTranslations } from 'next-intl';

export default function Home() {
  const t = useTranslations('common');

  return (
    <main className="flex items-center min-h-screen justify-center p-24">
      <h1 className="text-4xl font-bold text-center">{t('messages.welcome')}</h1>
    </main>
  );
}
