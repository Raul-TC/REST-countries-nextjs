import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useContext, useEffect, useState } from 'react'
import BackButton from '../components/BackButton'
import Border from '../components/Border'
import Error404 from './404'
import Header from '../components/Header'
import Layout from '../components/Layout'
import ThemeContext from '../context/Theme'

const Flag = ({flag,bord}) => {
  const { DarkTheme } = useContext(ThemeContext)
  const {route} = useRouter()

   if (!flag) {
     return 
  }

  
 // console.info(bord)
  let { name, flags,population,region,subregion,capital,tld,currencies,languages } = flag
  
 // const [borderCountrie, setborderCountrie] = useState(borders)
 
  // if (!borders) {
  //   setborderCountrie(["None"])
  // } else {
  //   setborderCountrie(borders)
  // }
 // console.info(bordersName)
 // res.map(el => console.info(el[0].name.common))

 // console.info(borderCountrie)
  // const getBorders = () => {
  //    if(!borderCountrie) return <span className='mr-2 mb-2 bg-red-400 text-white font-semibold border-gray-300 shadow-md rounded-lg overflow-hidden p-3'>No Borders</span>
    
  //    let bords = borderCountrie.map(el => {
      
  //     // console.info(el[0])
  //      return <Link key={el[0].name.common} href={`/${el[0].cca2}`} className='mr-2 mb-2 border-gray-300 shadow-md rounded-lg overflow-hidden p-3'>
  //     <span >{el[0].name.common}</span>
     
  //     </Link> 
  //    })
  //   return bords
  // }
  
  const getNativeName = () => {
    
    let nativeName = name.nativeName 
    if (!nativeName) return 'No Native Name'
    let valores = Object.values(nativeName);
    for(let i=0; i< valores.length; i++){
      return valores[0].official
      }
  }
  const getCurrencies = () => {
      
    if (!currencies) return 'No Currencies'
    
    let currency = currencies
    let valores = Object.values(currency);
    for(let i=0; i< valores.length; i++){
      return valores[0].name
      }
  }
  //console.info(languages)
  const getLanguages = () => {
    let allLanguages = ''
    if (!languages) return 'No Languages'

    let valores = Object.values(languages)
 //   console.info(valores)
  const ad =  valores.map((el,index) => {
    return ` ${el}`
  })
    
   // console.info(ad)
      return ad.toString().replace(" " , "")
    
  }

 // getLanguages()
  return (
    <div className={DarkTheme ? 'text-white' : 'text-textDark'} >

      <Head>
        <title>REST Countries - {name.common}</title>
        <meta name="description" content={`Description of the countrie ${name.common}`} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Layout>
        <BackButton/>

        <div className='lg:flex justify-between m-auto'>
          <Image src={flags.svg} width={550} height={450} alt={`${name.common}_flag`} priority  className='mt-4 h-[250px] object-contain md:h-auto m-auto '/>
          {/* <Image src={coatOfArms.svg} width={550} height={450} alt={`${name.common}_coat`} priority  className='mt-4 h-[250px] md:w-[40%]' /> */}
          <div className='w-full md:w-[40%] md:flex md:flex-col'>
          <h1 className='text-2xl font-bold mt-4'>{name.common}</h1>
            <div className='md:flex md:justify-between'>
              <div className='my-4'>
                <p className='my-2'><b>Native Name: </b>{getNativeName()}</p>
                <p className='my-2'><b>Population: </b>{new Intl.NumberFormat('en').format(population)}</p>
                <p className='my-2'><b>Region: </b>{region}</p>
                <p className='my-2'><b>Subregion: </b>{subregion}</p>
                <p className='my-2'><b>Capital: </b>{capital}</p>
              </div> 
              <div>
                <p className='my-2'><b>Top Level Domain: </b>{tld}</p>
                <p className='my-2'><b>Currencies: </b>{getCurrencies()}</p>
                <p className='my-2'><b>Languages: </b>{getLanguages()}</p>
              </div>
            </div>
              <div>
                
                <p className='my-2'><b>Border Countries: </b></p>
                 <div className='flex flex-wrap items-center'> 

                {
                  bord.length > 0 ? bord.map(el =>  <Link key={el.name.common} href={`/${el.cca3}`} className={`${DarkTheme ? 'bg-containerDark shadow-gray-800' : 'bg-containerLight shadow-gray-300'} mr-2 mb-2 shadow-md rounded-lg overflow-hidden p-3`}>
         <span >{el.name.common}</span>
         </Link> 
    ) :  <Link href='/' className='mr-2 mb-2 border-gray-300 bg-orange-400 text-white shadow-md rounded-lg overflow-hidden p-3'>
         <span >No Borders</span>
         </Link> 
    
  }
                </div> 
              </div>
          </div>
        </div>
      </Layout>
    
  </div>
  )
}
// let {query} = useRouter()

export default Flag

export async function getStaticPaths() {
  const response = await fetch('https://restcountries.com/v3.1/all')
  const flag = await response.json()
  const paths = flag.map(el => (
    {
      params: {
        id: el.cca3
      }
    }
    )
    )
    return {
      paths: [...paths],
      fallback:false
    }
}

export async function getStaticProps({ params }) {
let { id } = params
  let param = id.toLowerCase()
  
  const response = await fetch(`https://restcountries.com/v3.1/alpha/${param}`)
  const flagFetch = await response.json()

  let query = flagFetch[0].borders || []

  const resBorder = await fetch(`https://restcountries.com/v3.1/alpha?codes=${query.join(',')}`)
  const responseBorder = await resBorder.json()

return {
 props: {
    flag: flagFetch[0],
   bord:responseBorder
 },
 revalidate: 10,
}



          

}