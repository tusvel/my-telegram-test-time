import { FC, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';

import TextItem from '@/pages/texts/TextItem/TextItem';

import TagField from '@/components/shared/fields/TagField/TagField';

import Modal from '@/ui/Modal/Modal';

import { useFilter } from '@/hooks/useFilter';
import { useTypedSelector } from '@/hooks/useTypedSelector';

import { IText } from '@/shared/types/text.interface';

import { telegramConverter } from '@/utils/telegram-converter';

const SelectText: FC = () => {
  const { control } = useForm({
    mode: 'onChange'
  });
  const tags = useWatch({
    control,
    name: 'tags_search'
  });

  const { items } = useTypedSelector((state) => state.text);
  const [value, setValue] = useState('');
  const texts = telegramConverter(null, items, '') as IText[];
  const textsItem = useFilter(texts, value);
  let filteredItems;

  if (tags?.length && tags?.length > 0) {
    filteredItems = textsItem?.filter((item) => {
      return tags.find((itemForm: string) => {
        return item.tags.find((tag) => tag.value === itemForm);
      });
    });
  } else {
    filteredItems = texts;
  }

  return (
    <Modal title="Готовые текста">
      <div className="flex items-center mt-[-14px]">
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Поиск текста"
          style={{
            margin: '35px 50px 15px 19px',
            display: 'block',
            width: '300px',
            borderRadius: '15px'
          }}
        />
        <TagField required={false} control={control} name="tags_search" />
      </div>
      <div
        role="list"
        className="space-y-3 overflow-auto h-full pb-[95px] px-5"
      >
        {filteredItems &&
          (filteredItems as IText[]).map((item) => (
            <TextItem key={item.id} item={item} style={{ width: '100%' }} />
          ))}
      </div>
    </Modal>
  );
};

export default SelectText;
