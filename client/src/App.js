import 'Styles/App.scss';
import React, { Component } from 'react';
import CharacterList from './components/containers/CharacterList'

class App extends Component {

  state = {
    response: ''
  };

  render() {
    return (
      <CharacterList/>
    );
  }
}

export default App;
