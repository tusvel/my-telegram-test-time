import { useMemo } from 'react';

export const useSearch = (items: any, query: string) => {
  return useMemo(() => {
    return (
      items &&
      items.filter((item: any) =>
        item.text.toLowerCase().includes(query?.toLowerCase())
      )
    );
  }, [items, query]);
};
