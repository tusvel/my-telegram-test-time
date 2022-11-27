import { TypeMaterialIconName } from '@/shared/types/icons/icons.type';

export interface IMenuItem {
  name: string;
  href: string;
  icon: TypeMaterialIconName;
  role: any[];
}
