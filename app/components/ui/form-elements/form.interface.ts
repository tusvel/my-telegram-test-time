import { EditorProps } from 'react-draft-wysiwyg';
import { FieldError } from 'react-hook-form';

export interface IFieldProps {
  placeholder: string;
  error?: FieldError | any;
}

type TypeEditorPropsField = EditorProps & IFieldProps;

export interface ITextEditor extends Omit<TypeEditorPropsField, 'editorState'> {
  onChange: (...event: any[]) => void;
  value: string;
}
