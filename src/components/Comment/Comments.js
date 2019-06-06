import React, { Component } from 'react'
//emoji
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'


const customEmojis = [
  {
    name: 'Octocat',
    short_names: ['octocat'],
    text: '',
    emoticons: [],
    keywords: ['github'],
    imageUrl: process.env.PORT 
  }
]

class Comment extends Component{
  state = {
    comment: ''
  }

  inputHandler = (e) => {
    this.setState({
      [e.currentTarget.name]: e.currentTarget.value
    })
  }

  submitHandler = async(e) => {
    try{
      e.preventDefault()
      this.props.createComment(this.state)
      this.setState({
        comment: ''
      })
    }catch(err){
      return err
    }
  }

  emojiHandler = (e) => {
    console.log(e)
    this.setState({
      comment: e.native
    })
    this.submitHandler()
  }

  render(){
    console.log('native:', this.state.comment)
    const { comment } = this.state
    return(
      <div>
        <h1>input text</h1>
        <Picker custom={customEmojis} set='facebook' emoji='call_me_hand' style={{ position: 'absolute', bottom: '20px', right: '20px' }} onClick={this.emojiHandler} />

        <form onSubmit={this.submitHandler}>
          <input type='text' name='comment' placeholder='enter text' value={comment} onChange={this.inputHandler}></input>
          <button type='Submit'>Submit</button>
        </form>
      </div>
    )
  }
}

export default Comment;
