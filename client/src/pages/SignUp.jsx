import React from 'react'
import Heading from '../components/Heading'
import SubHeading from '../components/SubHeading'
import Inputbox from '../components/Inputbox'
import Button from '../components/Button'
import Warning from '../components/Warning'

const SignUp = () => {
  return (
    <div className='flex items-center h-screen justify-around bg-blue-300' >
      <div className='flex flex-col justify-between'>
      <Heading title={"Sign up"} />
        <SubHeading title={"Enter your information to create an account"} />
        <Inputbox  labelfor={"firstName"} label={"First Name"} type={"text"} placeholder={""} />
        <Inputbox  labelfor={"lastName"} label={"Last Name"} type={"text"} placeholder={""} />
        <Inputbox  labelfor={"email"} label={"Email"} type={"email"} placeholder={""} />
        <Inputbox  labelfor={"password"} label={"Password"} type={"password"} placeholder={""} />
        <Button title={"Sign up"} to={"/dashboard"} />
        <Warning label={"Already have an account?  "} link={"/signin"} linktitle={"Sign In"} />
      </div>
    </div>
  )
}

export default SignUp