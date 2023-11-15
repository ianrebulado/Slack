import React from 'react'

export default function FormLabel({label}) {
  return (
    <label className='form-label'>{label} &nbsp;<sup className='req'>*</sup></label>
  )
}
