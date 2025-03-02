import { Breadcrumbs } from '@/components/shared/breadcrumbs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getTranslations } from 'next-intl/server';
import MetaDataForm from './_components/meta-data-form';

export default async function Appearance() {
  const t = await getTranslations('dashboardMenu');
  const breadcrumbItems = [
    { title: t('settings'), link: '' },
    { title: t('metaData'), link: '/metadata' }
  ];

  return (
    <>
      <Card>
        <CardHeader className='mb-6 border-b'>
          <CardTitle>
            <Breadcrumbs items={breadcrumbItems} />
          </CardTitle>
        </CardHeader>
        <CardContent className='space-y-4'>
          <MetaDataForm />
        </CardContent>
      </Card>
    </>
  );
}
