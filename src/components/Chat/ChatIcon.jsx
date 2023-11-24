import React from 'react'
import { User } from 'lucide-react'
import '../Chat/chat.css'
import { Link } from 'react-router-dom'
import ChatWindow from './ChatWindow';

export default function ChatIcon({channel, path}) {

  console.log(channel.name)
  const channelName = channel.name[0];

  console.log(channelName)

  return (
    <div className='chat-icon'> {channelName} </div>
  
  )
}
