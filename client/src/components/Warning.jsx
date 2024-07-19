import React from 'react'
import { Link } from 'react-router-dom'

const Warning = ({label,link,linktitle}) => {
  return (
    <div>
        {label} <Link className='text-blue-700' to={link}>{linktitle}</Link>
    </div>
  )
}

export default Warning