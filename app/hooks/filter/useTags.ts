import { IText } from '@/shared/types/text.interface';

export const useTags = (items: IText[] | null, tags: string[]) => {
  let sortedItems: IText[] | null;
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
