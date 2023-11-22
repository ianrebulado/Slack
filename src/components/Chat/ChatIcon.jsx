import React from 'react'
import { User } from 'lucide-react'
import '../Chat/chat.css'

export default function ChatIcon({channel}) {
  
function click () {
  console.log([channel.name, channel.id])
}

  return (
    <div className='chat-icon' onClick={click}> <User size={16}/> {channel.name} </div>
  )
}
