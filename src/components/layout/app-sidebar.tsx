'use client';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from '@/components/ui/collapsible';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail
} from '@/components/ui/sidebar';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import * as React from 'react';
import { navItems } from '@/config/sidebar-menu-list';
import { Icon } from '../shared/icon';
import { useLocale, useTranslations } from 'next-intl';
import { usePathname } from '@/i18n/routing';

export default function AppSidebar() {
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations('dashboardMenu');

  return (
    <Sidebar collapsible='offcanvas' side={locale === 'fa' ? 'right' : 'left'}>
      <SidebarContent className='overflow-x-hidden'>
        <SidebarGroup>
          <SidebarMenu>
            {navItems.map((item) => {
              return item?.items && item?.items?.length > 0 ? (
                <Collapsible
                  key={item.title}
                  asChild
                  defaultOpen={item.isActive}
                  className='group/collapsible'
                >
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton
                        tooltip={t(item.title)}
                        isActive={pathname === item.url}
                      >
                        {item.icon && <Icon icon={item.icon} />}
                        <span>{t(item.title)}</span>
                        {locale === 'fa' ? (
                          <ChevronLeft className='mr-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90' />
                        ) : (
                          <ChevronRight className='ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90' />
                        )}
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.items?.map((subItem) => (
                          <SidebarMenuSubItem key={subItem.title}>
                            <SidebarMenuSubButton
                              asChild
                              isActive={pathname === subItem.url}
                            >
                              <Link href={subItem.url}>
                                {subItem.icon && <Icon icon={subItem.icon} />}
                                <span>{t(subItem.title)}</span>
                              </Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              ) : (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    tooltip={t(item.title)}
                    isActive={pathname === item.url}
                  >
                    <Link href={item.url}>
                      {item.icon && <Icon icon={item.icon} />}
                      <span>{t(item.title)}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem></SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
