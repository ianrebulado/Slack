import React from 'react'

export default function Input({className, placeholder, type, onChange, value, name}) {
  return (
    <input className={className} placeholder={placeholder} type={type} name={name} onChange={onChange} autoComplete='off' value={value}/>
  )
}
