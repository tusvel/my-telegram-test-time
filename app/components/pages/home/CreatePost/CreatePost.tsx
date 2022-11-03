import dynamic from 'next/dynamic';
import { FC, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { IPostInput } from '@/pages/home/CreatePost/create-post.interface';
import { useCreatePost } from '@/pages/home/CreatePost/useCreatePost';
import SelectText from '@/pages/home/SelectText/SelectText';

import Button from '@/ui/form-elements/Button';
import { Dropzone } from '@/ui/form-elements/Dropzone';
import Field from '@/ui/form-elements/Field';
import Toggle from '@/ui/form-elements/Toggle';

import { useTypedSelector } from '@/hooks/useTypedSelector';

const TextEditor = dynamic(() => import('@/ui/TextEditor/TextEditor.js'), {
  ssr: false
});
const DynamicSelect = dynamic(() => import('@/ui/select/Select'), {
  ssr: false
});
const CreatePost: FC = () => {
  const [files, setFiles] = useState<any>([]);
  const [hasButton, setHasButton] = useState();
  const [hasDate, setHasDate] = useState();
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
    getValues,
    control,
    reset
  } = useForm<IPostInput>({
    mode: 'onChange'
  });
  const { onSubmit } = useCreatePost();
  const { items: chanelItems, isLoading } = useTypedSelector(
    (state) => state.channel
  );
  const { items: mediaItems } = useTypedSelector((state) => state.media);

  const optionsItems = chanelItems?.map((item) => ({
    value: item.id,
    label: item.title
  }));
  const mediaItemsSelect = mediaItems?.map((item) => ({
    value: item.url,
    label: item.url,
    image: item.url
  }));

  const addFiles = (newFiles: any) => {
    setFiles((prev: any) => [...prev, newFiles]);
  };
  const deleteFiles = (remainingFiles: any) => {
    setFiles(remainingFiles);
  };

  const formatOptionLabel = ({ image, label }: any) => (
    <div className="flex image-select__image-option">
      <img src={image} alt="golden gate bridge" className="w-20 h-20" />
      {label}
    </div>
  );

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-5">
          <Controller
            control={control}
            name="channel"
            render={({ field, fieldState: { error } }) => (
              <DynamicSelect
                field={field}
                options={optionsItems || []}
                isLoading={isLoading}
                isMulti={false}
                placeholder="Выберите канал"
                error={error}
              />
            )}
          />
        </div>
        <SelectText />
        <div className="flex mt-5 max-w-screen-xl justify-between mb-5 min-w-[1280px]">
          <div className="w-[300px]">
            <div className="mb-5">
              Выберите файлы
              <Controller
                control={control}
                name="media"
                render={({
                  field: { onChange, value },
                  fieldState: { error }
                }) => (
                  <Dropzone
                    multiple
                    showPreview
                    showFileSize
                    onChange={onChange}
                    onAddFiles={addFiles}
                    onDeleteFiles={deleteFiles}
                  />
                )}
              />
            </div>
          </div>
          <div className="mr-1 w-[600px]">
            <Controller
              control={control}
              name="text"
              render={({
                field: { onChange, value },
                fieldState: { error }
              }) => <TextEditor />}
            />
          </div>
          <div className="w-[300px] mt-5">
            <div className="mb-5">
              <div>Полноценно/Превью</div>
              <Controller
                control={control}
                name="media_style"
                defaultValue={false}
                render={({ field: { value, onChange } }) => (
                  <Toggle value={value} onChange={onChange} />
                )}
              />
            </div>
            <div className="mb-5">
              <div>Наличие кнопки</div>
              <Controller
                control={control}
                name="has_button"
                defaultValue={false}
                render={({ field: { value, onChange } }) => (
                  <Toggle
                    setHas={setHasButton}
                    value={value}
                    onChange={onChange}
                  />
                )}
              />
            </div>
            {hasButton && (
              <div className="mb-5">
                <div>
                  <Field
                    {...register('text_button')}
                    placeholder="Текст кнопки"
                    error={errors.text_button}
                    style={{ width: '300px' }}
                  />
                </div>
                <div>
                  <Field
                    {...register('button_url')}
                    placeholder="Ссылка кнопки"
                    error={errors.text_button}
                    style={{ width: '300px' }}
                  />
                </div>
              </div>
            )}
            <div className="mb-5">
              <div>Запланировать дату</div>
              <Controller
                control={control}
                name="send_time"
                defaultValue={false}
                render={({ field: { value, onChange } }) => (
                  <Toggle
                    setHas={setHasDate}
                    value={value}
                    onChange={onChange}
                  />
                )}
              />
            </div>
            {hasDate && (
              <div className="flex mb-5">
                <div className="mr-5">
                  <div>Выберите дату</div>
                  <Controller
                    control={control}
                    name="schedule_date"
                    render={({ field: { value, onChange } }) => (
                      <div>
                        <input type="date" onChange={onChange} />
                      </div>
                    )}
                  />
                </div>
                <div>
                  <div>Выберите время</div>
                  <Controller
                    control={control}
                    name="schedule_time"
                    render={({ field: { value, onChange } }) => (
                      <div>
                        <input type="time" onChange={onChange} />
                      </div>
                    )}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="mb-5">
          <Controller
            control={control}
            name="old_media"
            render={({ field, fieldState: { error } }) => (
              <DynamicSelect
                field={field}
                options={mediaItemsSelect || []}
                isLoading={isLoading}
                isMulti={true}
                placeholder="Выбрать медиа"
                error={error}
                formatOptionLabel={formatOptionLabel}
                classNamePrefix="media-select"
              />
            )}
          />
        </div>
        <Button className="mt-7">Создать</Button>
      </form>
    </div>
  );
};

export default CreatePost;
