import React, { Component } from 'react';
// import { Switch, Route } from 'react-router-dom';
import Comment from './components/Comment/Comments'
import ShowComment from './components/ShowComments/ShowComments'
import ShowCode from './components/ShowCode/ShowCode'
import Footer from './components/Footer/Footer'
import Questions from './components/Questions/Questions'
import GetUser from './components/GetUser/GetUser'
import './App.css'
//ace
import AceEditor from 'react-ace';
import 'brace/mode/javascript'
import "brace/snippets/javascript";
import 'brace/theme/tomorrow_night_eighties'
import 'brace/ext/language_tools';
//socket
import socketIO from 'socket.io-client';
//for local development
// const socket = socketIO('http://localhost:3001');
//for heroku
const socket = socketIO('https://code-bud.herokuapp.com');

class App extends Component {
  state = {
    allComment: [],
    comment: '',
    string: '',
    user: '',
    emoji: false
  }

  componentDidMount(){
    this.getComments().then(res =>{
      console.log(res)
      this.setState({
        allComment: res.allcomment
      })

    })

    socket.on("comment", data => {
      this.setState({
        allComment:[...(this.state.allComment || []), data.data.comment]
      },()=>{
        this.updateScroll()
      })
    })

    socket.on('resCode', data =>{
      this.setState({
        string: data.data
      })
    })

    socket.on('new-Delcomment', data => {
      this.setState({
        allComment: [data.data.deleteDb]
      })
    })
  }

  emoji = (info) =>{
    const { emoji } = this.state
    {
      emoji
      ? (
        this.setState({
          emoji: false
        })
      )
      : (
        this.setState({
          emoji: true
        })
      )
    }

    console.log('emoji in app')
  }

  createComment = async(info)=>{
    try{
      const printComment = await fetch('https://code-bud.herokuapp.com', {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(info),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const newComment = await printComment.json();
      if(newComment.success){
        socket.emit("new-comment", {data:newComment})
        this.setState({
          comment: newComment.comment,
          emoji: false
        })
      }
      await this.updateScroll()
    }catch(err){
      return err
    }
  }

  getComments = async() => {
    try{
      const allComments = await fetch('https://code-bud.herokuapp.com', {
        credentials: 'include'
      })
      const resComments = await allComments.json()
      return resComments

    }catch(err){
      return err
    }
  }

  addCode = (e) =>{
    socket.emit('addCode', {data: e})
  }

  updateScroll = () => {
    this.refs.messageWindow.scrollTop = this.refs.messageWindow.scrollHeight
  }
// //add user function
//   addUser = (info) => {
//     this.setState({
//       user: info
//     })
//   }

  render() {
    const { allComment, string } = this.state
    return (
      <>
      <div className="top-padding"></div>
      <div className="container">
        <div className="row">
          {/* <GetUser addUser={this.addUser}/> */}
          <div className="col-6">
            <AceEditor
              mode="javascript"
              theme="tomorrow_night_eighties"
              value={this.state.string}
              onChange={this.addCode}
              enableLiveAutocompletion={true}
              highlightActiveLine={true}
              fontSize={15}
            />
            <ShowCode code={string}/>
          </div>

          <div className="col-3">
            <div id='messages' className="input-field col s10" ref="messageWindow">
              <ShowComment allComment={allComment}/>
            </div>
            <Comment getComments={this.getComments} createComment={this.createComment} emoji={this.emoji} isEmoji={this.state.emoji}/>
          </div>

          <div className="col-3">
            <Questions/>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-12">
            <Footer/>
          </div>
        </div>
      </div>
      </>
    );
  }
}

export default App;
