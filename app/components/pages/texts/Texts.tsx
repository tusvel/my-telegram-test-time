import dynamic from 'next/dynamic';
import { FC } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { ITextInput } from '@/pages/texts/ITextInput';
import TextItem from '@/pages/texts/TextItem/TextItem';
import { useCreateText } from '@/pages/texts/useTexts';

import Modal from '@/ui/Modal/Modal';

import { useTypedSelector } from '@/hooks/useTypedSelector';

import Meta from '@/utils/meta/Meta';

const DynamicSelect = dynamic(() => import('@/ui/select/Select'), {
  ssr: false
});
const Texts: FC = () => {
  const { items } = useTypedSelector((state) => state.text);
  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
    reset,
    watch
  } = useForm<ITextInput>({
    mode: 'onChange'
  });
  const { onSubmit } = useCreateText();

  return (
    <Meta title="Texts" description="Texts in telegram">
      <div>
        <Modal title="Добавить текст">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-5">
              <Controller
                control={control}
                name="old_media"
                render={({ field, fieldState: { error } }) => (
                  <DynamicSelect
                    field={field}
                    options={mediaItemsSelect || []}
                    isMulti={false}
                    placeholder="Выбрать медиа"
                    error={error}
                    classNamePrefix="media-select"
                  />
                )}
              />
            </div>
          </form>
        </Modal>
        <ul role="list" className="space-y-3 mt-5">
          {items?.length &&
            items.map((item) => (
              <div key={item.id}>
                <TextItem item={item} />
              </div>
            ))}
        </ul>
      </div>
    </Meta>
  );
};

export default Texts;
