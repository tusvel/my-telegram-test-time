import cn from 'classnames';
import { FC } from 'react';

import styles from '@/ui/List/ListItem/ListItem.module.scss';
import MaterialIcon from '@/ui/MaterialIcon/MaterialIcon';

import { ITagResponse } from '@/shared/types/tag/tag-response.interface';

const TagItem: FC<{ item: ITagResponse; edit: Function; remove: Function }> = ({
  item,
  edit,
  remove
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

      <div
        className={cn(
          'absolute top-0 right-0 flex items-center',
          styles.editItems
        )}
      >
        <div onClick={() => edit(item)} className="cursor-pointer w-6 h-6">
          <MaterialIcon name="PencilSquareIcon" />
        </div>
        <div onClick={() => remove(item)} className="cursor-pointer w-6 h-6">
          <MaterialIcon name="TrashIcon" />
        </div>
      </div>
    </li>
  );
};

export default TagItem;
