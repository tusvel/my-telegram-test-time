import cn from 'classnames';
import { CSSProperties, FC } from 'react';

import { IText } from '@/shared/types/text.interface';

const TextItem: FC<{ item: IText; style?: CSSProperties }> = ({
  item,
  style
}) => {
  return (
    <li
      className={cn(
        'overflow-hidden rounded-md bg-white px-6 py-4 shadow w-1/2'
      )}
      style={style}
    >
      <div>
        <div>{item.text}</div>
      </div>
    </li>
  );
};

export default TextItem;
