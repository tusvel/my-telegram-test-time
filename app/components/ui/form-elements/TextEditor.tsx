import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import cn from 'classnames';
import { ContentState, EditorState, Modifier, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import Image from 'next/image';
import { FC, useEffect, useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import { ITextEditor } from '@/ui/form-elements/form.interface';

import emojiSmile from '@/assets/icons/emojiSmile.svg';

import styles from './form.module.scss';

const TextEditor: FC<ITextEditor> = ({
  onChange,
  value,
  placeholder,
  error
}) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [isUpdated, setIsUpdated] = useState(false);
  const [isOpenIcons, setIsOpenIcons] = useState(false);
  useEffect(() => {
    if (isUpdated) return;

    const defaultValue = value || '';
    const blocksFromHtml = htmlToDraft(defaultValue);
    const contentState = ContentState.createFromBlockArray(
      blocksFromHtml.contentBlocks,
      blocksFromHtml.entityMap
    );
    const newEditorState = EditorState.createWithContent(contentState);
    setEditorState(newEditorState);
  }, [value, isUpdated]);

  const onEditorStateChange = (editorState: EditorState) => {
    setIsUpdated(true);
    setEditorState(editorState);

    return onChange(draftToHtml(convertToRaw(editorState.getCurrentContent())));
  };

  const insertText = (text: string) => {
    let contentState = editorState.getCurrentContent();
    const selectionState = editorState.getSelection();
    const contentStateWithEntity = contentState.createEntity(
      'MY_ENTITY_TYPE',
      'IMMUTABLE'
    );
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();

    contentState = Modifier.insertText(contentState, selectionState, text);
    let newState = EditorState.push(
      editorState,
      contentState,
      'insert-characters'
    );

    setEditorState(newState);
  };

  return (
    <div className={cn(styles.common, styles.editorWrapper)}>
      <label>
        <span>{placeholder}</span>
        <div className={styles.wrapper}>
          <Editor
            toolbarClassName={styles.toolbar}
            editorClassName={styles.editor}
            editorState={editorState}
            onEditorStateChange={onEditorStateChange}
            spellCheck
            toolbar={{
              options: ['inline', 'link', 'history'],
              inline: {
                inDropdown: false,
                className: undefined,
                component: undefined,
                dropdownClassName: undefined,
                options: ['bold', 'italic', 'underline', 'strikethrough']
              },
              link: {
                options: ['link']
              }
            }}
          />
          <div
            className={styles.icon}
            onClick={() => setIsOpenIcons((prev) => !prev)}
          >
            <Image src={emojiSmile} alt="icons" />
          </div>
          <div>
            {isOpenIcons && (
              <Picker
                data={data}
                onEmojiSelect={(e: any) => insertText(e.native)}
              />
            )}
          </div>
        </div>

        {error && <div className={styles.error}>{error.message}</div>}
      </label>
    </div>
  );
};

export default TextEditor;
