import React, { Component } from 'react';
import './App.css';

import List from './Home';

class App extends Component {
  
  render() {   
    return (      
      <div className = "card row">    
        <List />
      </div>  
    );
  }
}

export default App;
