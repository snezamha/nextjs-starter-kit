import { useTranslations } from 'next-intl';
import { Breadcrumbs } from '@/components/shared/breadcrumbs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Dashboard() {
  const t = useTranslations('dashboardMenu');
  const breadcrumbItems = [{ title: t('dashboard'), link: '/dashboard' }];

  return (
    <>
      <Card>
        <CardHeader className='mb-6 border-b'>
          <CardTitle>
            <Breadcrumbs items={breadcrumbItems} />
          </CardTitle>
        </CardHeader>
        <CardContent className='space-y-4'></CardContent>
      </Card>
    </>
  );
}
