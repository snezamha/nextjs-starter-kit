import { LayoutDashboard, Settings, Brush } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';

export interface MenuItem {
  label: string;
  icon: React.ElementType;
  href: string;
  active: boolean;
  submenu?: MenuItem[];
}

export const useMenuItems = (): MenuItem[] => {
  const t = useTranslations('dashboard');
  const pathname = usePathname();

  return [
    {
      label: t('dashboard.title'),
      icon: LayoutDashboard,
      href: '/dashboard',
      active: pathname === '/dashboard',
    },
    {
      label: t('dashboard.settings'),
      icon: Settings,
      href: '/dashboard/settings',
      active: pathname === '/dashboard/settings',
      submenu: [
        {
          label: t('dashboard.appearance'),
          icon: Brush,
          href: '/dashboard/settings/appearance',
          active: pathname === '/dashboard/settings/appearance',
        },
      ],
    },
  ];
};
