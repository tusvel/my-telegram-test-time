import dynamic from 'next/dynamic';
import { FC, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';

import SelectText from '@/pages/home/SelectText/SelectText';
import { ITextInput } from '@/pages/texts/ITextInput';
import TextItem from '@/pages/texts/TextItem/TextItem';
import { useCreateText } from '@/pages/texts/useTexts';
import { useEditText } from '@/pages/texts/useTextsEdit';

import TagField from '@/components/shared/fields/TagField/TagField';
import VerticalField from '@/components/shared/fields/VerticalField/VerticalField';
import TextFields from '@/components/shared/fields/textFields/textFields';
import Button from '@/components/ui/form-elements/Button';

import Modal from '@/ui/Modal/Modal';
import formStyles from '@/ui/form-elements/form.module.scss';

import { useSearch } from '@/hooks/filter/useSearch';
import { useTags } from '@/hooks/filter/useTags';
import { useVertical } from '@/hooks/filter/useVertical';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useTypedSelector } from '@/hooks/useTypedSelector';

import Meta from '@/utils/meta/Meta';

import { clear } from '@/store/textEdit/textEdit.slice';

const TextEditor = dynamic(() => import('@/ui/TextEditor/TextEditor.js'), {
  ssr: false
});
const Texts: FC = () => {
  const {
    text: { items: textItems },
    textEdit: { items: textEdit }
  } = useTypedSelector((state) => state);
  const {
    control,
    handleSubmit,
    setError,
    register,
    formState: { errors }
  } = useForm<ITextInput>({
    mode: 'onChange'
  });
  const dispatch = useAppDispatch();
  const clearTextItems = () => {
    dispatch(clear());
  };
  const { onSubmit, setEditor } = useCreateText(setError);
  const { onEditSubmit } = useEditText(clearTextItems);

  //filter
  register('text');
  const vertical = useWatch({
    control,
    name: 'vertical'
  });
  const tags = useWatch({
    control,
    name: 'tags_search'
  });
  const [value, setValue] = useState('');
  const textsItem = useSearch(textItems, value);
  const filterTags = useTags(textsItem, tags);
  const filterVertical = useVertical(filterTags, vertical);

  return (
    <Meta title="Texts" description="Texts in telegram">
      <div>
        <div className="flex items-center">
          <Modal title="Добавить текст">
            <form onSubmit={handleSubmit(onSubmit)}>
              <TextFields control={control} />
              <TagField control={control} name="tags" className="mr-5 mb-8" />
              <SelectText />
              <div className="relative">
                <TextEditor setEditor={setEditor} />
                {errors.text && (
                  <span className={formStyles.error}>Введите текст</span>
                )}
              </div>
              <Button className="absolute bottom-5 right-5">
                Создать текст
              </Button>
            </form>
          </Modal>
          {(textEdit?.length || [].length) > 0 && (
            <div className="flex items-center ml-5">
              <Button className="mr-5 px-1" onClick={clearTextItems}>
                Очистить выбранные элементы
              </Button>
              <Modal title="Редактировать">
                <form onSubmit={handleSubmit(onEditSubmit)}>
                  <TextFields control={control} />
                  <Button>Сохранить изменения</Button>
                </form>
              </Modal>
            </div>
          )}
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Поиск текста"
            className="mx-5"
            style={{
              display: 'block',
              width: '300px',
              borderRadius: '15px',
              height: '50px'
            }}
          />
          <TagField required={false} control={control} name="tags_search" />
          <VerticalField className="ml-5" control={control} name="vertical" />
        </div>
        <ul role="list" className="space-y-3 mt-5">
          {filterVertical &&
            filterVertical?.length > 0 &&
            filterVertical.map((item) => (
              <div key={item.id}>
                <TextItem check={true} item={item} />
              </div>
            ))}
        </ul>
      </div>
    </Meta>
  );
};

export default Texts;
