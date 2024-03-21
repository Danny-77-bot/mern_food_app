import React from 'react';
import Conversations from '../src/components/Conversations';

export default function Chat() {
  return (
    <div className='chat'>
      <div className="chat-left-wrapper">
        <div className="chat-left">
          <input placeholder='search for friends' className='chat-menu-input'/>
          <Conversations/>
        </div>
      </div>

      <div className="chat-center-wrapper">
        <div className="chat-center">
          main
        </div>
      </div>

      <div className="chat-right-wrapper">
        <div className="chat-right">
          online
        </div>
      </div>
    </div>
  );
}