 import React from 'react'

export default function Button({text, handleClick, className, onSubmit}) {
  return (
    <button className={className} type='submit' onClick={handleClick} onSubmit={onSubmit} >{text}</button>
  )
}
