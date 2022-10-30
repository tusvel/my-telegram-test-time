import { IBasic } from '@/shared/types/basic.interface';
import { CategoryType } from '@/shared/types/categories.types';
import { IChannel } from '@/shared/types/channel.interface';
import { LanguageType } from '@/shared/types/language.type';
import { MediaType } from '@/shared/types/media.type';
import { ITag } from '@/shared/types/tag.interface';

export interface IMedia extends IBasic {
  type: MediaType;
  categories: CategoryType;
  languages: LanguageType;
  channel: IChannel[];
  tags: ITag[];
  url: string;
}
