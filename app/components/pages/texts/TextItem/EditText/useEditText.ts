import { $generateNodesFromDOM } from '@lexical/html';
import { $getRoot, $insertNodes, LexicalEditor } from 'lexical';
import { useEffect, useState } from 'react';
import { SubmitHandler, UseFormSetValue } from 'react-hook-form';
import { useMutation } from 'react-query';

import { useSave } from '@/hooks/textEditor/useSave';

import { IPostTextResponse } from '@/shared/types/post-text/post-text-response.interface';

import { PostTextService } from '@/services/post-text/post-text.service';

import { getKeys } from '@/utils/object/getKeys';
import { telegramConverter } from '@/utils/telegram-converter';

export const useTextEdit = (
  setValue: UseFormSetValue<IPostTextResponse>,
  save: any,
  item: IPostTextResponse,
  setError: any
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
    getKeys(item).forEach((key: keyof IPostTextResponse) => {
      if (key === 'tags') {
        return setValue(key, tags);
      }
      setValue(key, item[key]);
    });
    if (editor) {
      htmlInEdit(editor);
    }
  }, [editor]);

  const { mutateAsync } = useMutation(
    'update movie',
    (data: IPostTextResponse) =>
      PostTextService.update({
        id: data.id,
        tag_ids: data.tag_ids,
        vertical: data.vertical,
        language: data.language,
        text: data.text,
        channel_id: data.channel_id
      })
  );

  const onSubmit: SubmitHandler<IPostTextResponse> = async (data) => {
    data.text = telegramConverter(useSave(editor), null, 'html') as string;
    if (data.text?.length < 8) {
      return setError('text', { type: 'custom', message: 'Введите текст' });
    }
    console.log(data);
    await mutateAsync(data);
  };

  return { onSubmit, setEditor };
};
