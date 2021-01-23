import { Box } from '@chakra-ui/react';
import React from 'react';
import { FileType } from '../../types/file';

interface FileInputProps {
  children: React.ReactChild | React.ReactChildren;
  accept?: FileType[];
}

export const FileInput: React.FC<FileInputProps> = ({
  children,
  accept = [],
}: FileInputProps) => {
  return (
    <Box>
      <Box
        as="input"
        type="file"
        id="file-input"
        width={0}
        height={0}
        accept={accept.join(',')}
      />
      <label htmlFor="file-input">{children}</label>
    </Box>
  );
};
