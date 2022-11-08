import { $generateHtmlFromNodes } from '@lexical/html';
import { LexicalEditor } from 'lexical';
import dynamic from 'next/dynamic';
import { FC } from 'react';
import { useForm } from 'react-hook-form';

import { ITextInput } from '@/pages/texts/ITextInput';
import TextItem from '@/pages/texts/TextItem/TextItem';
import { useCreateText } from '@/pages/texts/useTexts';

import CategoryField from '@/components/shared/fields/CategoryField/CategoryField';
import ChannelField from '@/components/shared/fields/ChannelField/ChannelField';
import LangField from '@/components/shared/fields/LangField/LangField';
import TagField from '@/components/shared/fields/TagField/TagField';
import Button from '@/components/ui/form-elements/Button';

import Modal from '@/ui/Modal/Modal';

import { useTypedSelector } from '@/hooks/useTypedSelector';

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
    formState: { errors },
    control,
    reset
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
  const { onSubmit, setEditor } = useCreateText(save, reset);

  return (
    <Meta title="Texts" description="Texts in telegram">
      <div>
        <Modal title="Добавить текст">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex items-center my-5">
              <ChannelField className="mr-5" control={control} name="channel" />
              <CategoryField
                className="mr-5"
                control={control}
                name="categories"
              />
            </div>
            <div className="mb-5 flex items-center">
              <TagField control={control} name="tags" className="mr-5" />
              <LangField control={control} name="language" />
            </div>
            <div className="relative">
              <TextEditor setEditor={setEditor} />
              <Button>Создать текст</Button>
            </div>
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
