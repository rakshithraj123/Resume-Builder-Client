import React from "react";
import { Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import resume1 from '../../assets/img/resume1.jpg';
import resume2 from '../../assets/img/resume2.jpg';
import resume3 from '../../assets/img/resume3.jpg';
import currentresume from '../../assets/img/resume3.jpg';
import { CREATE_RESUME_MENU } from "../../constants";
import styles from "./Landing.module.css";

function Landing({ user, handleNavigation }) {

  const createResume = (e) => {
    e.preventDefault();
    handleNavigation(CREATE_RESUME_MENU)
  }

  return (
    <>
      {/* <div className={`p-md-5 pt-5 p-3 bg-primary ${styles.minVh} text-center align-items-center d-flex`} > */}
      <div className={`p-md-5 pt-5 p-3 bg-primary text-center align-items-center d-flex`} >
        <Container style={{ height: "calc(100vh - 137px)", overflow:'auto', scrollbarWidth:'none' }}>
          <Row style={{marginTop: "calc(100vh - 60%)"}}>
            <Col>
              <Stack gap={3} className="py-5">
                <h1 class="display-3 fw-bold text-white">Free <span className="text-gradiant">Resume Builder</span> - Generate your resume online.</h1>
                <p class="fs-4 text-white">Build beautiful, recruiter-tested resumes in a few clicks! Our resume builder is powerful and easy to use, with a range of amazing functions.</p>
                <div>
                  <Button variant="light" size="lg" as={Link} to="/create" className="py-3" onClick={(e)=>createResume(e)}>Create Resume Now</Button>
                </div>
              </Stack>
            </Col>
          </Row>
        </Container>
      </div>
      

    </>
  )
}

export default Landing





// css
// import styles from './Landing.module.css'
// import { Container, Row, Col, ListGroup, Card } from 'react-bootstrap'
// import { useState, useEffect } from 'react';
// import ResumeTemplate from '../../components/ResumeTemplate';
// import {
//   CREATE_RESUME_MENU, PREVIEW_RESUME_MENU
// } from '../../constants'
// import { useMediaQuery } from '@react-hook/media-query';

// const Landing = ({ user, handleNavigation }) => {
//   const [items, setItems] = useState([
//     { "image": "/icons/resume_template_1.png", "name": "templete  1j" },
//     { "image": "/icons/resume_template_1.png", "name": "templete  2" },
//     { "image": "/icons/resume_template_1.png", "name": "templete  3" },
//   ]);

//   const handleTempleteSelected = (templete) => {
//     console.log('handleTempleteSelected ***');
//     handleNavigation(CREATE_RESUME_MENU)
//   };


//   const isSmallScreen = useMediaQuery('(max-width: 768px)');
//   const [horizontalLayout, setHorizontalLayout] = useState(false);

//   useEffect(() => {
//     setHorizontalLayout(!isSmallScreen);
//   }, [isSmallScreen]);

//   return (

//     <div >
//       <Container >

//         {/* <Row className="justify-content-md-center" xs="auto">
//           <Col style={{ backgroundColor: '#bb0' }}>1 of 3</Col>
//           <Col tyle={{ backgroundColor: '#ff0' }}>2 of 3</Col>
//           <Col style={{ backgroundColor: '#f0f' }} >3 of 3</Col>
//         </Row> */}
//         <Card.Text style={{ textAlign: 'center' }} className="d-flex justify-content-center">
//           Select your templete
//         </Card.Text>
//         {horizontalLayout ? (
//           <Row>
//             <Col>
//               <ListGroup horizontal className="justify-content-sm-center">
//                 {items.map((item, index) => (
//                   <ListGroup.Item key={index} style={{ margin: "20px", backgroundColor: "#700",width:'550px' }}>
//                     <ResumeTemplate imagePath={item.image} name={item.name} onClick={() => handleTempleteSelected(item)} />
//                   </ListGroup.Item>
//                 ))}
//               </ListGroup>
//             </Col>
//           </Row>
//         ) : (
//           <Row>
//             <Col>
//               <ListGroup className="justify-content-sm-center">
//                 {items.map((item, index) => (
//                   <ListGroup.Item key={index} style={{ margin: "20px", backgroundColor: "#700" ,width:'550px'}}>
//                     <ResumeTemplate imagePath={item.image} name={item.name} onClick={() => handleTempleteSelected(item)} />
//                   </ListGroup.Item>
//                 ))}
//               </ListGroup>
//             </Col>
//           </Row>
//         )}
//       </Container>
//     </div>
//   )


// }

// export default Landing
