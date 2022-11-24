import React, { useContext } from 'react'
import {HiMoon, HiOutlineMoon} from 'react-icons/hi'
import ThemeContext, { ThemeProvider } from '../context/Theme'
const ToogleTheme = () => {
  const {DarkTheme, handleTheme} = useContext(ThemeContext)
  return (
      <button onClick={() =>  handleTheme()} className='flex items-center justify-between cursor-pointer'>
      
      {DarkTheme ? <HiMoon  className='w-5 h-5' /> : <HiOutlineMoon className='w-5 h-5' />}
          <p className='ml-2'>Dark Mode</p>
    </button>
  )
}

export default ToogleTheme