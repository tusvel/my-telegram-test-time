import { IBasic } from '@/shared/types/basic.interface';
import { IChannelBase } from '@/shared/types/channel/channel-base.interface';
import { LanguageType } from '@/shared/types/language/language.type';
import { MediaType } from '@/shared/types/media/media.type';
import { ITagResponse } from '@/shared/types/tag/tag-response.interface';
import { VerticalType } from '@/shared/types/vertical/vertical.types';

export interface IMediaResponse extends IBasic {
  type: MediaType;
  vertical: VerticalType;
  language: LanguageType;
  url: string;
  channel: IChannelBase;
  tags: ITagResponse[];
}
