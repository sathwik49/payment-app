import React from 'react'
import {Appbar} from '../components/Appbar'
import {Balance} from '../components/Balance'
import {Users} from '../components/User'

const DashBoard = () => {
  return (
    <div className='p-5' >
      <Appbar />
      <Balance />
      <Users />
    </div>
  )
}

export default DashBoard