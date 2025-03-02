import { useTranslations } from 'next-intl';
import { Breadcrumbs } from '@/components/shared/breadcrumbs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import TranslationsForm from './_components/translations-form';

export default function Translations() {
  const t = useTranslations('dashboardMenu');
  const breadcrumbItems = [
    { title: t('settings'), link: '' },
    { title: t('translations'), link: '/translations' }
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
          <TranslationsForm />
        </CardContent>
      </Card>
    </>
  );
}
