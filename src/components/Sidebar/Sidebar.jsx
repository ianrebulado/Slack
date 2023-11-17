import React from 'react'
import '../Sidebar/sidebar.css'
import SideA from './SideA/SideA'
import SideB from './SideB/SideB'

export default function Sidebar() {
  return (
    <div className='sidebar-container'>
      <SideA />
      <SideB />
      </div>
  )
}
