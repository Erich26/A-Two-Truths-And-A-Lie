import React, { Component } from 'react';
import './App.css';

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkbox: true,
      textInput: "",
      objectValues: {
        objOne: {
          
        }
      }
    };
  }

  onTextChange = (e) => {
    this.setState[{
      textInput: e.target.value,
    }];
  };

  render() {
    return (
      <div className='App'>
        <header className = 'App-header'>
          </header>
        
      </div>
    )
  }
}

export default App

