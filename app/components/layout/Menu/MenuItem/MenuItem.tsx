import cn from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC } from 'react';

import { IMenuItem } from '@/components/layout/Menu/menu-item.interface';

import MaterialIcon from '@/ui/MaterialIcon/MaterialIcon';

const MenuItem: FC<{ item: IMenuItem }> = ({ item }) => {
  const { asPath } = useRouter();

  return (
    <Link
      key={item.name}
      href={item.href}
      className={cn(
        asPath === item.href
          ? 'bg-indigo-50 border-indigo-600 text-indigo-600'
          : 'border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900',
        'group flex items-center px-3 py-2 text-sm font-medium border-l-4'
      )}
    >
      <div
        className={cn(
          asPath === item.href
            ? 'text-indigo-500'
            : 'text-gray-400 group-hover:text-gray-500',
          'mr-3 flex-shrink-0 h-6 w-6'
        )}
        aria-hidden="true"
      >
        <MaterialIcon name={item.icon} />
      </div>
      {item.name}
    </Link>
  );
};

export default MenuItem;
