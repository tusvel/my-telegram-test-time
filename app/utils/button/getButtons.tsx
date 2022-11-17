import { IButton } from '@/shared/types/form/button.interface';

import { convertSelect } from '@/utils/convertSelect';
import { getStoreLocal } from '@/utils/local-storage';

export const getButtons = () => {
  const buttonsLs = getStoreLocal('buttons') || [];
  const buttonIOptions = convertSelect(buttonsLs, 'label', 'value');
  const formatOptionButton = ({ value, label }: IButton) => (
    <div className="flex image-select__image-option">
      {label} : {value}
    </div>
  );

  return { buttonIOptions, formatOptionButton };
};
