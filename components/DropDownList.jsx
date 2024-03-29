import React, { useContext, useState } from 'react'
import { HiOutlineChevronDown } from 'react-icons/hi'
import ThemeContext from '../context/Theme'

const DropDownList = ({ filterOption, setFilterOption }) => {
  const [dropDown, setDropDown] = useState(false)
  const countries = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania']
  const countriesTwo = ['All Regions', 'Africa', 'Americas', 'Asia', 'Europe', 'Oceania']

  const { DarkTheme } = useContext(ThemeContext)
  return (
    <>
      <div className='relative w-52 mb-8'>
        <div className={`${DarkTheme ? 'bg-containerDark shadow-gray-800' : 'bg-containerLight shadow-gray-300'} flex  cursor-pointer justify-between items-center w-full py-4 px-2 shadow-md rounded-lg`} onClick={() => setDropDown(!dropDown)}>
          <p className={`${DarkTheme ? 'text-white' : 'text-textDark'} `}>
            {filterOption === '' ? 'Choose one region' : filterOption}
          </p>
          <HiOutlineChevronDown className={`${DarkTheme ? 'text-white' : 'text-textDark'}`} />
        </div>
        {dropDown && <div className={`${DarkTheme ? 'bg-containerDark shadow-gray-800' : 'bg-containerLight shadow-gray-300'} absolute w-full mt-2 left-0 py-4  shadow-md rounded-lg`}>
          {filterOption === '' ? countries.map((countrie, index) => <p key={`${countrie}_${index}`} className={`${DarkTheme ? 'bg-containerDark shadow-gray-800 md:hover:bg-[#74737352]  text-white' : 'bg-containerLight shadow-gray-300 md:hover:bg-[#7473731f] text-textDark'} py-2 px-2 cursor-pointer `} onClick={() => {
            setFilterOption(countrie)
            setDropDown(false)
          }}>{countrie}</p>) : countriesTwo.map((countrie, index) => <p key={`${countrie}_${index}`} className={`${DarkTheme ? 'bg-containerDark shadow-gray-800 md:hover:bg-[#74737352]  text-white' : 'bg-containerLight shadow-gray-300 md:hover:bg-[#7473731f] text-textDark'} py-2 px-2 cursor-pointer `} onClick={() => {
            setFilterOption(countrie)
            setDropDown(false)
          }}>{countrie}</p>)}
        </div>}
      </div>

    </>
  )
}

export default DropDownList