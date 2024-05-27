import React, { forwardRef } from 'react'
import { Container, Card, Form, Button, Row, Col } from 'react-bootstrap'
import styles from "./CreateResume.module.css";
import FloatingLabel from 'react-bootstrap/FloatingLabel';

const AdditionalQualificationsForm = forwardRef((props, ref)  => {
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Form submitted');
    // Add your form submission logic here
  };
  return (
    <>
      <div className="p-md-5 p-3">
        <h3 className="mb-0">Add Additional Qualifications</h3>
        <p className="small text-muted mb-5">This is an opportunity to highlight qualifications that don't fit into standard resume sections.</p>

        <Form ref={ref} onSubmit={handleSubmit} >

         
          {
            props.additionalQualifications.map((additionalQualifications, index) => {
              return <div className="nestedContainer" key={index}>
                <Row>
                  <Col >
                    <Form.Group controlId={index} >
                    <FloatingLabel controlId="" label="Additional Qualifications" className="mb-3">
                      <Form.Control
                        placeholder="Enter Additional Qualifications"
                        type="text"
                        name="additionalQualifications"
                        value={additionalQualifications}
                        onChange={(e) => props.handleAdditionalQualificationsChange(e, index)}
                        required
                      />
                      </FloatingLabel>
                    </Form.Group>
                  </Col>
                  <Col xs="auto">
                    {
                      <Button ariant="outline-danger" size="lg" className={styles.removeButton}
                        onClick={(e) => props.removeAdditionalQualifications(e, index)}
                        disabled={(props.additionalQualifications.length == 1)}>
                        <i class="bi bi-trash"></i>
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
        <div className="py-4">
                    <Button variant="link"
                     disabled={!(props.additionalQualifications.length < 10)}
                    onClick={(e) => props.addAdditionalQualifications()}>
                      + Add more Additional Qualifications</Button>
                      </div>
      </div>
    </>

  )
});

export default AdditionalQualificationsForm
