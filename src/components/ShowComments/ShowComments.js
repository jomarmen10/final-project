import React, { Component } from 'react';

class ShowComment extends Component{
  state = {

  }

  render(){
    const { allComment } = this.props
    return(
      <div>
        <h1>show input</h1>

        {/* <textarea> */}
          {allComment.map((c,i) => {
            return <h1 key={i}>{c.comment}</h1>
          })}

          {/* </textarea> */}

      </div>
    )
  }
}

export default ShowComment;
