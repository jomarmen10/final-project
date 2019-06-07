import React, { Component } from 'react';
//emoji
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'

class Emoji extends Component {
  render() {
    return(
      <div>
        <Picker
          set='google'
          emoji='call_me_hand'
          style={{ position: 'absolute', bottom: '20px', right: '20px' }}
          onClick={this.emojiHandler}
        />
      </div>
    );
  }
}

export default Emoji;
