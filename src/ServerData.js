import React, { Component } from 'react'
import './App.css'

const serverURL = "http://ad4d-108-53-232-66.ngrok.io";

async function getFromServer() {
    const response = await fetch(`${serverURL}/prompt-poll`, {
       method: "GET",
       mode: "cors",
       headers: {
           Accept: "application/json",
           "Content-Type": "application/json",
           "access-control-request-headers": "content-type",
           "x-Trigger": "CORS"
       } 
    })
    return await response.json()
};

export class data extends Component {

    constructor(props) {
        super(props)
        this.state = {
            "currentPrompt": {
                "userName": "",
                "prompts": {
                    "firstPrompt": {
                        "prompt": "",
                        "isLie": false
                    },
                    "secondPrompt": {
                        "prompt": "",
                        "isLie": false
                    },
                    "thirdPrompt": {
                        "prompt": "",
                        "isLie": false
                    }
                    
                }
            },
            "promptVotes": {
                "1": 0,
                "2": 0,
                "3": 0
            },
            "colors": {
                "1": '',
                "2": '',
                "3": ''
            },
            "showLie": false
        }
    };

    getPoll = async() => {
        const response = await getFromServer()
        //console.log(response)
        this.setState(response)
    };

    showLie = () => {
        this.setState({ "showLie": !this.state.showLie }, () => {
            if(this.state.showLie === true) {
                this.setState({
                    "colors": {
                        "1": (this.state.currentPrompt.prompts.firstPrompt.isLie ? 'red' : 'green'),
                        "2": (this.state.currentPrompt.prompts.secondPrompt.isLie ? 'red' : 'green'),
                        "3": (this.state.currentPrompt.prompts.thirdPrompt.isLie ? 'red' : 'green')
                    }
                })
            } else {
                this.setState({
                    "colors": {
                        "1": 'black',
                        "2": 'black',
                        "3": 'black'
                    }
                })
            };

            const prompts = this.state.currentPrompt.prompts;
            let promptForLie = ''

            for (const prompt in prompts) {
                if(prompts[prompt].isLie === true) {
                    promptForLie = prompt
                    break
                }
            }

            console.log(`${promptForLie} is lie.`)


        })

    }

  render() {
    return (
      <div className='App'>
          <div>Username: {this.state.currentPrompt.userName}</div>
          <div>Prompt 1: {this.state.currentPrompt.prompts.firstPrompt.prompt}</div>
          <div>Prompt 2: {this.state.currentPrompt.prompts.secondPrompt.prompt}</div>
          <div>Prompt 3: {this.state.currentPrompt.prompts.thirdPrompt.prompt}</div>
          <div style={{ color: this.state.colors[1] }}>Vote 1: {this.state.promptVotes[1]} </div>
          <div style={{ color: this.state.colors[2] }}>Vote 2: {this.state.promptVotes[2]} </div>
          <div style={{ color: this.state.colors[3] }}>Vote 3: {this.state.promptVotes[3]} </div>
          <button onClick={this.getPoll}>Get Poll</button>
          <button onClick={this.showLie}>Show Lie</button>
      </div>
    )
  }
}

export default data
