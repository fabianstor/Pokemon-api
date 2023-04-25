import axios from "axios"
import { useEffect, useState } from "react"
export const useLocalizationPokemonFetch = (url: string) => {
    const [localization, setLocalization] = useState([])
    const searchLocalization = async () => {
        const response = await axios.get(url)
        const locationInfo = response.data.map((data: {location_area: string}) => data.location_area)
        setLocalization(locationInfo.map((data: {name: string}) => data.name))
    }
    useEffect(() => {
        if(url != ''){
            searchLocalization()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [url])
    return {localization}
}

export default useLocalizationPokemonFetch