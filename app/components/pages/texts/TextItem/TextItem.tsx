import cn from 'classnames';
import { CSSProperties, FC } from 'react';

import { IText } from '@/shared/types/text.interface';

import styles from './TextItem.module.scss';

const TextItem: FC<{ item: IText; style?: CSSProperties }> = ({
  item,
  style
}) => {
  return (
    <li
      className={cn(
        styles.textItem,
        'overflow-hidden rounded-md bg-white px-6 pt-4 pb-6 shadow w-1/2 list-none'
      )}
      style={style}
    >
      <div className="relative">
        <div dangerouslySetInnerHTML={{ __html: item.text }} />
        <div className="absolute bottom-[-19px] right-[-15px]">
          {item.tags.map((tag) => (
            <span key={tag.id}>#{tag.value} </span>
          ))}
        </div>
      </div>
    </li>
  );
};

export default TextItem;
