import * as HeroIcons from '@heroicons/react/24/outline';
import { FC } from 'react';

import { useRenderClient } from '@/hooks/useRenderClient';

import { TypeMaterialIconName } from '@/shared/types/icons/icons.type';

const MaterialIcon: FC<{ name: TypeMaterialIconName }> = ({ name }) => {
  const { isRenderClient } = useRenderClient();

  const IconComponent = HeroIcons[name];

  if (isRenderClient) {
    return <IconComponent /> || <HeroIcons.HomeIcon />;
  } else {
    return null;
  }
};

export default MaterialIcon;
