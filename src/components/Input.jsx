import React from 'react'

export default function Input({className, placeholder, value, type}) {
  return (
    <input className={className} placeholder={placeholder} value={value} type={type} />
  )
}
