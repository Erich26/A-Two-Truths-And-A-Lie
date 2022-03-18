import React, { Component } from 'react';
import './App.css';

export class App extends Component {
  constructor(props) {
    super(props);
    this.state ={
      username: "",
      vote: 1,
      prompts: [
        {
          "name": "firstPrompt",
          prompt: "First",
          isLie: false
        },
        {
          "name": "secondPrompt",
          prompt: "Second",
          isLie: true
        },
        {
          "name": "thirdPrompt",
          prompt: "Third",
          isLie: false
        }
      ]
    }
  };

  handleOnSubmit = (event) => {
    event.preventDefault()
  };

  handlePromptChange = (event) => {
   // const newData = {
   //   ...this.state,
   // }
   // newData.prompts[event.target.name].text = event.target.value
   // this.setState(newData)
   const name = event.target.name
   const value = event.target.value
   let promptUpdate = [...this.state.prompts]

   promptUpdate = promptUpdate.map((prompt) => {
     if(prompt.name === name) {
       return {
         ...prompt,
         prompt: value
       }
     }
     return { ...prompt  }
   })
   this.setState({
     prompts: promptUpdate
   })
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

    let prompts = Object.keys(newData.prompts)
    prompts.forEach(prompt => {
      newData.prompts[prompt].isLie = false
    })
    newData.prompts[event.target.name].isLie = event.target.checked
    this.setState(newData)
  };

  sendPrompt = async(event) => {
    const data = JSON.stringify({
      userName: this.state.username,
      prompts: this.state.prompts
    })
    const response = await postToServer(data, 'prompt-vote')
  };

  castVote = async(event) => {
    const data = JSON.stringify({
      userName: this.state.username,
      votePrompt: this.state.vote
    })
    const response = await postToServer(data, 'prompt-vote')
  };

  render() {
    return (
      <div className='App-header'>
        <h1>Two Truths and a Lie</h1>

       
          <div className='username-container'>
            <label>Username: </label>
            <input name="username" value={this.state.username} onChange={this.handleUsernameChange} />
          </div>

          {this.state.prompts.map(({ name, prompt, isLie }, index) => {
            return(
              <InputPrompt
              key={`Input-Prompt-${index}`}
              nameProp={name}
              promptProp={prompt}
              isLieProp={isLie}
              handlePromptText={this.handlePromptChange}
              />
            )
          })};


          
         {/* <div className='checkbox-input'>
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
          </div> */}

          <label>Vote:</label>
          <input name="vote" type="number" value={this.state.vote} onChange={this.handleVote} />
          <button name='send-prompt' onClick={this.sendPrompt}>Send Prompt
          </button>
          <button name='send-vote' onClick={this.castVote}>Send Vote</button>
       
       
        
      </div>
    )
  }
};

async function postToServer(data,route) {
  const response = await fetch(`${serverURL}/${route}`, {
    method: "POST",
    mode: "cors",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "access-control-request-headers": "content-type",
      "x-Trigger": "CORS",
    },
    body: data
  });
  const pingResponse = await response.text();
  return pingResponse;
}

export default App

