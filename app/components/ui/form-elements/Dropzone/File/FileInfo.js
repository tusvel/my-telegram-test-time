import { Box, Image, Text } from 'grommet';
import PropTypes from 'prop-types';
import React from 'react';

import { calculateFileSize, truncateText } from '../utils';

export const FileInfo = ({ file, showPreview, showFileSize }) => {
  return (
    <Box direction="row" gap="xsmall" align="center">
      {showPreview && (
        <Box width="xxsmall" height="xxsmall">
          <Image src={file.preview} fit="cover" />
        </Box>
      )}

      <Text weight="bold">{truncateText(file.name)}</Text>
      {showFileSize && (
        <Text>
          {calculateFileSize(file.size).value.toFixed(1)}{' '}
          {calculateFileSize(file.size).suffix}
        </Text>
      )}
    </Box>
  );
};

FileInfo.propTypes = {
  file: PropTypes.shape({
    name: PropTypes.string.isRequired,
    size: PropTypes.number.isRequired,
    preview: PropTypes.string
  }).isRequired,
  showFileSize: PropTypes.bool.isRequired,
  showPreview: PropTypes.bool.isRequired
};

FileInfo.defaultProps = {
  file: {
    preview: undefined
  }
};
