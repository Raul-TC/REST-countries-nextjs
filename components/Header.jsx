import Link from 'next/link'
import React from 'react'
import ToogleTheme from './ToogleTheme'

const Header = () => {
    return (
      <>
    <header className='h-20  mb-4 w-full m-auto border-b-2 border-gray-300 shadow-md'>
        <div className='flex h-full items-center justify-between w-[90%] max-w-7xl m-auto'>
            <Link href='/'>
              <h1 className='font-bold'>Where in the world?</h1>
            </Link>
            <ToogleTheme />
        </div>
    </header>
      </>
  )
}

export default Header