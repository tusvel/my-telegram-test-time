import cn from 'classnames';
import { FC } from 'react';

import { LanguageType } from '@/shared/types/language/language.type';
import { ITagResponse } from '@/shared/types/tag/tag-response.interface';

import styles from './ListItem.module.scss';

const ListItem: FC<{
  item: {
    text: string;
    tags?: ITagResponse[];
    language?: LanguageType;
    vertical?: string;
  };
}> = ({ item }) => {
  return (
    <div>
      <li
        className={cn(
          'rounded-md bg-white px-6 pt-4 shadow w-1/2 relative',
          styles.item,
          {
            ['pb-5']: item.tags?.length || item.vertical
          }
        )}
      >
        {item.text}
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
      </li>
    </div>
  );
};

export default ListItem;
