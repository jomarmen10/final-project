import React, { Component } from 'react'
import Emoji from '../Emoji/Emoji'
//emoji
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'




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
      comment: e.native
    })
    this.submitHandler()
  }

  emojiOnOff = () => {
    this.props.emoji()
  }




  render(){
    const { comment, emoji } = this.state
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
        <button onClick={this.emojiOnOff}>emoji</button>

        <div className="row">
          <div className="input-field col s8">
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

              <i className="material-icons prefix">insert_emoticon</i>

            </form>

          </div>
        </div>
      </>
    )
  }
}

export default Comment;
