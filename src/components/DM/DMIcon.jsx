import React from 'react'
import { User } from 'lucide-react'
import { useLoaderData } from 'react-router-dom'

export default function DMIcon({conversations}) {

  const id = useLoaderData()

  return (
    <div className='dm-icon'> <User /> {id} </div>
  )
}
