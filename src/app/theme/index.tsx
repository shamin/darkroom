import * as React from 'react';
import { ChakraProvider } from '@chakra-ui/react';

interface ThemeProps {
  children: React.ReactChild;
}

const Theme: React.FC<ThemeProps> = ({ children }: ThemeProps) => {
  return <ChakraProvider>{children}</ChakraProvider>;
};

export default Theme;
