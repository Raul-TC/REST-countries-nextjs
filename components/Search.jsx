import React, { useContext, useRef } from 'react'
import { HiOutlineSearch } from 'react-icons/hi'
import ThemeContext from '../context/Theme'

const Search = ({setSearchData}) => {
  const {DarkTheme} = useContext(ThemeContext)

  return (
    <div className={`${DarkTheme ? 'bg-containerDark shadow-gray-800' : 'bg-containerLight shadow-gray-300'} w-full mb-4  md:w-[40%] shadow-md rounded-lg`}>

      <div className='flex items-center w-full md:mb-0  '>
        <HiOutlineSearch className='ml-8 h-6 w-6 text-gray-400'/>
        <input onChange={(e) => setSearchData((e.target.value)) } type="search" className={`${DarkTheme ? 'bg-containerDark text-gray-400' : 'bg-containerLight text-textDark'} w-full pr-2 pl-4 mr-2 py-3  outline-none`} placeholder='Search for a country...' />  
      </div>
    </div>
  )
}

export default Search