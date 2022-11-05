import { $generateHtmlFromNodes } from '@lexical/html';
import { LexicalEditor } from 'lexical';
import dynamic from 'next/dynamic';
import { FC } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { IMediaInput } from '@/pages/media/IMediaInput';
import MediaItem from '@/pages/media/MediaItem/MediaItem';
import { useCreateText } from '@/pages/texts/useTexts';

import UploadField from '@/components/ui/form-elements/UploadField/UploadField';

import Modal from '@/ui/Modal/Modal';
import Button from '@/ui/form-elements/Button';

import { useTypedSelector } from '@/hooks/useTypedSelector';

import { LanguageType } from '@/shared/types/language.type';

import { convertSelect } from '@/utils/convertSelect';
import Meta from '@/utils/meta/Meta';

const DynamicSelect = dynamic(() => import('@/ui/select/Select'), {
  ssr: false
});
const TextEditor = dynamic(() => import('@/ui/TextEditor/TextEditor.js'), {
  ssr: false
});
const Media: FC = () => {
  const {
    text: { items: textItems },
    tag: { items: tagItems }
  } = useTypedSelector((state) => state);
  const selectTags = convertSelect(tagItems, 'value', 'id');
  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
    reset,
    watch
  } = useForm<IMediaInput>({
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
  const { onSubmit, setEditor } = useCreateText(save);

  const { items } = useTypedSelector((state) => state.media);
  return (
    <Meta title="Media" description="Media in telegram">
      <div>
        <Modal title="Добавить медиа">
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
                name="languages"
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
            <Controller
              control={control}
              name="url"
              render={({
                field: { value, onChange },
                fieldState: { error }
              }) => (
                <UploadField
                  onChange={onChange}
                  value={value}
                  folder="movies"
                  placeholder="Выберите файлы"
                  isNoImage
                  style={{ marginTop: -25 }}
                  error={error}
                />
              )}
              rules={{
                required: 'Video is required!'
              }}
            />
            <Button>Создать медиа</Button>
          </form>
        </Modal>
        <ul role="list" className="space-y-3 mt-5">
          {items &&
            items.length > 0 &&
            items.map((item) => <MediaItem key={item.id} item={item} />)}
        </ul>
      </div>
    </Meta>
  );
};

export default Media;
