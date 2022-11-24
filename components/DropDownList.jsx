import React, { useState } from 'react'
import { HiOutlineChevronDown } from 'react-icons/hi'

const DropDownList = ({filterOption,setFilterOption}) => {
const [dropDown, setDropDown] = useState(false)
  const countries = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania']
  //const [filter, setFilter] = useState('')

 
  return (
    <>
      <div className='relative w-52 mb-8'>

      <div className='flex cursor-pointer justify-between items-center w-full py-4 px-2  border-gray-300 shadow-md rounded-lg overflow-hidden' onClick={()=>setDropDown(!dropDown)}>
        <p>
          {filterOption === '' ? 'Choose one region' : filterOption}
        </p>
        <HiOutlineChevronDown />
      </div>
      {dropDown && <div className='absolute w-full left-0 py-4 bg-white mt-2 border-gray-300 shadow-md rounded-lg overflow-hidden'>
          {countries.map((countrie,index) => <p key={`${countrie}_${index}`} className='py-2 px-2 cursor-pointer hover:bg-slate-200' onClick={() => {
            setFilterOption(countrie)
            setDropDown(false)
       }}>{countrie}</p>)}
      </div>}
    </div>
    
    </>
  )
}

export default DropDownList