import Link from 'next/link'
import React, { useContext } from 'react'
import ThemeContext from '../context/Theme'
import ToogleTheme from './ToogleTheme'

const Header = () => {
  const {DarkTheme} = useContext(ThemeContext)
    return (
      <>
    <header className={`${DarkTheme ? 'bg-containerDark shadow-gray-800' : 'bg-containerLight shadow-gray-300'} h-20  w-full m-auto shadow-md mb-4 `}>
        <div className='flex h-full items-center justify-between w-[90%] max-w-7xl m-auto '>
            <Link href='/'>
              <h1 className={`${DarkTheme ? 'text-white' : 'text-textDark'} font-bold`}>Where in the world?</h1>
            </Link>
            <ToogleTheme />
        </div>
    </header>
      </>
  )
}

export default Header