import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import type { ChartEvent, ActiveElement } from 'chart.js'
import { Bar } from 'react-chartjs-2'
import { IPropsChart } from './interface.interface'
import { typeColor } from '../../utils/constants'
import { useContext } from 'react'
import { filterContext } from '../../constants/constants'

function Chart(props: IPropsChart) {
  const { setFilterType } = useContext(filterContext)

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  )

  const handleBarClick = (_e: ChartEvent, elements: ActiveElement[]) => {
    setFilterType((prev: string[]) => {
      const clickedLabel = labels[elements[0]?.index]
      if (prev?.includes(clickedLabel)) {
        return prev
      }
      return [...prev, clickedLabel]
    })
  }


  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'POKEMON',
      },
    },
    onClick: handleBarClick
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
        backgroundColor: labels.map((type) => typeColor[type]),
      }
    ],
  }

  return <Bar options={options} data={data} />
}

export default Chart