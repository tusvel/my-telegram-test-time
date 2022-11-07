import PropTypes from 'prop-types';
import React, { createRef, useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

import { DropzoneContainer } from './DropzoneContainer';
import { DefaultMessage, DropMessage } from './DropzoneMessages';
import { File } from './File';

export const Dropzone = ({
  accept,
  maxSize,
  minSize,
  multiple,
  onAddFiles,
  onDeleteFiles,
  showPreview,
  showFileSize,
  onChange
}) => {
  const [myFiles, setMyFiles] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const containerRef = createRef();
  const onDrop = useCallback(
    (acceptedFiles) => {
      if (!disabled) {
        const formData = new FormData();
        for (let i = 0; i < myFiles.length; i++) {
          formData.append('files', myFiles[i]);
        }
        onChange(formData);
        if (showPreview) {
          acceptedFiles.map((file) =>
            Object.assign(file, {
              preview: URL.createObjectURL(file)
            })
          );
        }
        setMyFiles([...myFiles, ...acceptedFiles]);
        if (onAddFiles) {
          onAddFiles(acceptedFiles);
        }
        if (!multiple && myFiles.length === 0 && acceptedFiles.length > 0) {
          setDisabled(true);
        }
      }
    },
    [disabled, showPreview, myFiles, onAddFiles, multiple]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept,
    maxSize,
    minSize,
    multiple,
    noClick: myFiles.length,
    onDrop
  });
  const removeFile = (file) => {
    const newFiles = [...myFiles];
    newFiles.splice(newFiles.indexOf(file), 1);
    setMyFiles(newFiles);
    if (onDeleteFiles) {
      onDeleteFiles(newFiles);
    }
    if (newFiles.length === 0) {
      setDisabled(false);
    }
  };
  const currentFiles = myFiles.map((file, index) => (
    <File
      file={file}
      key={index}
      removeFile={removeFile}
      showPreview={showPreview}
      showFileSize={showFileSize}
      margin={{
        bottom: index !== myFiles.length - 1 ? 'xsmall' : 'none'
      }}
    />
  ));
  return (
    <DropzoneContainer
      isDragActive={isDragActive}
      files={myFiles}
      ref={containerRef}
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      {myFiles.length ? currentFiles : undefined}
      {!myFiles.length &&
        (!isDragActive ? (
          <DefaultMessage multiple={multiple} />
        ) : (
          <DropMessage multiple={multiple} />
        ))}
    </DropzoneContainer>
  );
};

Dropzone.propTypes = {
  accept: PropTypes.string,
  maxSize: PropTypes.number,
  minSize: PropTypes.number,
  multiple: PropTypes.bool,
  onAddFiles: PropTypes.func,
  onDeleteFiles: PropTypes.func,
  showPreview: PropTypes.bool,
  showFileSize: PropTypes.bool,
  onChange: PropTypes.func
};

Dropzone.defaultProps = {
  accept: '',
  maxSize: undefined,
  minSize: undefined,
  multiple: false,
  onAddFiles: undefined,
  onDeleteFiles: undefined,
  showPreview: false,
  showFileSize: false
};
