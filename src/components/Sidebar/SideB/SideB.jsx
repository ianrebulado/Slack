import React from 'react'
import ChatWindow from '../../Chat/ChatWindow'


import { Users2, Rocket, User2, Settings, Mic, Headphones, Plus } from 'lucide-react'
import '../SideB/side-b.css'

export default function SideB() {

  const username = localStorage.getItem('uid')


  return (
    <div className='side-b'>
      <div className='top-separator' />
      <div className='sideb-header'> <Users2 strokeWidth={2.5}/> Friends </div>
      <div className='sideb-header'> <Rocket strokeWidth={2.5} /> Turbo </div>

      <div className='message-header'> <div> Messages </div> <Plus size={16} strokeWidth={2}/> </div>
    <section className='messages'>
    <ChatWindow /> 
    <ChatWindow />
    <ChatWindow />
    <ChatWindow />
    <ChatWindow /> 
    <ChatWindow />
    <ChatWindow />
    <ChatWindow />
    <ChatWindow /> 
    <ChatWindow />
    <ChatWindow />
    <ChatWindow />
    <ChatWindow /> 
    <ChatWindow />
    <ChatWindow />
    <ChatWindow />
    </section>

      <section className='user'> 
      <div className='username'> <User2 size={18}/> { username }</div>  
      <Mic size={17} /> <Headphones size={17}/> <Settings size={17} />
       </section>
    </div>
  )
}
