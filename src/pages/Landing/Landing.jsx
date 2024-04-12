// css
import styles from './Landing.module.css'
import { Container, Row, Col, ListGroup, Card } from 'react-bootstrap'
import { useState } from 'react';
import ResumeTemplate  from '../../components/ResumeTemplate';
import {
  CREATE_RESUME_MENU ,PREVIEW_RESUME_MENU
} from '../../constants'

const Landing = ({ user,handleNavigation }) => {
  const [items, setItems] = useState([
    {"image":"/assets/icons/logo512.png","name":"templete  1j"},
    {"image":"/assets/icons/logo512.png","name":"templete  2"},
    {"image":"/assets/icons/logo512.png","name":"templete  3"},
    ]);

    const handleTempleteSelected = (templete) => {
      console.log('handleTempleteSelected ***');
      handleNavigation(CREATE_RESUME_MENU)
    };

  return (

    <div >
      <Container >

        {/* <Row className="justify-content-md-center" xs="auto">
          <Col style={{ backgroundColor: '#bb0' }}>1 of 3</Col>
          <Col tyle={{ backgroundColor: '#ff0' }}>2 of 3</Col>
          <Col style={{ backgroundColor: '#f0f' }} >3 of 3</Col>
        </Row> */}
        <Card.Text style={{ textAlign: 'center' }} className="d-flex justify-content-center">
          Select your templete
        </Card.Text>
        <ListGroup className="justify-content-sm-center" horizontal>
          {items.map((item, index) => (
            <ListGroup.Item key={index} style={{margin:"20px",backgroundColor:"#700"}}>
              <ResumeTemplate  imagePath={item.image} name={item.name} onClick={() => handleTempleteSelected(item)}/>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Container>
    </div>
  )


}

export default Landing
