import { useState } from 'react';
import { useWatch } from 'react-hook-form';

import { useSearch } from '@/hooks/filter/useSearch';
import { useTags } from '@/hooks/filter/useTags';
import { useVertical } from '@/hooks/filter/useVertical';

export const useTextFilter = (textItems: any, control: any, register: any) => {
  register('text');
  const vertical = useWatch({
    control,
    name: 'search_vertical'
  });
  const tags = useWatch({
    control,
    name: 'search_tags'
  });
  const [value, setValue] = useState('');
  const textsItem = useSearch(textItems, value);
  const filterTags = useTags(textsItem, tags);
  const filteredItems = useVertical(filterTags, vertical);

  return { filteredItems, value, setValue };
};
