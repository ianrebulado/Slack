import React from 'react'
import FormLabel from '../../components/FormLabel'
import Input from '../../components/Input'
import Button from '../../components/Button'
import '../Signup/signup.css'
import { Link } from 'react-router-dom'

export default function Signup() {
  return (
    <div className="position">
        <div className="signup-container">
            <form className='signupform-container'>
            <h3>Create an account</h3>
              <FormLabel label={'EMAIL'} />
              <Input className={'input-field'} />
              <FormLabel label={'PASSWORD'} />
              <Input className={'input-field'} />
              <FormLabel label={'CONFIRM PASSWORD'} />
              <Input className={'input-field'} />
            <Button className={'login-btn'} text={'Continue'}  />
            <Link to={'/'}> Already have an account? </Link>
            </form>
        </div>
    </div>
  )
}
