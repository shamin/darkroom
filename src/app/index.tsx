import React from 'react';
import Theme from './theme';
import { Dropzone, Logo } from './shared/components';

const App: React.FC = () => {
  return (
    <Theme>
      <>
        <Logo />
        <Dropzone />
      </>
    </Theme>
  );
};

export default App;
