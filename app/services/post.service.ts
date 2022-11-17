import { IPostInput } from '@/pages/home/CreatePost/create-post.interface';

import { IPost } from '@/shared/types/post.interface';

import { getPostsUrl } from '@/config/api.config';

import { $auth, $host } from '../api/interceptors';

export const PostService = {
  async getAll() {
    const response = await $host.get<IPost[]>(getPostsUrl(''));
    return response.data;
  },
  async create(data: IPostInput) {
    const response = await $auth.post('post', { data });
    return response;
  },
  async repost(data: IPost, id: string) {
    return 123;
  }
};
