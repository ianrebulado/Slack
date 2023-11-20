import React from 'react'
import '../SideB/side-b.css'
import { Users2, Rocket, User2, Settings, Mic, Headphones } from 'lucide-react'

export default function SideB() {

  const username = localStorage.getItem('uid')


  return (
    <div className='side-b'>
      <div className='top-separator' />
      <div className='sideb-header'> <Users2 strokeWidth={2.5}/> Friends </div>
      <div className='sideb-header'> <Rocket strokeWidth={2.5} /> Turbo </div>
      <div className='user'> 
      <div className='username'> <User2 size={18}/> { username }</div>  
      <Mic size={17} /> <Headphones size={17}/> <Settings size={17} />
       </div>
    </div>
  )
}
