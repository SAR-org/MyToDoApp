import React from 'react';
import {
  View,

} from 'react-native';
import Navigator from './routes/drawer';

class App extends React.Component {

  render() {
    return (
      <Navigator />
    );
  }

}

export default App