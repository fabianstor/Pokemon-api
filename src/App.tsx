import axios from 'axios'
import PokemonCard from './components/card/PokemonCard'
import { useContext, useEffect, useState } from 'react'
import { IPokemon } from './components/card/interfaces.interface'
import { Button, Row } from 'antd'
import { CloseCircleOutlined, UnorderedListOutlined } from '@ant-design/icons'
import Loader from './components/loader/Loader'
import DrawerMenu from './components/drawer/DrawerMenu'
import { filterContext } from './constants/constants'
import { IPokemonInit } from './interface.interface'
import InfiniteScroll from 'react-infinite-scroll-component'
import NavBar from './components/navBar/NavBar'
import { serviceUrl } from './service/service'
import './App.css'
function App() {
  const [pokemons, setPokemons] = useState<IPokemonInit[]>([])
  const [pokemonsDetails, setPokemonsDetails] = useState<IPokemon[]>([])
  const [showDrawer, setShowDrawer] = useState(false)
  const [nextUrl, setNextUrl] = useState('')
  const {filterType, setFilterType } = useContext(filterContext)
  const [hasMore, setHasMore] = useState(true)
  useEffect(() => {
    serviceUrl().then((data) => {
      setNextUrl(data.next)
      setPokemons(data.result)
    })
  }, [])

  const fetchMoreData = async () => {
    if (nextUrl) {
      if(filterType.length === 0) {
        const response = await axios.get(nextUrl)
        setPokemons([...pokemons, ...response.data.results])
        setNextUrl(response.data.next)
      }
    } else {
      setHasMore(false)
    }
  }

  const handleDrawer = () => {
    setShowDrawer(!showDrawer)
  }

  const handleFilterType = () => {
    setFilterType([])
  }
  const handlePokemonDetails = (pokemonDetail: IPokemon[]) => {
    setPokemonsDetails(pokemonDetail)
  }

  return (<>
  <NavBar/>
  <Row>
      <Button className='btn-drawer' onClick={handleDrawer}><UnorderedListOutlined /></Button>
      {filterType.length > 0 && <Button className='btn-float' onClick={handleFilterType}><CloseCircleOutlined /></Button>}
      <InfiniteScroll
        className='infinit-card-pokemon'
        dataLength={pokemons.length}
        next={fetchMoreData}
        hasMore={hasMore && filterType.length === 0}
        loader={<Loader />}
      >
        {pokemons.filter((pokemon) => {
          const index = pokemonsDetails.findIndex((detail) => detail.url === pokemon.url)
          return filterType.length === 0 ? true : filterType?.some((filter) => filter?.includes(pokemonsDetails[index]?.types?.find((type) => type === filter) ?? 'others'))
          
        })  
          .map((pokemon: IPokemonInit) => {
            return <PokemonCard nextUrl={nextUrl} pokemonDetails={pokemonsDetails} handlePokemonDetails={handlePokemonDetails} key={pokemon.url} name={pokemon.name} url={pokemon.url}></PokemonCard>
          })}
      </InfiniteScroll>
      <DrawerMenu pokemonsDetails={pokemonsDetails} show={showDrawer} showDrawer={handleDrawer}></DrawerMenu>
    </Row>
  </>
    
  )
}

export default App
