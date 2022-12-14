import { ControllerRenderProps } from 'react-hook-form';
import { Options } from 'react-select';

import { IFieldProps } from '@/ui/form-elements/form.interface';

export interface IOption {
  value: string | boolean;
  label: string;
  image?: string;
}

export interface ISelect extends IFieldProps {
  options: Options<IOption>;
  isMulti: boolean;
  field: ControllerRenderProps<any, any>;
  isLoading?: boolean;
  classNamePrefix?: string;
  formatOptionLabel?: any;
}
