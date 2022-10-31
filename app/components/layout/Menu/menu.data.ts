import {
  ArchiveBoxIcon,
  DocumentDuplicateIcon,
  DocumentTextIcon,
  PlusIcon,
  RectangleStackIcon,
  UsersIcon
} from '@heroicons/react/24/outline';

import { IMenuList } from '@/components/layout/Menu/menu.interface';

export const firstMenu: IMenuList = [
  {
    href: '/',
    name: 'Создать пост',
    icon: 'PlusIcon'
  },
  {
    href: '/texts',
    name: 'Текста',
    icon: 'DocumentTextIcon'
  },
  {
    href: '/media',
    name: 'Медиа',
    icon: 'DocumentDuplicateIcon'
  },
  {
    href: '/history',
    name: 'Опубликованные посты',
    icon: 'ArchiveBoxIcon'
  },
  {
    href: '/users',
    name: 'Пользователи',
    icon: 'UsersIcon'
  },
  {
    href: '/channels',
    name: 'Каналы',
    icon: 'RectangleStackIcon'
  }
];
