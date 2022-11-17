import { $generateNodesFromDOM } from '@lexical/html';
import { $getRoot, $insertNodes, LexicalEditor } from 'lexical';
import { useEffect, useState } from 'react';
import { SubmitHandler, UseFormSetValue } from 'react-hook-form';
import { useMutation } from 'react-query';

import { ITextInput } from '@/pages/texts/ITextInput';

import { TextService } from '@/services/text.service';

import { getKeys } from '@/utils/object/getKeys';
import { telegramConverter } from '@/utils/telegram-converter';

export const useTextEdit = (
  setValue: UseFormSetValue<ITextInput>,
  save: any,
  item: ITextInput
) => {
  const [editor, setEditor] = useState<any>();
  const htmlInEdit = (editor: LexicalEditor) => {
    editor.update(() => {
      const parser = new DOMParser();
      const dom = parser.parseFromString(item.text, 'text/html');
      const nodes = $generateNodesFromDOM(editor, dom);
      $getRoot().select();
      $insertNodes(nodes);
    });
  };
  const tags = item.tags.map((item: any) => item);

  useEffect(() => {
    getKeys(item).forEach((key: keyof ITextInput) => {
      if (key === 'tags') {
        return setValue(key, tags);
      }
      setValue(key, item[key]);
    });
    if (editor) {
      htmlInEdit(editor);
    }
  }, [editor]);

  const { mutateAsync } = useMutation('update movie', (data: ITextInput) =>
    TextService.edit(item.id, data)
  );

  const onSubmit: SubmitHandler<ITextInput> = async (data) => {
    data.text = telegramConverter(save(editor), null, 'html') as string;
    console.log(data);
    await mutateAsync(data);
  };

  return { onSubmit, setEditor };
};
