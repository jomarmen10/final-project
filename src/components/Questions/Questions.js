import React, { Component } from 'react';
import socketIO from 'socket.io-client';
const socket = socketIO('http://localhost:3001');

let question = ['Given an array of integers, return a new array with each value doubled. For example:[1, 2, 3] --> [2, 4, 6] For the beginner, try to use the map method - it comes in very handy quite a lot so is a good one to know.', 'Write a function that will return the count of distinct case-insensitive alphabetic characters and numeric digits that occur more than once in the input string. The input string can be assumed to contain only alphabets (both uppercase and lowercase) and numeric digits. Example "abcde" -> 0 # no characters repeats more than once "aabbcde" -> 2 # "a" and "b"', 'Complete the square sum function so that it squares each number passed into it and then sums the results together. For example, for [1, 2, 2] it should return 9 because 1^2 + 2^2 + 2^2 = 9.']

class Questions extends Component{
  state = {
    question: ''
  }

  componentDidMount(){
    socket.on('returnQuestion', data =>{
      this.setState({
        question: data.data
      })
    })
  }

  changeQuestion = () => {

    this.setState({
      question: question[Math.floor(Math.random() * question.length)]
    })
    socket.emit('question', {data: question[Math.floor(Math.random() * question.length)]})

  }


  render(){
    return(
      <div>
        <button className="grey darken-1 btn" onClick={this.changeQuestion}>Random Questions</button> <br/>
        <h5>{this.state.question}</h5>
      </div>
    )
  }
}

export default Questions;
