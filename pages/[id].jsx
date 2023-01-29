import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import React, { useContext } from 'react'
import BackButton from '../components/BackButton'
import Header from '../components/Header'
import Layout from '../components/Layout'
import ThemeContext from '../context/Theme'

const Flag = ({ flag, bord }) => {
  const { DarkTheme } = useContext(ThemeContext)

  if (!flag) {
    return
  }

  let { name, flags, population, region, subregion, capital, tld, currencies, languages, continents } = flag

  const getNativeName = () => {

    let nativeName = name.nativeName
    if (!nativeName) return 'No Native Name'
    let valores = Object.values(nativeName);
    for (let i = 0; i < valores.length; i++) {
      return valores[0].official
    }
  }
  const getCurrencies = () => {

    if (!currencies) return 'No Currencies'

    let currency = currencies
    let valores = Object.values(currency);
    for (let i = 0; i < valores.length; i++) {
      return valores[0].name
    }
  }
  const getLanguages = () => {
    if (!languages) return 'No Languages'

    let valores = Object.values(languages)
    const ad = valores.map(el => {
      return ` ${el}`
    })

    return ad.toString().replace(" ", "")
  }

  return (
    <div className={`${DarkTheme ? 'text-white bg-bodyDark' : 'text-textDark bg-bodyLight'} min-h-screen h-auto`} >

      <Head>
        <title>REST Countries/{name.common} </title>
        <meta name="description" content={`${name.official || name.common} It is a country located on the continent ${continents}, it has a population of ${new Intl.NumberFormat('en').format(population)} inhabitants its capital is ${capital} and languages are spoken ${getLanguages()}.`} />
        <link rel="icon" href={flags.png} />
      </Head>
      <Header />
      <Layout>
        <BackButton />

        <div className='md:flex justify-between items-center m-auto'>
          <Image src={flags.svg} width={550} height={450} alt={`${name.common}_flag`} priority className='mt-4 h-[250px]  object-contain md:self-start lg:h-auto' />
          <div className='w-full md:w-[40%] md:flex md:flex-col'>
            <h1 className='text-2xl font-bold '>{name.common}</h1>
            <div className='md:flex md:justify-between items-start'>
              <div >
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
              <div className='flex flex-wrap items-center pb-4'>

                {
                  bord.length > 0 ? bord.map(el => <Link key={el.name.common} href={`/${el.cca3}`} className={`${DarkTheme ? 'bg-containerDark shadow-gray-800 hover:bg-containerLight hover:text-textDark' : 'bg-containerLight shadow-gray-300 hover:bg-containerDark hover:text-white'} mr-2 mb-2 shadow-md rounded-lg overflow-hidden px-3 py-2`}>
                    <span >{el.name.common}</span>
                  </Link>
                  ) : <Link href='/' className='mr-2 mb-2 border-gray-300 bg-orange-400 text-white shadow-md rounded-lg overflow-hidden p-3'>
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
    fallback: false
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
      bord: responseBorder
    },
    revalidate: 10,
  }





}