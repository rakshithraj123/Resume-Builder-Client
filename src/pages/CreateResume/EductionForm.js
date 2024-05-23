import React from 'react'
import { Container, Card, Form, Button, Row, Col } from 'react-bootstrap'
import styles from "./CreateResume.module.css";

const EductionForm = (props) => {
  return (
    <Form onSubmit={props.nextStep}>
 <Form.Label style={{ fontSize: '25px' }}><strong>Education</strong></Form.Label>
      <br /><br />
  
      {
        props.education.map((education, index) => {
          return <div className="nestedContainer" key={index}>
            <Row>
              <Col >
                <Form.Group controlId={index} >
                  <Form.Control
                    type="text"
                    name="education"
                    value={education}
                    placeholder="Enter Education"
                    onChange={(e) => props.handleEducationChange(e, index)}
                    required
                  />
                </Form.Group>
              </Col>
              <Col xs="auto">

                {
                  <Button variant="danger" className={styles.removeButton} 
                    onClick={(e) => props.removeEducation(e, index)}
                    disabled={(props.education.length == 1)}>
                    Remove
                  </Button>

                }
                {
                  <Button variant="success" className={styles.addButton} 
                    onClick={(e) =>  props.addEducation() }
                    disabled={!(index == props.education.length - 1 && props.education.length < 10)} >
                    Add
                  </Button>
                }


              </Col>



            </Row>
            <br />

          </div>
        })

      }
{/* 
      <Row className="justify-content-between">
        <Col xs="auto">
          <Button variant="primary" onClick={props.prevStep} >
            Previous
          </Button>
        </Col>
        <Col xs="auto">
          <Button variant="primary" type="submit">
            Next
          </Button>
        </Col>
      </Row> */}
    </Form>
  )
}

export default EductionForm
