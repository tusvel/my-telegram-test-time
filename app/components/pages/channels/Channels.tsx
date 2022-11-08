import dynamic from 'next/dynamic';
import { FC } from 'react';
import { Controller, useForm } from 'react-hook-form';

import ChannelItem from '@/pages/channels/ChannelItem/ChannelItem';
import { IChannelInput } from '@/pages/channels/IChannelInput';
import { useCreateChannel } from '@/pages/channels/useChannels';

import CategoryField from '@/components/shared/fields/CategoryField/CategoryField';

import Modal from '@/ui/Modal/Modal';
import Button from '@/ui/form-elements/Button';

import { useTypedSelector } from '@/hooks/useTypedSelector';

import { LanguageType } from '@/shared/types/language.type';

import Meta from '@/utils/meta/Meta';

const DynamicSelect = dynamic(() => import('@/ui/select/Select'), {
  ssr: false
});
const Channels: FC = () => {
  const { items } = useTypedSelector((state) => state.channel);
  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
    reset,
    watch
  } = useForm<IChannelInput>({
    mode: 'onChange'
  });
  const { onSubmit } = useCreateChannel();

  return (
    <Meta title="Channels" description="Channels in telegram">
      <Modal title="Добавить канал">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mt-5">
            <Controller
              control={control}
              name="id_channel"
              render={({ field: { onChange, value } }) => (
                <input
                  type="text"
                  onChange={onChange}
                  placeholder="Введите id канала"
                />
              )}
            />
          </div>
          <div className="mb-5 flex items-center">
            <CategoryField
              className="mr-5"
              control={control}
              name="categories"
            />
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
