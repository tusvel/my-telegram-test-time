import dynamic from 'next/dynamic';
import { FC } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { ICreatePost } from '@/pages/home/CreatePost/create-post.interface';
import { useCreatePost } from '@/pages/home/CreatePost/useCreatePost';
import { usePostForm } from '@/pages/home/CreatePost/usePostForm';

import ChannelField from '@/components/shared/fields/ChannelField/ChannelField';
import DropField from '@/components/shared/fields/DropField/DropField';
import MediaField from '@/components/shared/fields/MediaField/MediaField';

import EmojiMart from '@/ui/EmojiMart/EmojiMart';
import Button from '@/ui/form-elements/Button';
import Field from '@/ui/form-elements/Field';
import Toggle from '@/ui/form-elements/Toggle';
import styles from '@/ui/form-elements/form.module.scss';
import formStyles from '@/ui/form-elements/form.module.scss';

const SelectText = dynamic(
  () => import('@/components/shared/SelectText/SelectText'),
  {
    ssr: false
  }
);
const TextEditor = dynamic(() => import('@/ui/TextEditor/TextEditor.js'), {
  ssr: false
});
const DynamicSelect = dynamic(() => import('@/ui/select/Select'), {
  ssr: false
});

const CreatePost: FC = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
    reset,
    watch,
    setError
  } = useForm<ICreatePost>({
    mode: 'onChange'
  });

  const {
    applyButton,
    setApplyButton,
    buttonIOptions,
    formatOptionButton,
    isSendTime,
    setIsSendTime
  } = useCreatePost();
  const { onSubmit, setEditor } = usePostForm(reset, setError, applyButton);

  register('text');

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ChannelField
          isRequired={true}
          className="mb-5"
          control={control}
          name="channel_id"
        />
        <SelectText />
        <div className="flex mt-5 max-w-screen-xl justify-between mb-5 min-w-[1280px]">
          <div>
            <div className="flex">
              <div>
                <DropField
                  control={control}
                  name="media"
                  className="mb-5 mr-[40px] w-[350px]"
                />
                <MediaField
                  control={control}
                  name="media_id"
                  className="mb-5"
                />
                <div className="relative">
                  <Button className="mt-7 mb-3">Создать</Button>
                  {errors.text && (
                    <span className={formStyles.error}>Введите текст</span>
                  )}
                </div>
              </div>
              <div>
                <Controller
                  control={control}
                  name="text"
                  render={() => <TextEditor setEditor={setEditor} />}
                />
              </div>
            </div>
          </div>
          <div className="w-[300px] mt-5">
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
            <div className="mb-3">
              <div>Наличие кнопки</div>
              <Controller
                control={control}
                name="has_button"
                defaultValue={false}
                render={({ field: { value, onChange } }) => (
                  <Toggle value={value} onChange={onChange} />
                )}
              />
            </div>
            {watch('has_button') && (
              <div className="mb-3">
                <div className="flex mb-3">
                  <Toggle
                    value={applyButton}
                    onChange={() => setApplyButton((prev) => !prev)}
                  />
                  <div className="ml-1">Выбрать готовую</div>
                </div>
                <div>
                  {applyButton ? (
                    <div className="mb-2">
                      <Controller
                        control={control}
                        name="local_button"
                        render={({ field, fieldState: { error } }) => (
                          <DynamicSelect
                            field={field}
                            options={buttonIOptions}
                            isMulti={false}
                            formatOptionLabel={formatOptionButton}
                            placeholder="Выбрать готовую кнопку"
                            error={error}
                            classNamePrefix="media-select"
                          />
                        )}
                      />
                    </div>
                  ) : (
                    <>
                      <Controller
                        control={control}
                        name="text_button"
                        render={({ field: { onChange, value } }) => (
                          <div className={styles.emojiInput}>
                            <input
                              type="text"
                              onChange={(e) => onChange(e.target.value)}
                              value={value}
                            />
                            <EmojiMart onChange={onChange} value={value} />
                          </div>
                        )}
                      />
                      <div>
                        <Field
                          {...register('button_url')}
                          placeholder="Ссылка кнопки"
                          error={errors.text_button}
                          style={{ width: '300px' }}
                        />
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}
            <div className="mb-5">
              <div>Запланировать дату</div>
              <Toggle
                value={isSendTime}
                onChange={() => setIsSendTime((prev) => !prev)}
              />
            </div>
            {isSendTime && (
              <div className="flex mb-5">
                <div className="mr-5">
                  <div>Выберите дату</div>
                  <Controller
                    control={control}
                    name="schedule_date"
                    render={({ field: { onChange } }) => (
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
                    render={({ field: { onChange } }) => (
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
      </form>
    </div>
  );
};

export default CreatePost;
