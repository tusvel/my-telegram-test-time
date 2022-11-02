import { useMemo } from 'react';

export const useFilter = (items: string[], query: string) => {
  const searchItems = useMemo(() => {
    return items.filter((item) =>
      item.toLowerCase().includes(query.toLowerCase())
    );
  }, [items, query]);

  const filteredItems = searchItems.map((item) => JSON.parse(item));

  return { filteredItems };
};
