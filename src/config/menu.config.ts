import {
  LayoutGrid,
  Settings,
  UserCircle,
  Key,
  Layout,
  Network,
} from 'lucide-react';

export interface MenuItem {
  title: string;
  path?: string;
  icon?: any;
  permission?: string;
  sidebar?: boolean;
  children?: MenuItem[];
}

export type MenuConfig = MenuItem[];

// Same as web version MENU_SIDEBAR_COMPACT
export const MENU_SIDEBAR_COMPACT: MenuConfig = [
  {
    title: 'DASHBOARD',
    icon: LayoutGrid,
    path: '/manage/dashboard',
    sidebar: true
  },
  {
    title: 'DEVICES',
    icon: Settings,
    sidebar: true,
    children: [
      { title: 'CCTV', path: '/manage/cctv', permission: 'cctv.view', sidebar: true },
      { title: 'HELMET', path: '/manage/helmet', permission: 'helmet.view', sidebar: true },
      { title: 'BODY WORM', path: '/manage/body-worm', permission: 'body_worm.view', sidebar: true },
    ]
  },
  { title: 'USERS', icon: UserCircle, path: '/manage/user', permission: 'user.view', sidebar: true },
  { title: 'ROLE', icon: Key, path: '/manage/role', permission: 'role.view', sidebar: true },
  { title: 'LAYOUTS', icon: Layout, path: '/manage/layout', permission: 'layout.view', sidebar: true },
  { title: 'REGIONS', icon: Network, path: '/manage/region', permission: 'region.view', sidebar: true },
];
