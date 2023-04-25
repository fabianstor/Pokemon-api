import { Image, Modal, Progress, Row, Col, Typography } from 'antd'
import { IPropsPopup } from './interface.interface'
import { statColor } from '../../utils/constants'
import './index.css'
function Popup(props: IPropsPopup) {
    return (
        <Modal className='card-popup' open={props.show} onOk={props.handleShow}
            onCancel={props.handleShow} cancelButtonProps={{ style: { display: 'none' } }}>
            <Row className='row-localization'>
                <Col className='col-image-localization'>
                    <Image
                        width={115}
                        height={100}
                        src={props.image}
                        preview={false}
                    />
                </Col>
                <Col>
                    <Typography style={{fontWeight: 'bold'}}>Localization</Typography>
                    <Col className='col-localization'>
                        {props.localization.map((data) => {
                            return <Typography className='typo-localization'>{data}</Typography>
                        })}
                    </Col>
                </Col>
            </Row>
            {props.stats.map((stat) => {
                return (
                    <Row>
                        <Typography>{stat.name}</Typography>
                        <Progress key={stat.name} percent={stat.baseStat} format={percent => percent} strokeColor={statColor[stat.name]}></Progress>
                    </Row>)
            })}
        </Modal>
    )
}

export default Popup