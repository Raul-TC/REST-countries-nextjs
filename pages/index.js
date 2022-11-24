import Head from 'next/head'
import Link from 'next/link'
import { Suspense, useState } from 'react'
import DropDownList from '../components/DropDownList'
import Flag from '../components/Flag'
import Header from '../components/Header'
import Layout from '../components/Layout'
import Search from '../components/Search'
import loading from './country/loading'
export default function Home({ flags }) {
  const [filterOption, setFilterOption] = useState('')
  const [searchData, setSearchData] = useState('')
  const [db, setdb] = useState([])
  const filterData = () => {
    let res;
    if (!filterOption && searchData === '') return flags

    const data = flags.filter(el => el.region === filterOption)
    res = data.length === 0 ? flags : data
    if (searchData !== '') {
      return res = res.filter(el => el.name.common.includes(searchData))
    }
    return res
  }


  const handleChange = (e) => {
    // const ad = filterData()

    // const filtro = ad.filter(el => el.name.common.includes(searchData))

    // console.info(filtro, "search filter")
    setSearchData(e)
    //  setdb(filtro)
    // console.info(e)
  }
  return (
    <div >
      <Head>
        <title>REST Countries</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <Layout>
        <div className='flex  flex-wrap md:justify-between md:flex-nowrap'>
          <Search db={flags} filterData={filterData} searchData={searchData} handleChange={handleChange} />
          <DropDownList filterOption={filterOption} setFilterOption={setFilterOption} />
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3'>
          {filterData().length > 0 ? filterData().map(flag => <Link key={flag.name.common} href={`/country/${flag.cca3}`}> <Flag src={flag.flags?.svg} name={flag.name.common} population={flag.population} region={flag.region} capital={flag.capital} /></Link>) : <p>{`Country "${searchData}" not found`}</p>}
        </div>


      </Layout>

      <footer>

      </footer>
    </div>
  )
}

export async function getServerSideProps() {
  const response = await fetch('https://restcountries.com/v3.1/all')
  const flags = await response.json()

  return {
    props: {
      flags
    }
  }
}
