import { IPropsProvider } from './interface.interface'
import { useState } from 'react'
import { filterContext } from '../../constants/constants'

const FilterProvider = (props: IPropsProvider) => {
    const [filterType, setFilterType] = useState<string[]>([])
    return (
      <div>
      <filterContext.Provider value={{filterType, setFilterType}}>
        {props.children}
      </filterContext.Provider>
      </div>
    )
}
export default FilterProvider