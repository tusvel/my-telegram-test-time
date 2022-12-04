import PropTypes from 'prop-types';
import React, { createRef, useCallback, useEffect, useState } from 'react';
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
  onChange,
  myFiles,
  setMyFiles
}) => {
  const [disabled, setDisabled] = useState(false);
  const containerRef = createRef();
  const onDrop = useCallback(
    async (acceptedFiles) => {
      if (!disabled) {
        if (showPreview) {
          acceptedFiles.map((file) => {
            if (
              file.name.split('.')[1] === 'mp3' ||
              file.name.split('.')[1] === 'mp4' ||
              file.name.split('.')[1] === 'avi'
            ) {
              return Object.assign(file, {
                preview: '/player_icon.svg'
              });
            }
            return Object.assign(file, {
              preview: URL.createObjectURL(file)
            });
          });
        }
        await setMyFiles((prev) => [...prev, ...acceptedFiles]);
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
  useEffect(() => {
    //Добавление в форму
    onChange(myFiles);
  }, [myFiles]);
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
      className="My_dropFile"
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
