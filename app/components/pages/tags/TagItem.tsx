import cn from 'classnames';
import { FC } from 'react';

import styles from '@/ui/List/ListItem/ListItem.module.scss';
import MaterialIcon from '@/ui/MaterialIcon/MaterialIcon';

import { ITagResponse } from '@/shared/types/tag/tag-response.interface';

const TagItem: FC<{ item: ITagResponse }> = ({
  item,
}) => {
  return (
    <li
      style={{ width: 300 }}
      className={cn(
        'relative overflow-hidden rounded-md bg-white p-5 shadow w-96',
        styles.item
      )}
    >
      <div className="text- mt-[-6px] text-lg">{item.description}</div>
      <div
        className={cn('absolute bottom-0 left-1 text-slate-500 text-sm', {
          ['text-violet-800']: item.is_special
        })}
      >
        <span>#{item.value}</span>
      </div>
      <div className={cn('absolute bottom-0 right-1 text-slate-600 text-sm')}>
        @{item.vertical}
      </div>
    </li>
  );
};

export default TagItem;
