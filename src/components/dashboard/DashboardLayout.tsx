'use client';

import { Sidebar } from '@/components/dashboard/Sidebar';
import LanguageButton from '@/components/shared/LanguageButton';
import ThemeButton from '@/components/shared/ThemeButton';
import { useLocale } from 'next-intl';
import { cn } from '@/lib/utils';
import { useSidebar } from '@/hooks/use-sidebar';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const locale = useLocale();
  const isRTL = locale === 'fa';
  const { isCollapsed } = useSidebar();

  const directionClass = isRTL ? 'text-right' : 'text-left';

  return (
    <div className="flex min-h-screen overflow-hidden">
      <main
        className={cn(
          'flex-1 transition-all duration-300 flex flex-col',
          isRTL ? (isCollapsed ? 'md:mr-16' : 'md:mr-72') : isCollapsed ? 'md:ml-16' : 'md:ml-72',
          'ml-0 mr-0'
        )}
      >
        <div className="sticky top-0 z-50 flex h-14 items-center border-b bg-background justify-end">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center">
              <Sidebar />
            </div>
            <div className="flex items-center gap-2 px-4">
              <LanguageButton aria-label="Switch language" />
              <ThemeButton aria-label="Toggle theme" />
            </div>
          </div>
        </div>
        <div className={cn('flex-1 overflow-auto p-3', directionClass)}>{children}</div>
      </main>
    </div>
  );
}
