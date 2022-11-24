import Image from 'next/image'
import React from 'react'

const Flag = ({ src,name,population,region,capital }) => {
    
  return (
    <div className='mb-4 border-gray-300 shadow-md rounded-lg overflow-hidden'>
      
          <Image width={450} height={450} src={src} alt={name} className='aspect-video object-cover' />
      <div className='mt-4 px-8 mb-14'>
              <h1 className='text-2xl font-bold mb-4'>{name}</h1>    
              <p className='my-2'><b>Population:</b> {new Intl.NumberFormat('en').format(population)}</p>
              <p className='my-2'><b>Region: </b> {region}</p>
              <p className='my-2'><b>Capital: </b> {capital}</p>
          </div>
    </div>
  )
}

export default Flag

