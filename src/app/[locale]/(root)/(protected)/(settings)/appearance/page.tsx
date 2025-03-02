import { Breadcrumbs } from '@/components/shared/breadcrumbs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cookies } from 'next/headers';
import type { ThemeConfig } from '@/types/theme';
import { getTranslations } from 'next-intl/server';
import { AppearanceForm } from './_components/appearance-form';

export default async function Appearance() {
  const t = await getTranslations('dashboardMenu');
  const breadcrumbItems = [
    { title: t('settings'), link: '' },
    { title: t('appearance'), link: '/appearance' }
  ];
  const cookieStore = await cookies();
  const themeConfig = cookieStore.get('theme-config');
  const { theme, radius } = JSON.parse(
    themeConfig?.value ?? '{"theme":"default","radius":"default"}'
  ) as ThemeConfig;
  return (
    <>
      <Card>
        <CardHeader className='mb-6 border-b'>
          <CardTitle>
            <Breadcrumbs items={breadcrumbItems} />
          </CardTitle>
        </CardHeader>
        <CardContent className='space-y-4'>
          <AppearanceForm theme={theme} radius={radius} />
        </CardContent>
      </Card>
    </>
  );
}
