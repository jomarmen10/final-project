import React, { Component } from 'react'

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
    }catch(err){
      return err
    }
  }


  render(){
    const { comment } = this.state
    return(
      <div>
        <h1>input text</h1>
        <form onSubmit={this.submitHandler}>
          <input type='text' name='comment' placeholder='enter text' value={comment} onChange={this.inputHandler}></input>
          <button type='Submit'>Submit</button>
        </form>
      </div>
    )
  }
}

export default Comment;
