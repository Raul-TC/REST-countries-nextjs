'use client'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

const Border = ({ border }) => {
let {id} = useRouter()
    const [bordersName, setBordersName] = useState([])
  const [linkCountrie, setLinkCountrie] = useState("")
  
  const getBorders = async () => {
     await fetch(`https://restcountries.com/v3.1/alpha/${border}`)
        .then((res) => (res.ok ? res.json() : Promise.reject()))
        .then((el) => {
            setBordersName(el[0].name.common);
            setLinkCountrie(el[0].cca3)
        })
          .catch(err => console.info(err))
    }
  
    useEffect(() => {
      if (border === "None") {
        setBordersName("None");
      } else {
        getBorders()
      }
  }, [id]);
   console.info(bordersName,'bordeer')
  return (
      <Link key={bordersName} href={`/${linkCountrie}`} className='mr-2 mb-2 border-gray-300 shadow-md rounded-lg overflow-hidden p-3'>
         <span >{bordersName}</span>
         </Link> 
    
  )
}
export default Border