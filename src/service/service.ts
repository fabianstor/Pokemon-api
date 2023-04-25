import axios from "axios"

export const serviceUrl = async () => {
    const data = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=30`)
    return {
        result: data.data.results,
        next: data.data?.next
    }
}