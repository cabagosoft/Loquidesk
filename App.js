import React from 'react';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { mapping, dark as darkTheme } from '@eva-design/eva';
import { default as appTheme } from './custom-theme.json';
import { default as customMapping } from './custom-mapping.json';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import RootNavigator from './src/Modules/Navigation/Components/RootNavigator';



const theme = { ...darkTheme, ...appTheme };

const App = () => (
  <React.Fragment>
      <IconRegistry icons={EvaIconsPack}/>
      <ApplicationProvider 
        mapping={mapping} 
        theme={theme} 
        customMapping={customMapping}
      >
        <RootNavigator/>
      </ApplicationProvider>
  
  </React.Fragment>

);

export default App;