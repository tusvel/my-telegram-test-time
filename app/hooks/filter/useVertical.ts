import { IPostTextResponse } from '@/shared/types/post-text/post-text-response.interface';
import { VerticalType } from '@/shared/types/vertical/vertical.types';

export const useVertical = (
  items: IPostTextResponse[] | null,
  vertical: VerticalType
) => {
  let sortedItems: IPostTextResponse[] | null;
  if (items && items?.length > 0 && vertical) {
    sortedItems = items.filter((item) => {
      return item.vertical === vertical;
    });
  } else {
    sortedItems = items;
  }

  return sortedItems;
};
