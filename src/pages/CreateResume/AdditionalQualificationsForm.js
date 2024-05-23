import React from 'react'
import { Container, Card, Form, Button, Row, Col } from 'react-bootstrap'
import styles from "./CreateResume.module.css";

const AdditionalQualificationsForm = (props) => {
  return (
    <Form  onSubmit={props.handleSubmit}>

      <Form.Label style={{ fontSize: '25px' }}><strong>Additional Qualifications</strong></Form.Label>
      <br /><br />
      {
        props.additionalQualifications.map((additionalQualifications, index) => {
          return <div className="nestedContainer" key={index}>
            <Row>
              <Col >
                <Form.Group controlId={index} >
                  <Form.Control
                   placeholder="Enter Additional Qualifications"
                    type="text"
                    name="additionalQualifications"
                    value={additionalQualifications}
                    onChange={(e) => props.handleAdditionalQualificationsChange(e, index)}
                    required
                  />
                </Form.Group>
              </Col>
              <Col xs="auto">
              {
                  <Button variant="danger" className={styles.removeButton} 
                    onClick={(e) => props.removeAdditionalQualifications(e, index)}
                    disabled={(props.additionalQualifications.length == 1)}>
                    Remove
                  </Button>

                }
                {
                  <Button variant="success" className={styles.addButton} 
                    onClick={(e) =>  props.addAdditionalQualifications() }
                    disabled={!(index == props.additionalQualifications.length - 1 && props.additionalQualifications.length < 10)} >
                    Add
                  </Button>
                }

              </Col>



            </Row>
            <br />

          </div>
        })

      }

      {/* <Row className="justify-content-between">
        <Col xs="auto">
          <Button variant="primary" onClick={props.prevStep} >
            Previous
          </Button>
        </Col>
        <Col xs="auto">
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Col>
      </Row> */}
    </Form>
  )
}

export default AdditionalQualificationsForm
