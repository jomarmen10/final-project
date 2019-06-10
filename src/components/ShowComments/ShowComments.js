import React, { Component } from 'react';

class ShowComment extends Component{


  render(){
    const { allComment } = this.props
    return(
      <>
      {
        allComment
        ? (
          allComment.map((c,i) => {
            return <ul key={i}>{c.comment}</ul>
          })
        )
        :null
      }

      </>
    )
  }
}

export default ShowComment;
