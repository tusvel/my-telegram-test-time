import { ButtonHTMLAttributes, InputHTMLAttributes } from 'react';
import { FieldError } from 'react-hook-form';

export interface IFieldProps {
  placeholder: string;
  error?: FieldError | any;
}

type TypeEditorPropsField = IFieldProps;

export interface ITextEditor extends Omit<TypeEditorPropsField, 'editorState'> {
  onChange: (...event: any[]) => void;
  value: string;
}

type TypeInputPropsField = InputHTMLAttributes<HTMLInputElement> & IFieldProps;

export interface IField extends TypeInputPropsField {}

export interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {}
