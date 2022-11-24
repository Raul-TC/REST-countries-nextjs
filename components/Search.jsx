import Image from 'next/image'
import Link from 'next/link'
import React, { useRef } from 'react'
import { HiOutlineSearch } from 'react-icons/hi'

const Search = ({db,filterData,searchData,handleChange}) => {

  return (
    <div className='w-full md:w-[40%] '>

      <div className='flex items-center w-full mb-4  border-b-2 border-gray-300 shadow-md rounded-lg overflow-hidden '>
        <HiOutlineSearch className='ml-8 h-6 w-6 text-gray-500'/>
        <input onChange={(e) => handleChange(e.target.value) } type="search" className='w-full pr-2 pl-4 mr-2 py-3 text-gray-500 outline-none' placeholder='Search for a country...' />
          
    </div>

      {/* <div className='bg-gray-200 relative'>
         {searchData  !== '' && <p>Not found countrie...</p>} 
         {filterData('filter').length > 0 && searchData !== '' && filterData('filter').map((el,index) => <Link key={`${index}_${el.name.common}`} href={`/country/${el.cca3}`}> <div className='flex items-center justify-between mt-2 p-2'>
          <h1>{el.name.common}</h1>
          <Image src={el.flags.svg} width={50} height={100} alt={el.name} />
        </div></Link>)} 
      </div> */}
    </div>
  )
}

export default Search