import { IBasic } from '@/shared/types/basic.interface';
import { CategoryType } from '@/shared/types/categories.types';
import { IChannel } from '@/shared/types/channel.interface';
import { LanguageType } from '@/shared/types/language.type';
import { ITag } from '@/shared/types/tag.interface';

export interface IText extends IBasic {
  categories: CategoryType;
  language: LanguageType;
  channel?: IChannel;
  tags: ITag[];
  text: string;
}
