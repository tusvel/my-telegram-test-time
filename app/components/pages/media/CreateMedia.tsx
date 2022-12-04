import { $generateHtmlFromNodes } from '@lexical/html';
import { LexicalEditor } from 'lexical';
import dynamic from 'next/dynamic';
import { FC } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { useCreateMedia } from '@/pages/media/useMedia';

import ChannelField from '@/components/shared/fields/ChannelField/ChannelField';
import VerticalField from '@/components/shared/fields/VerticalField/VerticalField';

import Modal from '@/ui/Modal/Modal';
import Button from '@/ui/form-elements/Button';
import { IOption } from '@/ui/select/select.interface';

import { useTypedSelector } from '@/hooks/useTypedSelector';

import { LanguageType } from '@/shared/types/language/language.type';
import { IMediaCreateRequest } from '@/shared/types/media/media-create.interface';

import { convertSelect } from '@/utils/convertSelect';

const DynamicSelect = dynamic(() => import('@/ui/select/Select'), {
  ssr: false
});
const DropField = dynamic(
  () => import('@/components/shared/fields/DropField/DropField'),
  {
    ssr: false
  }
);
const CreateMedia: FC = () => {
  const {
    text: { items: textItems },
    tag: { items: tagItems }
  } = useTypedSelector((state) => state);
  const selectTags = convertSelect(tagItems || [], 'value', 'id');
  const {
    handleSubmit,
    formState: { errors },
    control
  } = useForm<IMediaCreateRequest>({
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
  const { onSubmit, setEditor } = useCreateMedia(save);

  return (
    <Modal title="Добавить медиа">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="my-5 flex items-center">
          <div className="mr-5">
            <Controller
              control={control}
              name="tag_ids"
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
        <div className="mt-7 mb-3 flex items-center">
          <Controller
            control={control}
            name="type"
            render={({ field, fieldState: { error } }) => (
              <DynamicSelect
                field={field}
                options={
                  ([
                    { label: 'photo', value: 'photo' },
                    { label: 'voice', value: 'voice' },
                    { label: 'video', value: 'video' },
                    { label: 'videoNote', value: 'videoNote' }
                  ] as IOption[]) || []
                }
                isMulti={false}
                placeholder="Выбрать тип"
                error={error}
                classNamePrefix="media-select"
              />
            )}
          />
          <ChannelField className="ml-5" control={control} name="channel_id" />
        </div>
        <VerticalField
          className="my-5"
          control={control}
          name="vertical"
          isRequired
        />
        <DropField
          title="Добавить изображения"
          multiple
          control={control}
          name="profile_picture"
          className="mb-5 mr-[40px] w-[350px]"
        />
        <Button>Создать медиа</Button>
      </form>
    </Modal>
  );
};

export default CreateMedia;
