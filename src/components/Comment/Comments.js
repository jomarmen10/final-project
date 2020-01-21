import React, { Component } from 'react'

//emoji
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'
//socket
import socketIO from 'socket.io-client';
//dev
// const socket = socketIO('http://localhost:3001');
//for heroku
const socket = socketIO('https://code-bud.herokuapp.com');




class Comment extends Component{
  state = {
    comment: '',

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
      comment: this.state.comment + e.native
    })
    this.submitHandler()
  }

  emojiOnOff = () => {
    this.props.emoji()
  }


  clearChat = async() => {
    try{
      const deleteComment = await fetch('https://code-bud.herokuapp.com', {
        method: 'DELETE',
        credentials: 'include'
      })
      const delComment = await deleteComment.json();
      if(delComment.deleted){
        socket.emit('del-comment', {data:delComment})
      }
    }catch(err){
      return err
    }
  }


  render(){
    const { comment } = this.state
    const { isEmoji } = this.props
    return(
      <>
        {
          isEmoji
            ? (
              <Picker
                set='google'
                emoji='call_me_hand'
                style={{ position: 'absolute', bottom: '20px', right: '20px' }}
                onClick={this.emojiHandler}
              />
            )
            : null
        }
        <button className="grey darken-1 btn-small" onClick={this.clearChat}>Clear Chat</button>

        <button className='grey darken-1 btn-small' onClick={this.emojiOnOff}><i className="material-icons prefix">insert_emoticon</i></button>


          <div className="input-field col s10">
            <form onSubmit={this.submitHandler}>
              <input
                id="icon_prefix2"
                type='text'
                className="materialize-textarea"
                name='comment'
                placeholder='Message'
                value={comment}
                onChange={this.inputHandler}>
              </input>
            </form>

          </div>

      </>
    )
  }
}

export default Comment;
