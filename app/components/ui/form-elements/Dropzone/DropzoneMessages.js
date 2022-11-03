import { Anchor, Text } from 'grommet';
import React from 'react';

export const DefaultMessage = ({ multiple }) => {
  return (
    <Text>
      <Anchor>Выберите</Anchor> {multiple ? 'файлы' : 'файл'}
    </Text>
  );
};

export const DropMessage = ({ multiple }) => {
  return (
    <Text color="brand" weight="bold">
      Drop {multiple ? 'files' : 'file'} here
    </Text>
  );
};
