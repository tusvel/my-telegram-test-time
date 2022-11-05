import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { useEffect } from 'react';

export const SaveAsHtmlPlugin = ({ setEditor }) => {
  const [editor] = useLexicalComposerContext();
  useEffect(() => {
    setEditor(editor);
  }, []);
};
