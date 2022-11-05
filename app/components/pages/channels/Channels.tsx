import dynamic from 'next/dynamic';
import { FC } from 'react';
import { Controller, useForm } from 'react-hook-form';

import ChannelItem from '@/pages/channels/ChannelItem/ChannelItem';
import { useCreateChannel } from '@/pages/channels/useChannels';
import { ITextInput } from '@/pages/texts/ITextInput';

import Modal from '@/ui/Modal/Modal';
import Button from '@/ui/form-elements/Button';

import { useTypedSelector } from '@/hooks/useTypedSelector';

import { LanguageType } from '@/shared/types/language.type';

import { convertSelect } from '@/utils/convertSelect';
import Meta from '@/utils/meta/Meta';

const DynamicSelect = dynamic(() => import('@/ui/select/Select'), {
  ssr: false
});
const Channels: FC = () => {
  const {
    tag: { items: tagItems }
  } = useTypedSelector((state) => state);
  const selectTags = convertSelect(tagItems, 'value', 'id');
  const { items } = useTypedSelector((state) => state.channel);
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
  const { onSubmit } = useCreateChannel();

  return (
    <Meta title="Channels" description="Channels in telegram">
      <Modal title="Добавить канал">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="my-5 flex items-center">
            <div className="mr-5">
              <Controller
                control={control}
                name="tags"
                render={({ field, fieldState: { error } }) => (
                  <DynamicSelect
                    field={field}
                    options={selectTags || []}
                    isMulti={true}
                    placeholder="Выбрать теги"
                    error={error}
                    classNamePrefix="media-select"
                  />
                )}
              />
            </div>
            <Controller
              control={control}
              name="language"
              render={({ field, fieldState: { error } }) => (
                <DynamicSelect
                  field={field}
                  options={
                    ([
                      { label: 'ru', value: 'ru' },
                      { label: 'en', value: 'en' },
                      { label: 'es', value: 'es' }
                    ] as { label: LanguageType; value: LanguageType }[]) || []
                  }
                  isMulti={false}
                  placeholder="Выбрать язык"
                  error={error}
                  classNamePrefix="media-select"
                />
              )}
            />
          </div>
          <Button>Создать канал</Button>
        </form>
      </Modal>
      <ul role="list" className="space-y-3">
        {items?.length &&
          items.map((item) => <ChannelItem key={item.id} item={item} />)}
      </ul>
    </Meta>
  );
};

export default Channels;
