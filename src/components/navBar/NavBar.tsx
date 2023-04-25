import { Col, Row, Tag } from "antd"
import { typeColor } from "../../utils/constants"
import { filterContext } from "../../constants/constants"
import { useContext } from 'react'
import './index.css'
function NavBar() {
    const {filterType} = useContext(filterContext)
  return (
    <Row className="row-navBar">
    <Col className="col-navBar">
      {filterType.map((type)=>(<Tag className='tag-type' color={typeColor[type]} >{type}</Tag>))}
    </Col>
  </Row>
  )
}

export default NavBar