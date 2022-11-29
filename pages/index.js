import Head from 'next/head'
import Link from 'next/link'
import { useContext, useState } from 'react'
import DropDownList from '../components/DropDownList'
import Flag from '../components/Flag'
import Header from '../components/Header'
import Layout from '../components/Layout'
import Search from '../components/Search'
import ThemeContext from '../context/Theme'
import InfiniteScroll from 'react-infinite-scroll-component'
export default function Home({ flags }) {
  const [filterOption, setFilterOption] = useState('')
  const [searchData, setSearchData] = useState('')
  const [data, setData] = useState(10);
  // const [db, setdb] = useState([])

  //console.info(flags.slice(0, 100))

  const { DarkTheme } = useContext(ThemeContext)
  // console.info(screenY)
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

  const getData = () => {
    setData((prevState) => prevState + 20)
  }


  const dataFlags = filterData().slice(0, data)
  return (
    <div className={`${DarkTheme ? '#202D36' : '#FAFAFA'} min-h-screen`}>
      <Head>
        <title>REST Countries</title>
        <meta name="description" content="All the countries of the world" />
        <meta name="theme-color" content={DarkTheme ? 'bg-bodyDark' : 'bg-bodyLight'} />

        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <Layout>
        <div className='flex  flex-wrap md:justify-between items-start md:flex-nowrap'>
          <Search db={flags} filterData={filterData} searchData={searchData} setSearchData={setSearchData} />
          <DropDownList filterOption={filterOption} setFilterOption={setFilterOption} />
        </div>

        <InfiniteScroll dataLength={dataFlags.length} hasMore='true' next={getData}>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3'>
            {dataFlags.length > 0 ? dataFlags.map(flag => <Link key={flag.name.common} href={`/${flag.cca3}`}> <Flag src={flag.flags?.svg} name={flag.name.common} population={flag.population} region={flag.region} capital={flag.capital} /></Link>) : <p className={`${DarkTheme ? 'text-white' : 'text-textDark'} font-bold`}>{`Country "${searchData}" not found`}</p>}
          </div>
        </InfiniteScroll>


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
