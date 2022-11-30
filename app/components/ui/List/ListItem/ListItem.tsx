import cn from 'classnames';
import { CSSProperties, FC } from 'react';

import MaterialIcon from '@/ui/MaterialIcon/MaterialIcon';

import { LanguageType } from '@/shared/types/language/language.type';
import { ITagResponse } from '@/shared/types/tag/tag-response.interface';

import styles from './ListItem.module.scss';

const ListItem: FC<{
  item: {
    id?: number;
    text?: string;
    tags?: ITagResponse[];
    language?: LanguageType;
    vertical?: string;
    role?: string;
    description?: string;
    is_special?: boolean;
    value?: string;
  };
  style?: CSSProperties;
  remove?: Function;
  edit?: Function;
}> = ({ item, remove, edit, style }) => {
  return (
    <div>
      <li
        style={style}
        className={cn(
          'rounded-md bg-white px-6 pt-4 shadow w-1/2 relative',
          styles.item,
          {
            ['pb-5']:
              item.tags?.length ||
              item.vertical ||
              item.role ||
              item.description
          }
        )}
      >
        {item.text || item.description}
        <div
          className={cn('absolute bottom-0 left-1 text-slate-500 text-sm', {
            ['text-violet-800']: item.tags && item.tags[0].is_special
          })}
        >
          {item.tags?.length &&
            item.tags.map((tag) => <span key={tag.id}>#{tag.value}</span>)}
        </div>

        {item.vertical && (
          <span className="absolute bottom-0 right-1 text-slate-600 text-sm">
            @{item.vertical}
          </span>
        )}
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

export default ListItem;
