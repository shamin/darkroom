import React, { useEffect, useState } from 'react';
import { Box, useToast } from '@chakra-ui/react';
import { FileType } from '../../types/file';

interface DropzoneProps {
  onFileDrop: (files: FileList) => void;
}

export const Dropzone: React.FC<DropzoneProps> = ({ onFileDrop }: DropzoneProps) => {
  const toast = useToast();

  const onDrop = (files: FileList) => {
    onFileDrop(files);
  };

  const acceptedFileTypes: FileType[] = ['image/jpeg', 'image/png'];
  const onInvalidDrop = () => {
    toast({
      title: 'Invalid file type.',
      status: 'error',
      duration: 2000,
      isClosable: true,
    });
  };
  const { isDraggedOver, ...dropzoneProps } = useDropzone<HTMLDivElement>(
    onDrop,
    acceptedFileTypes,
    onInvalidDrop
  );
  return (
    <Box
      bg={isDraggedOver ? 'gray.500' : 'gray.200'}
      width={200}
      height={200}
      {...dropzoneProps}
    >
      Hello
    </Box>
  );
};

export function useDropzone<T>(
  onDropped: (files: FileList, e: React.DragEvent<T>) => void,
  acceptedTypes: FileType[] = [],
  onInvalidDrop?: () => void
) {
  const [isDraggedOver, setIsDraggedOver] = useState(false);
  const [dragOverCounter, setDragoverCounter] = useState(0);

  const validFileTypes = (files: FileList, acceptedTypes: FileType[]) => {
    return (
      Array.from(files).filter(
        (f: File) => !acceptedTypes.includes(f.type as FileType)
      ).length === 0
    );
  };

  const onDragEnter = (e: React.DragEvent<T>) => {
    e.preventDefault();
    setIsDraggedOver(true);
    setDragoverCounter((counter) => counter + 1);
  };

  const onDragOver = (e: React.DragEvent<T>) => {
    e.preventDefault();
  };

  const onDrop = (e: React.DragEvent<T>) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (validFileTypes(files, acceptedTypes)) {
      onDropped(e.dataTransfer.files, e);
    } else {
      onInvalidDrop?.();
    }
    setIsDraggedOver(false);
  };

  const onDragLeave = (e: React.DragEvent<T>) => {
    e.preventDefault();
    setDragoverCounter((counter) => counter - 1);
  };

  useEffect(() => {
    if (dragOverCounter === 0) {
      setIsDraggedOver(false);
    }
  }, [dragOverCounter]);

  return {
    isDraggedOver,
    onDragEnter,
    onDrop,
    onDragLeave,
    onDragOver,
  };
}
