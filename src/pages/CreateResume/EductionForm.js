import React, { forwardRef } from 'react'
import { Container, Card, Form, Button, Row, Col } from 'react-bootstrap'
import styles from "./CreateResume.module.css";
import FloatingLabel from 'react-bootstrap/FloatingLabel';

const EductionForm = forwardRef((props, ref)  => {
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Form submitted');
    // Add your form submission logic here
  };
  return (
    <>

      <div className="p-md-5 p-3">
        <h3 className="mb-0">Tell us about your education</h3>
        <p className="small text-muted mb-5">Tell us about any colleges, vocational programs, or training courses you took. </p>

        <Form ref={ref} onSubmit={handleSubmit}>


          {
            props.education.map((education, index) => {
              return <div className="nestedContainer" key={index}>
                <Row>
                  <Col >
                    <Form.Group controlId={index} >
                    <FloatingLabel controlId="" label="Education" className="mb-3">
                      <Form.Control
                        type="text"
                        name="education"
                        value={education}
                        placeholder="Enter Education"
                        onChange={(e) => props.handleEducationChange(e, index)}
                        required
                      />
                       </FloatingLabel>
                    </Form.Group>
                    
                  </Col>
                  <Col xs="auto">

                    {
                      <Button variant="outline-danger" size="lg"
                        onClick={(e) => props.removeEducation(e, index)}
                        disabled={(props.education.length == 1)}>
                        <i class="bi bi-trash"></i>
                      </Button>

                    }
                  


                  </Col>



                </Row>
                <br />

              </div>
            })

          }

           <div style={{ marginTop: '-15px' }}>
                    <Button variant="link"
                  onClick={(e) => props.addEducation()}
                  disabled={!(props.education.length < 10)} >
                    
                      + Add more Education</Button>
        </div>
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

      </div>
    </>











  )
});

export default EductionForm
