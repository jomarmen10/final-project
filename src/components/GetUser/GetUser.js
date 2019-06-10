import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap'


class GetUser extends Component {
  state = {
    show: false,
    username: ''
  }

  handleClose = () => {
    this.setState({ show: false });
  }

  handleShow = (e) => {
    this.setState({
      show: true
     })
  }

  handleInput = (e) => {
    this.setState({
      [e.currentTarget.name]: e.currentTarget.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.addUser(this.state.username)
    this.setState({
      show: false
    })
  }

  render(){
    return(
      <div>
        <Button variant="primary" onClick={this.handleShow} name="commentId">
          username
        </Button>
        <Modal show={this.state.show} onHide={this.handleClose}>
          {/* closeButton */}
          <Modal.Header >
            <Modal.Title>Welcome to Code Buddy!!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={this.handleSubmit}>
              <input placeholder='Enter Username' name='username' onChange={this.handleInput}></input>
            </form>
          </Modal.Body>
          <Modal.Footer>
            Chat with your buddy <br/>
            Practice your coding skills <br/>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}

export default GetUser;
