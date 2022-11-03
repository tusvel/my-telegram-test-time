import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $insertNodeToNearestRoot } from '@lexical/utils';
import { createCommand } from 'lexical';
import { useEffect } from 'react';

import { $createCustomToggle } from './TogglePlugin';

export const HIDE_TEXT = createCommand();
const LowPriority = 1;

export function RegisterPlugin() {
  const [editor] = useLexicalComposerContext();
  useEffect(() => {
    return editor.registerCommand(
      HIDE_TEXT,
      (payload) => {
        const tweetNode = $createCustomToggle(payload);
        $insertNodeToNearestRoot(tweetNode);

        return true;
      },
      LowPriority
    );
  }, []);
}
