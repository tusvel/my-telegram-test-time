import { $generateHtmlFromNodes } from '@lexical/html';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';

export let save;
let html;

export function SaveAsHtmlPlugin(onSave) {
  const [editor] = useLexicalComposerContext();

  save = () => {
    const rootElement = editor.getRootElement();
    if (rootElement) {
      editor.update(() => {
        html = $generateHtmlFromNodes(editor, null);
      });
      return html;
    }
  };
}
