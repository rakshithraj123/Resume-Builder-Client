import React from 'react'
import { Container, Card, Form, Button, Row, Col } from 'react-bootstrap'
import styles from "./KeySkillsForm.module.css";

const KeySkillsForm = (props) => {
  return (
    <Form onSubmit={props.nextStep}>
      <Form.Label style={{ fontSize: '25px' }}><strong>Key Skills</strong></Form.Label>
      <br /><br />

      {
        props.keySkills.map((skill, index) => {
          return <div className="nestedContainer" key={index}>
            <Row>
              <Col >
                <Form.Group controlId={index} >
                  <Form.Control
                    placeholder="Enter Skill"
                    type="text"
                    name="skill"
                    value={skill}
                    onChange={(e) => props.handleKeySkillChange(e, index)}
                    required
                  />
                </Form.Group>
              </Col>
              <Col xs="auto">
                {
                  <Button variant="danger" 
                    onClick={(e) => props.removeKeySkills(e, index)}
                    disabled={(props.keySkills.length == 1)}>
                    Remove
                  </Button>

                }
                {
                  <Button variant="success" style={{ marginLeft: '10px' }}
                    onClick={(e) => props.addKeySkills()}
                    disabled={!(index == props.keySkills.length - 1 && props.keySkills.length < 10)} >
                    Add
                  </Button>
                }
              </Col>



            </Row>
            <br />

          </div>
        })

      }

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
      </Row>
    </Form>
  )
}

export default KeySkillsForm
