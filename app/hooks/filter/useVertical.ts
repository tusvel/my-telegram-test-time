import { IText } from '@/shared/types/text.interface';
import { VerticalType } from '@/shared/types/vertical/vertical.types';

export const useVertical = (items: IText[] | null, vertical: VerticalType) => {
  let sortedItems: IText[] | null;
  if (items && items?.length > 0 && vertical) {
    sortedItems = items.filter((item) => {
      return item.vertical === vertical;
    });
  } else {
    sortedItems = items;
  }

  return sortedItems;
};
