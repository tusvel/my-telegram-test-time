import { $generateHtmlFromNodes } from '@lexical/html';
import { LexicalEditor } from 'lexical';
import dynamic from 'next/dynamic';
import { FC } from 'react';
import { useForm } from 'react-hook-form';

import SelectText from '@/pages/home/SelectText/SelectText';
import { ITextInput } from '@/pages/texts/ITextInput';
import TextItem from '@/pages/texts/TextItem/TextItem';
import { useCreateText } from '@/pages/texts/useTexts';
import { useEditText } from '@/pages/texts/useTextsEdit';

import TagField from '@/components/shared/fields/TagField/TagField';
import TextFields from '@/components/shared/fields/textFields/textFields';
import Button from '@/components/ui/form-elements/Button';

import Modal from '@/ui/Modal/Modal';

import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useTypedSelector } from '@/hooks/useTypedSelector';

import Meta from '@/utils/meta/Meta';

import { clear } from '@/store/textEdit/textEdit.slice';

const DynamicSelect = dynamic(() => import('@/ui/select/Select'), {
  ssr: false
});
const TextEditor = dynamic(() => import('@/ui/TextEditor/TextEditor.js'), {
  ssr: false
});
const Texts: FC = () => {
  const {
    text: { items: textItems },
    textEdit: { items: textEdit }
  } = useTypedSelector((state) => state);
  const { handleSubmit, control } = useForm<ITextInput>({
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
  const dispatch = useAppDispatch();
  const clearTextItems = () => {
    dispatch(clear());
  };
  const { onSubmit, setEditor } = useCreateText(save);
  const { onEditSubmit } = useEditText(clearTextItems);

  return (
    <Meta title="Texts" description="Texts in telegram">
      <div>
        <Modal title="Добавить текст">
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextFields control={control} />
            <TagField control={control} name="tags" className="mr-5 mb-5" />
            <SelectText />
            <div className="relative">
              <TextEditor setEditor={setEditor} />
            </div>
            <Button className="absolute bottom-5 right-5">Создать текст</Button>
          </form>
        </Modal>
        {(textEdit?.length || [].length) > 0 && (
          <div className="flex items-center mt-5">
            <Button className="mr-5 py-1 px-1" onClick={clearTextItems}>
              Очистить выбранные элементы
            </Button>
            <Modal title="Редактировать">
              <form onSubmit={handleSubmit(onEditSubmit)}>
                <TextFields control={control} />
                <Button>Сохранить изменения</Button>
              </form>
            </Modal>
          </div>
        )}
        <ul role="list" className="space-y-3 mt-5">
          {textItems?.length &&
            textItems.map((item) => (
              <div key={item.id}>
                <TextItem check={true} item={item} />
              </div>
            ))}
        </ul>
      </div>
    </Meta>
  );
};

export default Texts;
