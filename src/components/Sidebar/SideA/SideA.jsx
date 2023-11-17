import React from 'react'
import '../SideA/side-a.css'
import logo from '../../../images/discordpng.png'

export default function SideA() {
  return (
    <div className='side-a'>
      <button className="logo-container"> 
       <img src={logo} className='logo'/> 
      </button>
      <div className='separator' /> 

    </div>
  )
}
