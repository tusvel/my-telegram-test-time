import { ITextInput } from '@/pages/texts/ITextInput';

import { IText } from '@/shared/types/text.interface';

import { getTextsUrl } from '@/config/api.config';

import { $host } from '../api/interceptors';

export const TextService = {
  async getAll() {
    const response = await $host.get<IText[]>(getTextsUrl(''));
    return response.data;
  },
  async create(data: ITextInput) {
    /*    const response = await $host.post<IText>(getTextsUrl('create'), { data });
    return response.data;*/
    return 123;
  },
  async edit(id: string, data: any) {
    return 123;
  },
  async editItem(data: any) {
    return 123;
  },
  async getById(id: string): Promise<any> {
    return {
      data: {
        id: '6367a66d7195f864607e7853',
        categories: 'gambling',
        language: 'ru',
        channel: '63679624e01474347b736199',
        tags: ['minim', 'non'],
        text: '<span>Et enim aliqua aliqua qui minim pariatur cupidatat.🔥</span><b>Cupidatat ea anim nostrud ea laboris.</b><span>Cupidatat dolore eiusmod pariatur pariatur sunt aliquip magna sunt officia ex adipisicing.</span><tg-spoiler>Labore irure eiusmod proident in.</tg-spoiler><a href="https://google.com/">Consectetur mollit duis culpa eiusmod non voluptate qui aute esse velit irure.</a>'
      }
    };
  }
};
