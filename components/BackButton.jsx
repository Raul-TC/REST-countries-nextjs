import Link from 'next/link'
import React, { useContext } from 'react'
import { HiOutlineArrowLeft } from 'react-icons/hi'
import ThemeContext from '../context/Theme'

const BackButton = () => {
  const {DarkTheme} = useContext(ThemeContext)
  return (
    <Link href='/' className={`${DarkTheme ? 'bg-containerDark shadow-gray-800 md:hover:bg-containerLight md:hover:text-textDark' : 'bg-containerLight shadow-gray-300 md:hover:bg-containerDark md:hover:text-white'} flex items-center justify-center w-28 px-4 py-2 mt-4 shadow-md rounded-sm overflow-hidden`}>
          <HiOutlineArrowLeft className=' mr-2'/>
          <p>Back</p>
      </Link>
  )
}

export default BackButton