import React from 'react'
import { User } from 'lucide-react'
import '../Chat/chat.css'
import { Link } from 'react-router-dom'
import ChatWindow from './ChatWindow';

export default function ChatIcon({channel, path}) {
  return (
    <div className='chat-icon'> <User size={16}/> {channel.name} </div>
  
  )
}
