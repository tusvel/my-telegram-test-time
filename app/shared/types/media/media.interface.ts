import { IBasic } from '@/shared/types/basic.interface';
import { IChannelBase } from '@/shared/types/channel/channel-response.interface';
import { LanguageType } from '@/shared/types/language/language.type';
import { MediaType } from '@/shared/types/media/media.type';
import { ITag } from '@/shared/types/tag/tag-create.interface';
import { VerticalType } from '@/shared/types/vertical/vertical.types';

export interface IMedia extends IBasic {
  type: MediaType;
  vertical: VerticalType;
  languages: LanguageType;
  channel: IChannel[];
  tags: ITag[];
  url: string;
}
