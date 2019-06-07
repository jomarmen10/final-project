import React, { Component } from 'react';

class ShowComment extends Component{
  state = {

  }

  render(){
    const { allComment } = this.props
    return(
      <div>

        {allComment.map((c,i) => {
          return <p key={i}>{c.comment}</p>
        })}
      </div>
    )
  }
}

export default ShowComment;
