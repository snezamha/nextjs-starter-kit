import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb';
import { Link } from '@/i18n/routing';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLocale } from 'next-intl';
import { Fragment } from 'react';
import { Icon } from '@/components/shared/icon';

type BreadcrumbItemProps = {
  title: string;
  link: string;
};

export function Breadcrumbs({ items }: { items: BreadcrumbItemProps[] }) {
  const locale = useLocale();
  return (
    <div className='flex items-center justify-between gap-3'>
      <div className='flex-1'>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <Link href='/'>
                <Icon icon='iconoir:home' />
              </Link>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              {locale === 'fa' ? <ChevronLeft /> : <ChevronRight />}
            </BreadcrumbSeparator>
            {items.map((item, index) => (
              <Fragment key={item.title}>
                {index !== items.length - 1 && (
                  <BreadcrumbItem>
                    <Link href={item.link}>{item.title}</Link>
                  </BreadcrumbItem>
                )}
                {index < items.length - 1 && (
                  <BreadcrumbSeparator>
                    {locale === 'fa' ? <ChevronLeft /> : <ChevronRight />}
                  </BreadcrumbSeparator>
                )}
                {index === items.length - 1 && (
                  <BreadcrumbPage>{item.title}</BreadcrumbPage>
                )}
              </Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </div>
  );
}
