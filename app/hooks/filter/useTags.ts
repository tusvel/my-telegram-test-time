import { IPostTextResponse } from '@/shared/types/post-text/post-text-response.interface';

export const useTags = (items: IPostTextResponse[] | null, tags: string[]) => {
  let sortedItems: IPostTextResponse[] | null;
  if (items && items?.length > 0 && tags && tags?.length > 0) {
    sortedItems = items.filter((item) => {
      return tags.find((formTag: string) => {
        return item.tags.find((itemTag) => {
          return itemTag.id === formTag;
        });
      });
    });
  } else {
    sortedItems = items;
  }

  return sortedItems;
};
