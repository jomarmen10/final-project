import React, { Component } from 'react';
import Comment from './components/Comment/Comments'
import ShowComment from './components/ShowComments/ShowComments'
import ShowCode from './components/ShowCode/ShowCode'
import Footer from './components/Footer/Footer'
import Questions from './components/Questions/Questions'
import './App.css'
//ace
import AceEditor from 'react-ace';
import 'brace/mode/javascript'
import "brace/snippets/javascript";
import 'brace/theme/tomorrow_night_eighties'
import 'brace/ext/language_tools';
//socket
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

    socket.on("comment", data => {
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
    const { allComment, string } = this.state
    return (
      <div className="row">
        <div className="col s6">
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

        <div className="col s3">
          <div id='messages' className="input-field col s10" >
            <ShowComment allComment={allComment}/>
          </div>
          <Comment createComment={this.createComment}/>
        </div>

        <div className="col s3">
          <Questions/>
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
