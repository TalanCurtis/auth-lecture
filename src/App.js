import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        {/* we need to use full url http://localhost only needed for auth endpoints */}
        <a href='http://localhost:3004/auth'><button type='' className=''>login</button></a>
      </div>
    );
  }
}

export default App;
