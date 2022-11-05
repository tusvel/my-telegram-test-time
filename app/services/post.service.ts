import { IPostInput } from '@/pages/home/CreatePost/create-post.interface';

import { IPost } from '@/shared/types/post.interface';

import { getPostsUrl } from '@/config/api.config';

import { $host } from '../api/interceptors';

export const PostService = {
  async getAll() {
    const response = await $host.get<IPost[]>(getPostsUrl(''));
    return response.data;
  },
  async create(data: IPostInput) {
    return 1;
  }
};
