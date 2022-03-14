import React, { Component } from 'react';
import './App.css';

export class App extends Component {
  constructor(props) {
    super(props);
    this.state ={
      username: "",
      vote: 1,
      prompts: {
        firstprompt: {
          text: "",
          isLie: false
        },
        secondprompt: {
          text: "",
          isLie: false
        },
        thirdprompt: {
          text: "",
          isLie: false
        }
      }
    }
  }

  handleOnSubmit = (event) => {
    event.preventDefault()
  };

  handlePromptChange = (event) => {
    const newData = {
      ...this.state,
    }
    newData.prompts[event.target.name].text = event.target.value
    this.setState(newData)
  };

  handleUsernameChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
     });
  };

  handleVote = (event) => {
    const number = Number(event.target.value)
    if (number === 1 || number === 2 || number === 3) {
      this.setState({
        [event.target.name]: number
      });
    }
  };

  handleCheckbox = (event) => {
    const newData = { ...this.state }
    newData.prompts[event.target.name].isLie = event.target.checked
    this.setState(newData)
  };

  render() {
    return (
      <div className='App-header'>
        <h1>Two Truths and a Lie</h1>

        <form onSubmit={this.handleOnSubmit}>
          <div className='username-container'>
            <label>Username: </label>
            <input name="username" value={this.state.username} onChange={this.handleUsernameChange} />
          </div>
          <div className='checkbox-input'>
            <label>1:</label>
            <input name="prompt1" value={this.state.prompts.firstprompt.text} onChange={this.handlePromptChange}/>
            <label>isLie</label>
            <input type="checkbox" name="prompt1" value={this.state.prompts.firstprompt.isLie} onChange={this.handleCheckbox}/>
            <br/>
            <label>2:</label>
            <input name="prompt2" value={this.state.prompts.secondprompt.text} onChange={this.handlePromptChange} />
            <label>isLie</label>
            <input type="checkbox" name="prompt2" value={this.state.prompts.secondprompt.isLie} onChange={this.handleCheckbox}/>
            <br/>
            <label>3:</label>
            <input name="prompt3" value={this.state.prompts.thirdprompt.text} onChange={this.handlePromptChange} />
            <label>isLie</label>
            <input type="checkbox" name="prompt3" value={this.state.prompts.thirdprompt.isLie} onChange={this.handleCheckbox} />
            <br/>
            <label>Vote:</label>
            <input name="vote" type="number" value={this.state.vote} onChange={this.handleVote} />
          </div>
          <button>Send Prompt
          </button>
          <button>Send Vote</button>
        </form>

        
      </div>
    )
  }
}

export default App

