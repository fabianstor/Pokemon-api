import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    PieController,
    ArcElement,
  } from 'chart.js'
  import { Pie } from 'react-chartjs-2'
  import { IPropsChart } from '../chart/interface.interface'
import { typeColor } from '../../utils/constants'
import {useContext} from 'react'
import { filterContext } from '../../constants/constants'
import type { ChartEvent, ActiveElement } from 'chart.js'
  
  function ChartPie(props: IPropsChart) {
    const {setFilterType} = useContext(filterContext)

    ChartJS.register(
      Title,
      Tooltip,
      Legend,
      PieController,
      ArcElement,
    )

    const handleBarClick = (_e: ChartEvent, elements: ActiveElement[]) => {
      setFilterType((prev: string[]) => ([...prev, labels[elements[0].index]]))
    }
  
    const options = {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: 'Distribution of Pokemon Types',
        },
        legend: {
          position: 'bottom' as const,
        }
      },
      onclick: handleBarClick
    }
  
    const labels = props.pokemonsDetails
    .map(item => item.types)
    .reduce((accumulator, current) => accumulator.concat(current), [])
    .filter((item, index, array) => array.indexOf(item) === index)

  
    const data = {
      labels,
      datasets: [
        {
          label: 'Distribution of Pokemon types',
          data: labels.map((label) => {
            const count: { [key: string]: number } = {}
            props.pokemonsDetails.forEach((pokemon) => {
              pokemon.types.forEach((type) => {
                count[type] = count[type] ? count[type] + 1 : 1
              })
            })
            return count[label]
          }),
          backgroundColor: labels.map((type) => typeColor[type])
        },
      ],
    }
  
    return <Pie style={{marginTop:100}} options={options} data={data} />
  }
  
  export default ChartPie
  