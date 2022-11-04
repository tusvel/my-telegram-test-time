import { FC, useState } from 'react';

import TextItem from '@/pages/texts/TextItem/TextItem';

import Button from '@/ui/form-elements/Button';

import { useFilter } from '@/hooks/useFilter';
import { useOutside } from '@/hooks/useOutside';
import { useTypedSelector } from '@/hooks/useTypedSelector';

import { IText } from '@/shared/types/text.interface';

import { telegramConverter } from '@/utils/telegram-converter';

import styles from './SelectText.module.scss';

const SelectText: FC = () => {
  const [value, setValue] = useState('');
  const { items } = useTypedSelector((state) => state.text);
  const texts = telegramConverter(null, items, '') as IText[];
  const textsItem = useFilter(texts, value);

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
            <div role="list" className="space-y-3 overflow-auto h-full mt-5">
              {textsItem &&
                (textsItem as IText[]).map((item) => (
                  <div key={item.id}>
                    <TextItem item={item} style={{ width: '100%' }} />
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SelectText;
