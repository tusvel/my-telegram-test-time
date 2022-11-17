import { CategoryType } from '@/shared/types/categories.types';
import { IText } from '@/shared/types/text.interface';

export const useCategories = (
  items: IText[] | null,
  category: CategoryType
) => {
  let sortedItems: IText[] | null;
  if (items && items?.length > 0 && category) {
    sortedItems = items.filter((item) => {
      return item.categories === category;
    });
  } else {
    sortedItems = items;
  }

  return sortedItems;
};
