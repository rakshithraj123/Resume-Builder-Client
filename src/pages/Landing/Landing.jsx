// css
import styles from './Landing.module.css'
import { Container, Row, Col, ListGroup, Card } from 'react-bootstrap'
import { useState, useEffect } from 'react';
import ResumeTemplate from '../../components/ResumeTemplate';
import {
  CREATE_RESUME_MENU, PREVIEW_RESUME_MENU
} from '../../constants'
import { useMediaQuery } from '@react-hook/media-query';

const Landing = ({ user, handleNavigation }) => {
  const [items, setItems] = useState([
    { "image": "/icons/resume_template_1.png", "name": "templete  1j" },
    { "image": "/icons/resume_template_1.png", "name": "templete  2" },
    { "image": "/icons/resume_template_1.png", "name": "templete  3" },
  ]);

  const handleTempleteSelected = (templete) => {
    console.log('handleTempleteSelected ***');
    handleNavigation(CREATE_RESUME_MENU)
  };


  const isSmallScreen = useMediaQuery('(max-width: 768px)');
  const [horizontalLayout, setHorizontalLayout] = useState(false);

  useEffect(() => {
    setHorizontalLayout(!isSmallScreen);
  }, [isSmallScreen]);

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
        {horizontalLayout ? (
          <Row>
            <Col>
              <ListGroup horizontal className="justify-content-sm-center">
                {items.map((item, index) => (
                  <ListGroup.Item key={index} style={{ margin: "20px", backgroundColor: "#700",width:'550px' }}>
                    <ResumeTemplate imagePath={item.image} name={item.name} onClick={() => handleTempleteSelected(item)} />
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Col>
          </Row>
        ) : (
          <Row>
            <Col>
              <ListGroup className="justify-content-sm-center">
                {items.map((item, index) => (
                  <ListGroup.Item key={index} style={{ margin: "20px", backgroundColor: "#700" ,width:'550px'}}>
                    <ResumeTemplate imagePath={item.image} name={item.name} onClick={() => handleTempleteSelected(item)} />
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Col>
          </Row>
        )}
      </Container>
    </div>
  )


}

export default Landing
