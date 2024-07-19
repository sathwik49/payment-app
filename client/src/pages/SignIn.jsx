import React from 'react'
import Heading from '../components/Heading'
import SubHeading from '../components/SubHeading'
import Inputbox from '../components/Inputbox'
import Button from '../components/Button'
import Warning from '../components/Warning'

const SignIn = () => {
  return (
      <div className='flex items-center h-screen justify-around bg-blue-300' >
      <div className='flex flex-col justify-between' >
      <Heading title={"Sign in"} />
        <SubHeading title={"Enter your information to Login"} />
        <Inputbox  labelfor={"username"} label={"User name"} type={"text"} placeholder={""} />
        <Inputbox  labelfor={"password"} label={"Password"} type={"password"} placeholder={""} />
        <Button title={"Sign in"} to={"/dashboard"} />
        <Warning label={"Want to create New Account?  "} link={"/signup"} linktitle={"Sign Up"} />
      </div>
    </div>
  )
}

export default SignIn;