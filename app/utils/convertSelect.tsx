import { IOption } from '@/ui/select/select.interface';

export const convertSelect = (
  items: any[] | null,
  label: string,
  value: string,
  image?: string
) => {
  if (Array.isArray(items) && items?.length > 0) {
    return items.map(
      (item: any) =>
        ({
          label: item[label],
          is_special: item.is_special || null,
          value: item[value],
          image: image ? item[image] : null
        } as IOption)
    );
  }
  return [];
};
