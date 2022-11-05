import { FC, useState } from 'react';

import TextItem from '@/pages/texts/TextItem/TextItem';

import Modal from '@/ui/Modal/Modal';

import { useFilter } from '@/hooks/useFilter';
import { useTypedSelector } from '@/hooks/useTypedSelector';

import { IText } from '@/shared/types/text.interface';

import { telegramConverter } from '@/utils/telegram-converter';

const SelectText: FC = () => {
  const [value, setValue] = useState('');
  const { items } = useTypedSelector((state) => state.text);
  const texts = telegramConverter(null, items, '') as IText[];
  const textsItem = useFilter(texts, value);

  return (
    <Modal title="Готовые текста">
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
    </Modal>
  );
};

export default SelectText;
