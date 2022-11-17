import { $generateHtmlFromNodes } from '@lexical/html';
import { LexicalEditor } from 'lexical';

export const useSave = (editor: LexicalEditor) => {
  if (editor) {
    let html: string = '';
    const rootElement = editor.getRootElement();
    if (rootElement) {
      editor.update(() => {
        html = $generateHtmlFromNodes(editor, null);
      });
      return html;
    } else {
      return '';
    }
  }
};
