import React from 'react'
import '../SideB/side-b.css'
import { Users2, Rocket } from 'lucide-react'

export default function SideB() {
  return (
    <div className='side-b'>
      <div className='top-separator' />
      <div className='sideb-header'> <Users2 strokeWidth={2.5}/> Friends </div>
      <div className='sideb-header'> <Rocket strokeWidth={2.5} /> Turbo </div>
    </div>
  )
}
