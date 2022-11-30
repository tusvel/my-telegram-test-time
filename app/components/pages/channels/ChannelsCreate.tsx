import dynamic from 'next/dynamic';
import { FC, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import styles from '@/pages/channels/Channels.module.scss';
import { useCreateChannel } from '@/pages/channels/useChannels';

import ButtonTextsInterval from '@/components/shared/fields/ButtonTextsInterval/ButtonTextsInterval';
import ContactField from '@/components/shared/fields/ContactField/ContactField';
import DropField from '@/components/shared/fields/DropField/DropField';
import IntervalInput from '@/components/shared/fields/IntervalInput/IntervalInput';
import LangField from '@/components/shared/fields/LangField/LangField';
import MediaTypeField from '@/components/shared/fields/MediaTypeField/MediaTypeField';
import TagField from '@/components/shared/fields/TagField/TagField';
import VerticalField from '@/components/shared/fields/VerticalField/VerticalField';
import Button from '@/components/ui/form-elements/Button';

import Modal from '@/ui/Modal/Modal';
import Toggle from '@/ui/form-elements/Toggle';
import formStyles from '@/ui/form-elements/form.module.scss';
import { tzData } from '@/ui/timezone/data';

import { IChannelCreateRequest } from '@/shared/types/channel/channel-create.interface';

const DynamicSelect = dynamic(() => import('@/ui/select/Select'), {
  ssr: false
});

const ChannelsCreate: FC = () => {
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
  const [itemsButton, setItemsButton] = useState({});

  const { onSubmit } = useCreateChannel(itemsTime, itemsButton, reset);

  return (
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
                <span className={formStyles.error}>{errors.title.message}</span>
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
          <div className="mt-[-17px] ml-5 flex flex-col">
            <ContactField
              {...register('contact', {
                required: 'Введите контакты'
              })}
            />
          </div>
        </div>
        <div className="flex">
          <div>
            <IntervalInput itemsTime={itemsTime} setItemsTime={setItemsTime} />
          </div>
          <div className="flex">
            <div className="mx-5 mt-[-6px]">
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
                <ButtonTextsInterval
                  setItems={setItemsButton}
                  items={itemsButton}
                />
                {errors.button_texts && (
                  <span className={formStyles.error}>
                    {errors.button_texts.message}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="flex">
          <div className={styles.dropField}>
            <DropField
              title="Картинка канала"
              multiple={false}
              control={control}
              name="profile_picture"
              className="mb-5 mt-[-9px] mr-[40px] w-[350px]"
            />
          </div>
          <div>
            <div className="mt-2 mb-5">
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
          </div>
        </div>
        {errors && Object.keys(errors)}
        <Button>Создать канал</Button>
      </form>
    </Modal>
  );
};

export default ChannelsCreate;
