'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import { Menu, ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { useSidebar } from '@/hooks/use-sidebar';

import { useMenuItems } from '@/config/dashboard/menu';

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const { isCollapsed, setIsCollapsed } = useSidebar();
  const t = useTranslations('dashboard');
  const locale = useLocale();
  const isRTL = locale === 'fa';

  const borderSideClass = isRTL ? 'border-l' : 'border-r';
  const sideClass = isRTL ? 'right-0' : 'left-0';
  const sheetSide = isRTL ? 'right' : 'left';

  const CollapseIcon = () => {
    if (isCollapsed) {
      return isRTL ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />;
    }
    return isRTL ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />;
  };

  const handleRouteClick = () => {
    setIsOpen(false);
  };

  return (
    <>
      <div className="md:hidden flex h-14 items-center justify-between p-2 border-b">
        <Button
          variant="ghost"
          aria-label="Toggle Menu"
          onClick={() => setIsOpen(true)}
          className="p-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
        >
          <Menu className="h-6 w-6" />
        </Button>
      </div>

      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent side={sheetSide} className="p-0">
          <SheetHeader className="flex items-center justify-between border-b px-2 h-14">
            <SheetTitle className="font-semibold">{t('dashboard.title')}</SheetTitle>
          </SheetHeader>

          <SheetDescription className="sr-only" />
          <SidebarContent onRouteClick={handleRouteClick} />
        </SheetContent>
      </Sheet>

      <div
        className={cn(
          'hidden h-full md:flex md:flex-col md:fixed md:inset-y-0 z-[80] bg-background transition-all duration-300',
          isCollapsed ? 'md:w-16' : 'md:w-72',
          sideClass,
          borderSideClass,
          className
        )}
      >
        <div
          className={cn(
            'flex h-14 items-center justify-between border-b transition-all duration-300',
            'p-2'
          )}
        >
          <div></div>
          {!isCollapsed && <div className="font-semibold">{t('dashboard.title')}</div>}
          <Button
            variant="ghost"
            size="icon"
            aria-label={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
            onClick={() => setIsCollapsed(!isCollapsed)}
            className={cn('h-8 w-8', isCollapsed && 'mx-auto')}
          >
            <CollapseIcon />
          </Button>
        </div>
        <ScrollArea className="flex-1">
          <SidebarContent isCollapsed={isCollapsed} />
        </ScrollArea>
      </div>
    </>
  );
}

interface SidebarContentProps {
  isCollapsed?: boolean;
  onRouteClick?: () => void;
}

function SidebarContent({ isCollapsed = false, onRouteClick }: SidebarContentProps) {
  const [openSubmenu, setOpenSubmenu] = React.useState<string | null>(null);
  const locale = useLocale();
  const isRTL = locale === 'fa';
  const routes = useMenuItems();

  const isSubmenuActive = (route: { submenu?: Array<{ active: boolean }> }) => {
    return route.submenu?.some((subItem: { active: boolean }) => subItem.active) || false;
  };

  React.useEffect(() => {
    const activeParent = routes.find((route) => isSubmenuActive(route));
    if (activeParent) {
      setOpenSubmenu(activeParent.href);
    }
  }, [routes]);

  const toggleSubmenu = (href: string) => {
    const route = routes.find((route) => route.href === href);
    if (route && isSubmenuActive(route)) {
      setOpenSubmenu(href);
    } else {
      setOpenSubmenu(openSubmenu === href ? null : href);
    }
  };

  return (
    <div className="flex h-full flex-col gap-y-2 p-2">
      <div className="p-2">
        <div className="space-y-1">
          {routes.length > 0 ? (
            routes.map((route) => (
              <div key={route.href} className="relative">
                {route.submenu ? (
                  <>
                    <button
                      onClick={() => toggleSubmenu(route.href)}
                      className={cn(
                        'w-full group flex items-center rounded-md p-2 text-sm font-medium hover:bg-accent/80 hover:text-accent-foreground',
                        route.active || isSubmenuActive(route) ? 'bg-accent' : 'bg-transparent',
                        isCollapsed ? 'justify-center' : isRTL ? 'justify-end' : 'justify-start'
                      )}
                    >
                      <route.icon
                        className={cn('h-4 w-4', !isCollapsed && (isRTL ? 'ml-2' : 'mr-2'))}
                        aria-hidden="true"
                      />
                      {!isCollapsed && (
                        <>
                          <span className={cn('flex-1', isRTL ? 'text-right' : 'text-left')}>
                            {route.label}
                          </span>
                          {isRTL ? (
                            <ChevronLeft
                              className={cn(
                                'h-4 w-4 transition-transform duration-200',
                                openSubmenu === route.href && '-rotate-90'
                              )}
                            />
                          ) : (
                            <ChevronRight
                              className={cn(
                                'h-4 w-4 transition-transform duration-200',
                                openSubmenu === route.href && 'rotate-90'
                              )}
                            />
                          )}
                        </>
                      )}
                    </button>
                    <div
                      className={cn(
                        'overflow-hidden transition-all duration-200 ease-in-out',
                        openSubmenu === route.href ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                      )}
                    >
                      <div
                        className={cn(
                          'mt-1 space-y-1 flex flex-col',
                          isCollapsed
                            ? 'absolute left-16 top-0 w-48 bg-background border rounded-md shadow-md z-50'
                            : 'px-2'
                        )}
                      >
                        <div
                          className={cn(
                            'border-s-2',
                            isRTL
                              ? 'border-r border-gray-200 mr-2 pr-2'
                              : 'border-l border-gray-200 ml-2 pl-2'
                          )}
                        >
                          {route.submenu.map((subItem) => (
                            <Link
                              key={subItem.href}
                              href={subItem.href}
                              onClick={onRouteClick}
                              className={cn(
                                'group flex items-center justify-start rounded-md p-2 text-sm font-medium hover:bg-accent/80 hover:text-accent-foreground transition',
                                subItem.active ? 'bg-accent' : 'bg-transparent',
                                'mb-1'
                              )}
                            >
                              <subItem.icon
                                className={cn('h-4 w-4', isRTL ? 'ml-2' : 'mr-2')}
                                aria-hidden="true"
                              />
                              <span className={isRTL ? 'text-right' : 'text-left'}>
                                {subItem.label}
                              </span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <Link
                    href={route.href}
                    onClick={onRouteClick}
                    className={cn(
                      'group flex items-center rounded-md p-2 text-sm font-medium hover:bg-accent/80 hover:text-accent-foreground',
                      route.active ? 'bg-accent' : 'bg-transparent'
                    )}
                  >
                    <route.icon
                      className={cn('h-4 w-4', !isCollapsed && (isRTL ? 'ml-2' : 'mr-2'))}
                      aria-hidden="true"
                    />
                    {!isCollapsed && (
                      <span className={isRTL ? 'text-right' : 'text-left'}>{route.label}</span>
                    )}
                  </Link>
                )}
              </div>
            ))
          ) : (
            <div className="text-muted-foreground text-sm p-2">No routes available</div>
          )}
        </div>
      </div>
    </div>
  );
}
