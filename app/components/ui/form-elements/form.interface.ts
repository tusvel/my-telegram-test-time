import { FieldError } from 'react-hook-form';

export interface IFieldProps {
  placeholder: string;
  error?: FieldError | any;
}
