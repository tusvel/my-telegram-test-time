import dynamic from 'next/dynamic';
import { FC, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import ChannelItem from '@/pages/channels/ChannelItem/ChannelItem';
import { useCreateChannel } from '@/pages/channels/useChannels';

import DropField from '@/components/shared/fields/DropField/DropField';
import IntervalInput from '@/components/shared/fields/IntervalInput/IntervalInput';
import LangField from '@/components/shared/fields/LangField/LangField';
import MediaTypeField from '@/components/shared/fields/MediaTypeField/MediaTypeField';
import TagField from '@/components/shared/fields/TagField/TagField';
import VerticalField from '@/components/shared/fields/VerticalField/VerticalField';

import Modal from '@/ui/Modal/Modal';
import Button from '@/ui/form-elements/Button';
import Toggle from '@/ui/form-elements/Toggle';
import formStyles from '@/ui/form-elements/form.module.scss';
import { tzData } from '@/ui/timezone/data';

import { useTypedSelector } from '@/hooks/useTypedSelector';

import { IChannelCreateRequest } from '@/shared/types/channel/channel-create.interface';

import Meta from '@/utils/meta/Meta';

import styles from './Channels.module.scss';

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
  } = useForm<IChannelCreateRequest>({
    mode: 'onChange'
  });
  const [itemsTime, setItemsTime] = useState({
    0: ['08:00', '09:00'],
    1: ['15:00', '16:00'],
    2: ['20:00', '21:00']
  });

  const { onSubmit } = useCreateChannel(itemsTime);

  return (
    <Meta title="Channels" description="Channels in telegram">
      <Modal title="Добавить канал">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-10 mt-2">
            <div className="relative flex items-center">
              <div className="mr-5">
                <input
                  type="text"
                  placeholder="Id канала"
                  {...register('id', {
                    required: 'Введите id канала'
                  })}
                />
                {errors.id && (
                  <span className={formStyles.error}>{errors.id.message}</span>
                )}
              </div>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Название канала"
                  {...register('title', {
                    required: 'Введите название канала'
                  })}
                />
                {errors.title && (
                  <span className={formStyles.error}>
                    {errors.title.message}
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="mb-8 flex items-center">
            <VerticalField
              className="mr-5"
              control={control}
              name="vertical"
              isRequired
            />
            <LangField isRequired control={control} name="language" />
          </div>
          <div className="mb-5 flex items-center">
            <Controller
              control={control}
              name="timezone"
              rules={{
                required: 'Укажите таймзону'
              }}
              defaultValue="Europe/Kiev"
              render={({ field, fieldState: { error } }) => (
                <DynamicSelect
                  field={field}
                  options={tzData}
                  isMulti={false}
                  placeholder="Укажите таймзону"
                  error={error}
                />
              )}
            />
            <TagField
              className="ml-5"
              required={true}
              control={control}
              name="tags"
            />
          </div>
          <div className="flex items-center my-3">
            <MediaTypeField
              control={control}
              name="media_type"
              isRequired={true}
            />
            <div className="mx-5">
              <div>Наличие кнопки</div>
              <Controller
                control={control}
                name="button_enabled"
                defaultValue={false}
                render={({ field: { value, onChange } }) => (
                  <Toggle value={value} onChange={onChange} />
                )}
              />
            </div>
            {watch('button_enabled') && (
              <div className="relative">
                <input
                  type="text"
                  placeholder="Текст кнопки"
                  {...register('buttons_text', {
                    required: 'Введите Текст кнопки'
                  })}
                />
                {errors.buttons_text && (
                  <span className={formStyles.error}>
                    {errors.buttons_text.message}
                  </span>
                )}
              </div>
            )}
          </div>
          <div className="flex">
            <div className="mr-10">
              <IntervalInput
                itemsTime={itemsTime}
                setItemsTime={setItemsTime}
                control={control}
              />
            </div>
            <div className={styles.dropField}>
              <DropField
                title="Картинка канала"
                multiple={false}
                control={control}
                name="profice_picture"
                className="mb-5 mt-[-9px] mr-[40px] w-[350px]"
              />
            </div>
          </div>
          <div className="mb-5">
            <div>Полноценно/Превью</div>
            <Controller
              control={control}
              name="is_preview"
              defaultValue={false}
              render={({ field: { value, onChange } }) => (
                <Toggle value={value} onChange={onChange} />
              )}
            />
          </div>
          <Button>Создать канал</Button>
        </form>
      </Modal>
      {Array.isArray(items) && (
        <ul role="list" className="space-y-3 mt-5">
          {items?.length &&
            items.map((item) => <ChannelItem key={item.id} item={item} />)}
        </ul>
      )}
    </Meta>
  );
};

export default Channels;
