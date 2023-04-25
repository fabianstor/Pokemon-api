import {Drawer} from 'antd'
import { IPropDrawer } from './interface.interface'
import Chart from '../chart/Chart'
import ChartPie from '../chartPie/ChartPie'
function DrawerMenu(props: IPropDrawer) {
  return (
    <Drawer className='drawer' open={props.show} size='large' placement='left' closable={false} onClose={() => props.showDrawer()}>
      <Chart pokemonsDetails={props.pokemonsDetails}/>
      <ChartPie pokemonsDetails={props.pokemonsDetails}></ChartPie>
    </Drawer>
  )
}

export default DrawerMenu