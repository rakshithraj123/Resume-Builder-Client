import React, { forwardRef } from 'react'
import { Container, Card, Form, Button, Row, Col } from 'react-bootstrap'
import styles from "./CreateResume.module.css";
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

const KeySkillsForm = forwardRef((props, ref) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Form submitted');
    // Add your form submission logic here
  };
  return (
    <>

      <div className="p-md-5 p-3">
        <h3 className="mb-0">Let’s pick your top skills</h3>
        <p className="small text-muted mb-5">Choose from our pre-written examples below or write your own.</p>
        <Form onSubmit={handleSubmit} ref={ref} >
      

          {
            props.keySkills.map((skill, index) => {
              return <div className="nestedContainer" key={index}>
                <Row>
                  <Col >
                    <Form.Group controlId={index}>
                    <FloatingLabel controlId="" label="Skill" className="mb-3">
                    <Form.Control
                        placeholder="Enter Skill"
                        type="text"
                        name="skill"
                        value={skill}
                        onChange={(e) => props.handleKeySkillChange(e, index)}
                        required
                      />
                        </FloatingLabel>
                      
                    </Form.Group>
                  </Col>
                  <Col xs="auto">
                    {/* {
                      <Button variant="danger" className={styles.removeButton}
                        onClick={(e) => props.removeKeySkills(e, index)}
                        disabled={(props.keySkills.length == 1)}>
                        Remove
                      </Button> */
                   <Button variant="outline-danger" size="lg"
                   onClick={(e) => props.removeKeySkills(e, index)}
                        disabled={(props.keySkills.length == 1)}
                   ><i class="bi bi-trash"></i></Button>
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
            Next
          </Button>
        </Col>
      </Row> */}
        </Form>

        <div className="py-4">
                    <Button variant="link"
                     disabled={!(props.keySkills.length < 10)}
                    onClick={(e) => props.addKeySkills()}>
                      + Add more Skill</Button>
        </div>



      </div>
    </>


  )
});

export default KeySkillsForm
