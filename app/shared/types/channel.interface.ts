import { IBasic } from '@/shared/types/basic.interface';
import { CategoryType } from '@/shared/types/categories.types';
import { LanguageType } from '@/shared/types/language.type';
import { MediaType } from '@/shared/types/media.type';

export interface IChannel extends IBasic {
  categories: CategoryType;
  language: LanguageType;
  timezone: any; //TODO;
  title: string;
  profice_picture: string;
  contact: string;
  media_type: MediaType; // +preview/upload TODO
  buttons_text: string;
  /*# слоты:
    список тегов (только те теги которые с нужной вертикали или без вертикали) +
    интервал времени +
    тогл публиковать ли кнопку (дефолт включён)*/
}
