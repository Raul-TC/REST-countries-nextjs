import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import BackButton from '../../components/BackButton'
import Header from '../../components/Header'
import Layout from '../../components/Layout'

const Flag = ({flag, res}) => {
  let { name, flags,population,region,subregion,capital,tld,currencies,languages,coatOfArms } = flag
  
 // res.map(el => console.info(el[0].name.common))  

  const getBorders = () => {
    let respuesta = '';
    if(res === {}) return <span className='mr-2 mb-2 bg-red-400 text-white font-semibold border-gray-300 shadow-md rounded-lg overflow-hidden p-3'>No Borders</span>
    
    let bords = res.map(el => {
      
     // console.info(el[0])
      return <Link key={el[0].name.common} href={`/country/${el[0].cca3}`} className='mr-2 mb-2 border-gray-300 shadow-md rounded-lg overflow-hidden p-3'>
     <span >{el[0].name.common}</span>
     
     </Link> 
    })
   return bords
  }
    const getNativeName = () => {
    let nativeName = name.nativeName
    let valores = Object.values(nativeName);
    for(let i=0; i< valores.length; i++){
      return valores[0].official
      }
  }
    const getCurrencies = () => {
    let currency = currencies
    let valores = Object.values(currency);
    for(let i=0; i< valores.length; i++){
      return valores[0].name
      }
  }
  //console.info(languages)
  const getLanguages = () => {
    let allLanguages = ''

    let valores = Object.values(languages)
 //   console.info(valores)
  const ad =  valores.map((el,index) => {
    return ` ${el}`
  })
    
   // console.info(ad)
      return ad.toString().replace(" " , "")
    
  }

  getLanguages()
  return (
    <>
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
                  { getBorders()}
                </div>
              </div>
          </div>
        </div>
      </Layout>
    </>
  )
}
// let {query} = useRouter()

export default Flag

export async function getStaticPaths() {
  const response = await fetch('https://restcountries.com/v3.1/all')
  const flag = await response.json()
 // console.info(flag)
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
  //console.info(id)
  const response = await fetch(`https://restcountries.com/v3.1/alpha/${id}`)
  const flag = await response.json()

  
 console.info(flag[0].name.common)
 
const isBorder = flag[0].hasOwnProperty('borders')
  let res;
  if (isBorder) {
    let bordersFetch =  flag[0].borders.map(  border =>  fetch(`https://restcountries.com/v3.1/alpha/${border}`))
   
   res = await Promise.all(bordersFetch)
        .then(res => res.map( el =>  el))
        .then(respuesta => Promise.all(respuesta.map(el => el.json())))
        .then(user => user)
  } else {
    res = {}
 }

 // console.info(bordersFetch,"fetches")
  
//  const resultJSON = esults.map((el) =>  el.json())

// console.info(bord)
 

 // console.info(res, "borders")
  return {
    props: {
      flag: flag[0],
      res:res
    }
  }
}