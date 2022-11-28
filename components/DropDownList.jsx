import React, { useContext, useState } from 'react'
import { HiOutlineChevronDown } from 'react-icons/hi'
import ThemeContext from '../context/Theme'

const DropDownList = ({filterOption,setFilterOption}) => {
const [dropDown, setDropDown] = useState(false)
  const countries = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania']
  //const [filter, setFilter] = useState('')

 const {DarkTheme} = useContext(ThemeContext)
  return (
    <>
      <div className='relative w-52 mb-8'>

      <div className={`${DarkTheme ? 'bg-containerDark shadow-gray-800' : 'bg-containerLight shadow-gray-300'} flex  cursor-pointer justify-between items-center w-full py-4 px-2 shadow-md rounded-lg`} onClick={()=>setDropDown(!dropDown)}>
          <p className={`${DarkTheme ? 'text-white' : 'text-textDark'} `}>
          {filterOption === '' ? 'Choose one region' : filterOption}
        </p>
        <HiOutlineChevronDown className={`${DarkTheme ? 'text-white' : 'text-textDark'}`} />
      </div>
      {dropDown && <div className={`${DarkTheme ? 'bg-containerDark shadow-gray-800' : 'bg-containerLight shadow-gray-300'} absolute w-full mt-2 left-0 py-4  shadow-md rounded-lg`}>
          {countries.map((countrie,index) => <p key={`${countrie}_${index}`} className={`${DarkTheme ? 'text-white hover:bg-gray-800' : 'text-textDark hover:bg-slate-200'} py-2 px-2 cursor-pointer `} onClick={() => {
            setFilterOption(countrie)
            setDropDown(false)
       }}>{countrie}</p>)}
      </div>}
    </div>
    
    </>
  )
}

export default DropDownList