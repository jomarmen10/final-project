import React, { Component } from 'react';
import Comment from './components/Comment/Comments'
import ShowComment from './components/ShowComments/ShowComments'
import ShowCode from './components/ShowCode/ShowCode'
import brace from 'brace';
import AceEditor from 'react-ace';

import 'brace/mode/javascript'
import "brace/snippets/javascript";
import 'brace/theme/monokai'
import 'brace/ext/language_tools';


import socketIO from 'socket.io-client';

const socket = socketIO('http://localhost:3001');



class App extends Component {
  state = {
    allComment: [],
    comment: '',
    string: ''
  }

  componentDidMount(){
    this.getComments().then(res =>{
      this.setState({
        allComment: res.allcomment
      })
    })

    // socket.on('connect', socket =>{
    //   console.log('user connected from client side')
    // })

    socket.on("comment", data => {
      // console.log(data.data.comment.comment)
      this.setState({
        allComment:[...this.state.allComment, data.data.comment]
      })
    })

    socket.on('resCode', data =>{
      this.setState({
        string: data.data
      })
    })
  }

  createComment = async(info)=>{
    try{
      const printComment = await fetch('http://localhost:3001/', {
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
          comment: newComment.comment
        })
      }
    }catch(err){
      return err
    }
  }

  getComments = async() => {
    try{
      const allComments = await fetch('http://localhost:3001/', {
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


  render() {
    const { allComment, comment, string } = this.state
    console.log('code :',string)

    return (
      <div className="App">
        <AceEditor
          mode="javascript"
          theme="monokai"
          value={this.state.string}
          onChange={this.addCode}
          enableLiveAutocompletion={true}
          highlightActiveLine={true}
        />

        <ShowCode code={string}/>

        <Comment createComment={this.createComment}/>
        <ShowComment allComment={allComment}/>
      </div>
    );
  }
}

export default App;
