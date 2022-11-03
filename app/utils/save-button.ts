import { IButton } from '@/shared/types/button.interface';

import { getStoreLocal } from '@/utils/local-storage';

export const saveButton = (item: IButton) => {
  const buttons: IButton[] = getStoreLocal('buttons') || [];
  const value = buttons.find((e) => e.value === item.value);
  if (!value) {
    const lsItem: IButton = { value: item.value, label: item.label };
    const stringItems = JSON.stringify([...buttons, lsItem]);
    localStorage.setItem('buttons', stringItems);
  }
};
