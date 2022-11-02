import { FC, useState } from 'react';

import TextItem from '@/pages/texts/TextItem/TextItem';

import Button from '@/ui/form-elements/Button';

import { useFilter } from '@/hooks/useFilter';
import { useOutside } from '@/hooks/useOutside';
import { useTypedSelector } from '@/hooks/useTypedSelector';

import { IText } from '@/shared/types/text.interface';

import styles from './SelectText.module.scss';

const SelectText: FC = () => {
  const [value, setValue] = useState('');
  const { items } = useTypedSelector((state) => state.text);
  const itemsString = items && items.map((item) => JSON.stringify(item));
  const { filteredItems } = useFilter(itemsString || [], value);

  const { isShow, setIsShow, ref } = useOutside(false);

  return (
    <div ref={ref} className={styles.selectText}>
      <Button
        onClick={(e) => {
          e.preventDefault();
          setIsShow(!isShow);
        }}
        className={'px-2 py-1'}
      >
        Выбрать текст
      </Button>
      {isShow && (
        <div className={styles.selectTextWrap}>
          <div ref={ref} className={styles.selectTextContent}>
            <input
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Поиск текста"
              style={{
                margin: '5px auto',
                display: 'block',
                width: '300px',
                borderRadius: '15px'
              }}
            />
            <ul role="list" className="space-y-3 overflow-auto h-full mt-5">
              {filteredItems?.length > 0 &&
                (filteredItems as IText[]).map((item) => (
                  <div key={item.id}>
                    <TextItem item={item} style={{ width: '100%' }} />
                  </div>
                ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default SelectText;
