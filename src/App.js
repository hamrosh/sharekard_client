import React, { Component } from 'react';
import logo from './logo.svg';
import HomePage from './components/Homepage/HomePage';
import AddOrganiser from './components/Organiser/AddOrganiser';

class App extends Component {
  render() {
    return (
      <div>
        <AddOrganiser />
      </div>
    );
  }
}

export default App;
