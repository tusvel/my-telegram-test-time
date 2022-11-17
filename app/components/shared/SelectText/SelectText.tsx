import { FC, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';

import TextItem from '@/pages/texts/TextItem/TextItem';

import TagField from '@/components/shared/fields/TagField/TagField';

import Button from '@/ui/form-elements/Button';

import { useSearch } from '@/hooks/filter/useSearch';
import { useTags } from '@/hooks/filter/useTags';
import { useOutside } from '@/hooks/useOutside';
import { useTypedSelector } from '@/hooks/useTypedSelector';

import { IText } from '@/shared/types/text.interface';

import { telegramConverter } from '@/utils/telegram-converter';

import styles from './SelectText.module.scss';

const SelectText: FC = () => {
  const { isShow, setIsShow, ref } = useOutside(false);
  const { items } = useTypedSelector((state) => state.text);
  const [value, setValue] = useState('');
  const { control } = useForm({
    mode: 'onChange'
  });
  const tags = useWatch({
    control,
    name: 'tags_search'
  });
  const textItems = telegramConverter(undefined, items, '') as IText[];

  const textsItem = useSearch(textItems, value);
  const filterTags = useTags(textsItem, tags);

  return (
    <div>
      <Button
        onClick={(e) => {
          e.preventDefault();
          setIsShow(!isShow);
        }}
        className={'px-2 py-1'}
      >
        Готовые текста
      </Button>
      {isShow && (
        <div className={styles.selectTextWrap}>
          <div ref={ref} className={styles.selectTextContent}>
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
              <div
                onClick={() => setIsShow(false)}
                className="cursor-pointer absolute top-0 right-0 translate-x-[-35px] translate-y-[40px]"
              >
                ╳
              </div>
            </div>
            <div
              role="list"
              className="space-y-3 overflow-auto h-full pb-[95px] px-5"
            >
              {filterTags &&
                filterTags.map((item) => (
                  <TextItem
                    key={item.id}
                    item={item}
                    style={{ width: '100%' }}
                  />
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SelectText;
