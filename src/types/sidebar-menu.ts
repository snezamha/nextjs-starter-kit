import { Icon } from '@/components/shared/icon';

export interface NavItem {
  title: string;
  url: string;
  disabled?: boolean;
  external?: boolean;
  shortcut?: [string, string];
  icon?: keyof typeof Icon;
  label?: string;
  description?: string;
  isActive?: boolean;
  items?: NavItem[];
}
