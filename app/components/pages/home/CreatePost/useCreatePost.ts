import { useState } from 'react';

import { getButtons } from '@/utils/button/getButtons';

export const useCreatePost = () => {
  const [applyButton, setApplyButton] = useState(false);
  const [isSendTime, setIsSendTime] = useState(false);

  const { formatOptionButton, buttonIOptions } = getButtons();

  return {
    applyButton,
    setApplyButton,
    isSendTime,
    setIsSendTime,
    formatOptionButton,
    buttonIOptions
  };
};
