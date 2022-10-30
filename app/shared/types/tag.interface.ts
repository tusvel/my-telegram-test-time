import { IBasic } from '@/shared/types/basic.interface';
import { CategoryType } from '@/shared/types/categories.types';

export interface ITag extends IBasic {
  categories: CategoryType;
  value: string;
  is_special: boolean;
  description: string;
}
