import { VerticalType } from '@/shared/types/vertical/vertical.types';

export interface ITagCreateRequest {
  value: string;
  is_special: boolean;
  description: string;
  vertical: VerticalType;
}
