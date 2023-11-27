import React from 'react'
import { User } from 'lucide-react'
import { useLoaderData } from 'react-router-dom'
import './dmicon.css'

export default function DMIcon({id}) {


  return (
    <div className='dm-icon'> <User /> {id} </div>
  )
}
