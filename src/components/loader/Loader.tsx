import { Image } from 'antd'
import Pokeball from '../../assets/img/Pokemon.png'
import './index.css'
function Loader() {
  return (
    <div className='container-image'>
        <Image src={Pokeball} preview={false}></Image>
    </div>
  )
}

export default Loader