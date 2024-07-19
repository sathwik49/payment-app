import React from 'react'
import { Link } from 'react-router-dom'

const Button = ({title,to}) => {
  return (
    <Link to={to}>
     <div className='font-medium mt-1 mb-1 block w-full px-3 py-2 rounded-md color text-white bg-zinc-800 text-center cursor-pointer hover:bg-slate-400 hover:text-black'>
        {title}
    </div>
    </Link>
  )
}

export default Button