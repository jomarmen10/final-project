import React, { Component } from 'react';
import './ShowCode.css';
import vm from 'vm'
import socketIO from 'socket.io-client';
const socket = socketIO('http://localhost:3001');

class ShowCode extends Component{
  state={
    codeResult: ''
  }

  componentDidMount(){
    socket.on('finalRes', data =>{
      this.setState({
        codeResult: data.data
      })
    })
  }

  handleRun = async(e) => {
    try{
      e.preventDefault();
      const { code } = this.props;
      const result = vm.runInNewContext(code)
      socket.emit('codeRes', {data: result})
      this.setState({
        codeResult: result
      })
    }catch(err){
      this.setState({
        codeResult: err
      })
    }
  }


  render(){
    return(
      <div>
        <button className="btn teal grey darken-1" onClick={this.handleRun}>run</button> <br/>
        <textarea
          name="codeResult"
          readOnly
          sz="lg"
          value={this.state.codeResult}
        />
      </div>
    )
  }
}

export default ShowCode;
