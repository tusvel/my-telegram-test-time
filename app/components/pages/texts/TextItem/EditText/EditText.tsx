import { $generateHtmlFromNodes } from '@lexical/html';
import { LexicalEditor } from 'lexical';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { FC, MouseEvent } from 'react';
import { useForm } from 'react-hook-form';

import { useTextEdit } from '@/pages/texts/TextItem/EditText/useEditText';
import styles from '@/pages/texts/TextItem/TextItem.module.scss';

import TagField from '@/components/shared/fields/TagField/TagField';
import TextFields from '@/components/shared/fields/textFields/textFields';

import TextEditor from '@/ui/TextEditor/TextEditor';
import Button from '@/ui/form-elements/Button';

import { useOutside } from '@/hooks/useOutside';

import { IPostTextResponse } from '@/shared/types/post-text/post-text-response.interface';

import settingsIcon from '@/assets/icons/setting.svg';

const SelectText = dynamic(
  () => import('@/components/shared/SelectText/SelectText'),
  {
    ssr: false
  }
);

const EditText: FC<{ item: IPostTextResponse }> = ({ item }) => {
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
  const {
    register,
    handleSubmit,
    control,
    setValue,
    setError,
    formState: { errors }
  } = useForm<IPostTextResponse>({
    mode: 'onChange'
  });
  const onEdit = async (event: MouseEvent<HTMLButtonElement>) => {
    document.body.classList.add('lock');
    event.stopPropagation();
    setIsShow(!isShow);
  };
  register('text');
  const { onSubmit, setEditor } = useTextEdit(setValue, save, item, setError);

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
              {errors.text && <span>Заполните текст</span>}
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditText;
