import React, { Component } from 'react';
import { FormControl } from 'react-bootstrap';
import vm from 'vm'

class ShowCode extends Component{
  state={
    codeResult: ''
  }


  handleRun = async(e) => {
    try{
      e.preventDefault();
      const { code } = this.props;
      const result = vm.runInNewContext(code)
      this.setState({
        codeResult: result
      })
    }catch(err){
      this.setState({
        codeResult: err
      })
    }

  }

  inputHandler = (e) => {
    this.setState({
      [e.currentTarget.name]: e.currentTarget.value
    })
  }


  render(){
    console.log('code return:',this.state.codeResult)
    return(
      <div>

        <input
          name="codeResult"
          type="textarea"
          readOnly
          value={this.state.codeResult}
          onChange={this.inputHandler}
        />
        <button onClick={this.handleRun}>run</button>


      </div>
    )
  }
}

export default ShowCode;
