import { useMemo } from 'react';

import { IText } from '@/shared/types/text.interface';

export const useFilter = (items: IText[] | null, query: string) => {
  return useMemo(() => {
    return (
      items &&
      items.filter((item) =>
        item.text.toLowerCase().includes(query?.toLowerCase())
      )
    );
  }, [items, query]);
};
