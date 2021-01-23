import React from 'react';
import Theme from './theme';
import { Dropzone, FileInput, Logo } from './shared/components';

const App: React.FC = () => {
  return (
    <Theme>
      <>
        <Logo />
        <Dropzone />
        <FileInput accept={['image/jpeg', 'image/png']}>Upload</FileInput>
      </>
    </Theme>
  );
};

export default App;
