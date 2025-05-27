'use client';

import { useTranslations } from 'next-intl';

export default function DashboardPage() {
  const t = useTranslations('dashboard');

  return (
    <div className="h-full p-2">
      <h1 className="text-2xl font-bold tracking-tight">{t('dashboard.title')}</h1>
      <p className="text-muted-foreground">{t('dashboard.welcome')}</p>
    </div>
  );
}
