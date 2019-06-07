import React, { Component } from 'react';

let question = ['question1', 'question2', 'question3']

class Questions extends Component{
  state = {
    question: ''
  }

  changeQuestion = () => {
    this.setState({
      question: question[Math.floor(Math.random() * question.length)]
    })
  }


  render(){
    return(
      <div>
        <button className="btn" onClick={this.changeQuestion}>Questions</button> <br/>
        <h3>{this.state.question}</h3>
      </div>
    )
  }
}

export default Questions;
