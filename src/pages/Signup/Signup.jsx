import React from 'react'
import FormLabel from '../../components/FormLabel'
import Input from '../../components/Input'
import Button from '../../components/Button'
import '../Signup/signup.css'

export default function Signup() {
  return (
    <div className="position">
        <div className="container">
            <h3>Create an account</h3>
            <form className='form-container'>
              <FormLabel label={'EMAIL'} />
              <Input />
              <FormLabel label={'PASSWORD'} />
              <Input />
              <FormLabel label={'CONFIRM PASSWORD'} />
              <Input />
            <Button />
              
            </form>
        </div>
    </div>
  )
}
