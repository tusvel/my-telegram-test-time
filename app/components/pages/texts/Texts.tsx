import { $generateHtmlFromNodes } from '@lexical/html';
import { LexicalEditor } from 'lexical';
import dynamic from 'next/dynamic';
import { FC } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { ITextInput } from '@/pages/texts/ITextInput';
import TextItem from '@/pages/texts/TextItem/TextItem';
import { useCreateText } from '@/pages/texts/useTexts';

import Button from '@/components/ui/form-elements/Button';

import Modal from '@/ui/Modal/Modal';

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
const Texts: FC = () => {
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
  } = useForm<ITextInput>({
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

  return (
    <Meta title="Texts" description="Texts in telegram">
      <div>
        <Modal title="Добавить текст">
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
            {/* @ts-ignore*/}
            <TextEditor setEditor={setEditor} />
            <Button>Создать текст</Button>
          </form>
        </Modal>
        <ul role="list" className="space-y-3 mt-5">
          {textItems?.length &&
            textItems.map((item) => (
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
