import React, { Component } from 'react'
//emoji
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'




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

  handleClose = () => {
    this.setState({ show: false });
  }

  handleShow = (e) => {
    this.setState({
      show: true,
      [e.currentTarget.name]: e.currentTarget.value
     })
  }

  render(){
    console.log('native:', this.state.comment)
    const { comment } = this.state
    return(
      <>
        {/* <Picker
          set='facebook'
          emoji='call_me_hand'
          style={{ position: 'absolute', bottom: '20px', right: '20px' }}
          onClick={this.emojiHandler}
        /> */}

        <div class="row">
          <div class="input-field col s8">
            <form onSubmit={this.submitHandler}>
              <i class="material-icons prefix">mode_edit</i>
              <input
                id="icon_prefix2"
                type='text'
                class="materialize-textarea"
                name='comment'
                placeholder='Message'
                value={comment}
                onChange={this.inputHandler}>
              </input>
            </form>

          </div>
        </div>
      </>
    )
  }
}

export default Comment;
