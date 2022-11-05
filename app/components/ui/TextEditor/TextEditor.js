import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import { CodeHighlightNode, CodeNode } from '@lexical/code';
import { AutoLinkNode, LinkNode } from '@lexical/link';
import { ListItemNode, ListNode } from '@lexical/list';
import { TRANSFORMERS } from '@lexical/markdown';
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { MarkdownShortcutPlugin } from '@lexical/react/LexicalMarkdownShortcutPlugin';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { HeadingNode, QuoteNode } from '@lexical/rich-text';
import { TableCellNode, TableNode, TableRowNode } from '@lexical/table';
import { $getRoot, $getSelection } from 'lexical';
import Image from 'next/image';
import { useState } from 'react';

import emojiSmile from '@/assets/icons/emojiSmile.svg';

import styles from '../form-elements/form.module.scss';

import AutoLinkPlugin from './plugins/AutoLinkPlugin';
import CodeHighlightPlugin from './plugins/CodeHighlightPlugin';
import ListMaxIndentLevelPlugin from './plugins/ListMaxIndentLevelPlugin';
import { MaxLengthPlugin } from './plugins/MaxLengthPlugin';
import { RegisterPlugin } from './plugins/RegisterPlugin';
import { SaveAsHtmlPlugin } from './plugins/SaveAsHtmlPlugin';
import ToolbarPlugin from './plugins/ToolbarPlugin';
import ExampleTheme from './themes/ExampleTheme';

function Placeholder() {
  return <div className="editor-placeholder">Enter some rich text...</div>;
}
const editorConfig = {
  theme: ExampleTheme,
  editable: true,
  nodes: [
    HeadingNode,
    ListNode,
    ListItemNode,
    QuoteNode,
    CodeNode,
    CodeHighlightNode,
    TableNode,
    TableCellNode,
    TableRowNode,
    AutoLinkNode,
    LinkNode
  ]
};
function onChange(editorState) {
  editorState.read(() => {
    const root = $getRoot();
    const selection = $getSelection();
  });
}
function UpdatePlugin() {
  const [isOpenIcons, setIsOpenIcons] = useState(false);
  const [editor] = useLexicalComposerContext();
  const update = (e) => {
    editor.update(() => {
      const selection = $getSelection();
      if (selection) {
        selection.insertText(e);
      }
    });
  };
  return (
    <>
      <div
        className={styles.icon}
        onClick={() => setIsOpenIcons((prev) => !prev)}
      >
        <Image src={emojiSmile} alt="icons" />
      </div>
      <div>
        {isOpenIcons && (
          <div className="emoji-picker-textEdit">
            <Picker
              style={{}}
              data={data}
              onEmojiSelect={(e) => update(e.native)}
            />
          </div>
        )}
      </div>
    </>
  );
}
export default function TextEditor({ setEditor }) {
  return (
    <div>
      <div>
        <LexicalComposer initialConfig={editorConfig}>
          <div className="editor-container">
            <ToolbarPlugin />
            <RegisterPlugin />
            <div className="editor-inner">
              <RichTextPlugin
                contentEditable={<ContentEditable className="editor-input" />}
                placeholder={<Placeholder />}
              />
              <MaxLengthPlugin maxLength={4096} />
              <HistoryPlugin />
              <AutoFocusPlugin />
              <CodeHighlightPlugin />
              <ListPlugin />
              <LinkPlugin />
              <AutoLinkPlugin />
              <ListMaxIndentLevelPlugin maxDepth={7} />
              <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
              <UpdatePlugin />
              <OnChangePlugin onChange={onChange} />
              <SaveAsHtmlPlugin setEditor={setEditor} />
            </div>
          </div>
        </LexicalComposer>
      </div>
    </div>
  );
}
