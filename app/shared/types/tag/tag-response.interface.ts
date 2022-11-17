import { IBasic } from '@/shared/types/basic.interface';
import { VerticalType } from '@/shared/types/vertical/vertical.types';

export interface ITagResponse extends IBasic {
  value: string;
  is_special: boolean;
  description: string;
  vertical: VerticalType;
}
