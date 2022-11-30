import cn from 'classnames';
import { FC } from 'react';

import styles from '@/ui/List/ListItem/ListItem.module.scss';
import MaterialIcon from '@/ui/MaterialIcon/MaterialIcon';

import { IUserResponse } from '@/shared/types/user/user-response.interface';

const UserEdit: FC<{
  item: IUserResponse;
  remove: Function;
  edit: Function;
}> = ({ item, remove, edit }) => {
  return (
    <div>
      <li
        style={{ width: '100%' }}
        className={cn(
          'rounded-md bg-white px-6 pt-4 shadow w-1/2 relative',
          styles.item,
          {
            ['pb-5']: item.role
          }
        )}
      >
        {item.login}
        {item.role && (
          <span className="absolute bottom-0 right-1 text-slate-600 text-sm">
            @{item.role}
          </span>
        )}
        <div
          className={cn(
            'absolute top-0 right-0 flex items-center',
            styles.editItems
          )}
        >
          {edit && (
            <div onClick={() => edit(item)} className="cursor-pointer w-6 h-6">
              <MaterialIcon name="PencilSquareIcon" />
            </div>
          )}
          {remove && (
            <div
              onClick={() => remove(item)}
              className="cursor-pointer w-6 h-6"
            >
              <MaterialIcon name="TrashIcon" />
            </div>
          )}
        </div>
      </li>
    </div>
  );
};

export default UserEdit;
