import React, { useState } from 'react';
import Theme from './theme';
import { Dropzone, FileInput, Logo } from './shared/components';
import { Center } from '@chakra-ui/react';
import Canvas from './editor/canvas';

const App: React.FC = () => {
  const [image, setImage] = useState(null);
  return (
    <Theme>
      <>
        {!image && (
          <>
            <Logo />
            <Dropzone onFileDrop={(files) => setImage(files[0])} />
            <FileInput accept={['image/jpeg', 'image/png']}>Upload</FileInput>
          </>
        )}
        {image && (
          <Center height="100vh" bg="gray.500">
            <Canvas image={image} />
          </Center>
        )}
      </>
    </Theme>
  );
};

export default App;
