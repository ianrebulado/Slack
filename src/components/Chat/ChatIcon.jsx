import React from 'react'
import { User } from 'lucide-react'
import '../Chat/chat.css'

export default function ChatIcon({channel}) {
  
  return (
    <div className='chat-icon'> <User size={16}/> {channel} </div>
  )
}
