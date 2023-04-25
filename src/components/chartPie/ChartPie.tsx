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
  
  function ChartPie(props: IPropsChart) {

    ChartJS.register(
      Title,
      Tooltip,
      Legend,
      PieController,
      ArcElement,
    )
  
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
      }
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
  