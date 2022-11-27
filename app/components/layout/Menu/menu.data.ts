import {
  ArchiveBoxIcon,
  DocumentDuplicateIcon,
  DocumentTextIcon,
  HashtagIcon,
  PlusIcon,
  RectangleStackIcon,
  UsersIcon
} from '@heroicons/react/24/outline';

import { IMenuList } from '@/components/layout/Menu/menu.interface';

export const menuList: IMenuList = [
  {
    href: '/',
    name: 'Создать пост',
    icon: 'PlusIcon',
    role: ['superadmin', 'admin']
  },
  {
    href: '/texts',
    name: 'Текста',
    icon: 'DocumentTextIcon',
    role: ['superadmin', 'admin', 'user']
  },
  {
    href: '/partial_text',
    name: 'Сохранённые текста',
    icon: 'ClockIcon',
    role: ['superadmin', 'admin', 'user']
  },
  {
    href: '/tags',
    name: 'Теги',
    icon: 'HashtagIcon',
    role: ['superadmin', 'admin', 'user']
  },
  {
    href: '/media',
    name: 'Медиа',
    icon: 'DocumentDuplicateIcon',
    role: ['superadmin', 'admin', 'user']
  },
  {
    href: '/history',
    name: 'Опубликованные посты',
    icon: 'ArchiveBoxIcon',
    role: ['superadmin', 'admin']
  },
  {
    href: '/users',
    name: 'Пользователи',
    icon: 'UsersIcon',
    role: ['superadmin']
  },
  {
    href: '/channels',
    name: 'Каналы',
    icon: 'RectangleStackIcon',
    role: ['superadmin', 'admin']
  }
];
