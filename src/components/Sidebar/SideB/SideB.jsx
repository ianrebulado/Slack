import React from 'react'
import ChatIcon from '../../Chat/ChatIcon'


import { Users2, Rocket, User2, Settings, Mic, Headphones, Plus } from 'lucide-react'
import '../SideB/side-b.css'

export default function SideB({channelList}) {

  const username = localStorage.getItem('uid')
  
  return (
    <div className='side-b'>
      <div className='top-separator' />
      <div className='sideb-header'> <Users2 strokeWidth={2.5}/> Friends </div>
      <div className='sideb-header'> <Rocket strokeWidth={2.5} /> Turbo </div>

      <div className='message-header'> <div> Messages </div> <Plus size={16} strokeWidth={2}/> </div>
    <section className='messages'>
    {channelList.map((channel, index) => (
        <ChatIcon key={index} channel={channel.name} />))}
    </section>

      <section className='user'> 
      <div className='username'> <User2 size={18}/> { username }</div>  
      <Mic size={17} cursor={'pointer'}/> <Headphones size={17} cursor={'pointer'}/> <Settings size={17} cursor={'pointer'}/>
       </section>
    </div>
  )
}
