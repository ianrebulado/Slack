import React from 'react'

import '../Chat/chat.css'


export default function ChatIcon({channel}) {

  const channelName = channel.name[0];
  
  return (
    <div className='chat-icon'> {channelName} </div>
  
  )
}
