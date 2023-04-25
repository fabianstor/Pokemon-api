import axios from "axios"
import { useState, useEffect } from 'react'
import { IPokemon, IResponseData } from "../components/card/interfaces.interface"
import whoItsPokemon from '../assets/img/imageDefault.png'
import { initialState } from "../utils/constants"
export const usePokemonFetch = (url: string) => {
  const [infoPokemon, setinfoPokemon] = useState<IPokemon>(initialState)
  const [loading, setLoading] = useState(false)

  const fetchPokemon = async () => {
    setLoading(true)
    const response = await axios.get<IResponseData>(url)
    const {abilities, height, weight, sprites, types, stats, location_area_encounters } = response.data
    setinfoPokemon({
        abilities: abilities.map((ability) => ability.ability.name),
        height, 
        weight, 
        sprites: sprites.other?.dream_world.front_default ? sprites.other?.dream_world.front_default : sprites?.front_default || whoItsPokemon,
        types: types.map((type) => type.type.name),
        stats: stats.map((stat) => {
          return {
            baseStat: stat.base_stat,
            name: stat.stat.name
          }
        }),
        localization: location_area_encounters
    })
    setLoading(false)
  }

  useEffect(() => {
    fetchPokemon()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  return {infoPokemon, loading}
}
