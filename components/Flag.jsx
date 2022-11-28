import Image from 'next/image'
import React, { useContext } from 'react'
import ThemeContext from '../context/Theme'

const Flag = ({ src,name,population,region,capital }) => {
    const {DarkTheme} = useContext(ThemeContext)
  return (
    <div className={`${DarkTheme ? 'bg-containerDark shadow-gray-800' : ' bg-containerLight shadow-gray-300'} mb-4  shadow-md rounded-lg overflow-hidden`}>
      
          <Image width={450} height={450} src={src} alt={name} className='aspect-video object-cover' />
      <div className={`${DarkTheme ? 'text-white' : 'text-textDark'} mt-4 px-8 mb-14 `}>
              <h1 className='text-2xl font-bold mb-4'>{name}</h1>    
              <p className='my-2'><b>Population:</b> {new Intl.NumberFormat('en').format(population)}</p>
              <p className='my-2'><b>Region: </b> {region}</p>
              <p className='my-2'><b>Capital: </b> {capital}</p>
          </div>
    </div>
  )
}

export default Flag

