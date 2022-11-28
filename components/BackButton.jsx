import Link from 'next/link'
import React from 'react'
import { HiOutlineArrowLeft } from 'react-icons/hi'

const BackButton = () => {
  return (
      <Link href='/' className='flex items-center justify-center w-28 px-4 py-2 border-gray-300 shadow-md rounded-sm overflow-hidden'>
          <HiOutlineArrowLeft className=' mr-2'/>
          <p>Back</p>
      </Link>
  )
}

export default BackButton