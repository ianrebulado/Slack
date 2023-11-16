import React from 'react'

export default function Input({className, placeholder, type, onChange}) {
  return (
    <input className={className} placeholder={placeholder} type={type} onChange={onChange} autoComplete='off'/>
  )
}
