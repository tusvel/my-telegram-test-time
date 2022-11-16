import cn from 'classnames';
import { CSSProperties, FC } from 'react';
import { useSelector } from 'react-redux';

import EditText from '@/pages/texts/TextItem/EditText/EditText';

import { useAppDispatch } from '@/hooks/useAppDispatch';

import { IText } from '@/shared/types/text.interface';

import { selectTextItemById } from '@/store/textEdit/textEdit.selector';
import { add, remove } from '@/store/textEdit/textEdit.slice';

import styles from './TextItem.module.scss';

const TextItem: FC<{ item: IText; style?: CSSProperties; check?: boolean }> = ({
  item,
  style,
  check = false
}) => {
  const dispatch = useAppDispatch();
  const textItem = useSelector(selectTextItemById(item.id));
  const onClick = () => {
    textItem ? dispatch(remove(item)) : dispatch(add(item));
  };

  return (
    <>
      <li
        className={cn(
          styles.textItem,
          'rounded-md bg-white px-6 pt-4 pb-6 shadow w-1/2 list-none',
          check && {
            [styles.active]: textItem,
            [styles.check]: true
          }
        )}
        style={style}
        onClick={check ? onClick : () => null}
      >
        <div className="relative">
          <div dangerouslySetInnerHTML={{ __html: item.text }} />
          <div className="absolute bottom-[-19px] right-[-15px]">
            {item.tags.map((tag, index) => (
              <span key={index}>#{tag.value} </span>
            ))}
          </div>
          {check && (
            <>
              <button
                className={cn(
                  styles.button,
                  'absolute bottom-[-24px] right-[-50px]'
                )}
              ></button>
              <EditText item={item} />
            </>
          )}
        </div>
      </li>
    </>
  );
};

export default TextItem;
