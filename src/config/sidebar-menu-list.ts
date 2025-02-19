import { Icon } from '@/components/shared/icon';
import { NavItem } from '@/types/sidebar-menu';

export const navItems: NavItem[] = [
  {
    title: 'dashboard',
    url: '/dashboard',
    icon: 'stash:dashboard' as keyof typeof Icon,
    isActive: false,
    items: []
  },
  {
    title: 'settings',
    url: '#',
    icon: 'weui:setting-outlined' as keyof typeof Icon,
    isActive: true,
    items: [
      {
        title: 'appearance',
        url: '/appearance',
        icon: 'ph:paint-brush-duotone' as keyof typeof Icon
      },
      {
        title: 'translations',
        url: '/translations',
        icon: 'material-symbols-light:language' as keyof typeof Icon
      }
    ]
  }
];
