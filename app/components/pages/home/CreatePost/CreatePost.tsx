import { $generateHtmlFromNodes } from '@lexical/html';
import { LexicalEditor } from 'lexical';
import dynamic from 'next/dynamic';
import { FC } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { IPostInput } from '@/pages/home/CreatePost/create-post.interface';
import { useCreatePost } from '@/pages/home/CreatePost/useCreatePost';

import ChannelField from '@/components/shared/fields/ChannelField/ChannelField';
import DropField from '@/components/shared/fields/DropField/DropField';
import MediaField from '@/components/shared/fields/MediaField/MediaField';

import EmojiMart from '@/ui/EmojiMart/EmojiMart';
import Button from '@/ui/form-elements/Button';
import Field from '@/ui/form-elements/Field';
import Toggle from '@/ui/form-elements/Toggle';
import styles from '@/ui/form-elements/form.module.scss';

import { IButton } from '@/shared/types/button.interface';

import { convertSelect } from '@/utils/convertSelect';
import { getStoreLocal } from '@/utils/local-storage';

const SelectText = dynamic(() => import('@/pages/home/SelectText/SelectText'), {
  ssr: false
});
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
    watch
  } = useForm<IPostInput>({
    mode: 'onChange'
  });
  const save = (editor: LexicalEditor) => {
    let html;
    const rootElement = editor.getRootElement();
    if (rootElement) {
      editor.update(() => {
        html = $generateHtmlFromNodes(editor, null);
      });
      return html;
    }
  };
  const { onSubmit, setEditor } = useCreatePost(save, reset);
  const buttonsLs = getStoreLocal('buttons') || [];
  const buttonIOptions = convertSelect(buttonsLs, 'label', 'value');

  const formatOptionButton = ({ value, label }: IButton) => (
    <div className="flex image-select__image-option">
      {label} : {value}
    </div>
  );
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ChannelField className="mb-5" control={control} name="channel" />
        <SelectText />
        <div className="flex mt-5 max-w-screen-xl justify-between mb-5 min-w-[1280px]">
          <div>
            <div className="flex">
              <DropField
                control={control}
                name="media"
                className="mb-5 mr-10 w-[300px]"
              />
              <div className="mr-1 w-[600px]">
                <Controller
                  control={control}
                  name="text"
                  render={({
                    field: { onChange, value },
                    fieldState: { error }
                    // @ts-ignore
                  }) => <TextEditor setEditor={setEditor} />}
                />
              </div>
            </div>
            <MediaField control={control} name="old_media" className="mb-5" />
            <Button className="mt-7">Создать</Button>
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
                  <Controller
                    control={control}
                    name="apply_button"
                    render={({ field: { value, onChange } }) => (
                      <Toggle value={value} onChange={onChange} />
                    )}
                  />
                  <div className="ml-1">Выбрать готовую</div>
                </div>
                <div>
                  {watch('apply_button') ? (
                    <div className="mb-2">
                      <Controller
                        control={control}
                        name="value_button"
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
              <Controller
                control={control}
                name="send_time"
                defaultValue={false}
                render={({ field: { value, onChange } }) => (
                  <Toggle value={value} onChange={onChange} />
                )}
              />
            </div>
            {watch('send_time') && (
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
      </form>
    </div>
  );
};

export default CreatePost;
