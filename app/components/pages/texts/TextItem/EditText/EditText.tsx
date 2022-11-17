import { $generateHtmlFromNodes } from '@lexical/html';
import { LexicalEditor } from 'lexical';
import Image from 'next/image';
import { FC, MouseEvent } from 'react';
import { useForm } from 'react-hook-form';

import SelectText from '@/pages/../../../../shared/SelectText/SelectText';
import { ITextInput } from '@/pages/texts/ITextInput';
import { useTextEdit } from '@/pages/texts/TextItem/EditText/useEditText';
import styles from '@/pages/texts/TextItem/TextItem.module.scss';

import TagField from '@/components/shared/fields/TagField/TagField';
import TextFields from '@/components/shared/fields/textFields/textFields';

import TextEditor from '@/ui/TextEditor/TextEditor';
import Button from '@/ui/form-elements/Button';

import { useOutside } from '@/hooks/useOutside';

import { IText } from '@/shared/types/text.interface';

import settingsIcon from '@/assets/icons/setting.svg';

const EditText: FC<{ item: IText }> = ({ item }) => {
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

  const { isShow, setIsShow, ref } = useOutside(false);
  const { handleSubmit, control, setValue } = useForm<ITextInput>({
    mode: 'onChange'
  });
  const onEdit = async (event: MouseEvent<HTMLButtonElement>) => {
    document.body.classList.add('lock');
    event.stopPropagation();
    setIsShow(!isShow);
  };
  const { onSubmit, setEditor } = useTextEdit(setValue, save, item);

  return (
    <div onClick={(e) => e.stopPropagation()}>
      <button className={styles.settings} onClick={onEdit}>
        <Image src={settingsIcon} alt="settings" />
      </button>
      {isShow && (
        <div className={styles.selectTextWrap}>
          <div ref={ref} className={styles.selectTextContent}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <TextFields control={control} />
              <TagField control={control} name="tags" className="mr-5 my-7" />
              <SelectText />
              <div className="relative">
                <TextEditor setEditor={setEditor} />
              </div>
              <Button className="absolute bottom-5 right-5">
                Сохранить изменения
              </Button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditText;
