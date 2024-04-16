import React from 'react'
import { Container, Card, Form, Button, Row, Col } from 'react-bootstrap'
import WorkForm from './WorkForm'

const ExperienceForm = (props) => {
    return (
        <Form onSubmit={props.nextStep}>
            <Form.Label style={{ fontSize: '25px' }}><strong>Professional Experience</strong></Form.Label>
            <br /><br />

            {
                props.professionalExperience.map((experience, index) => {
                    return <div className="nestedContainer" key={index}>
                        <Row>
                            <Col >
                                <Form.Group controlId={index} >
                                    <Form.Control
                                        placeholder="Enter Company Name"
                                        type="text"
                                        name="company_name"
                                        value={experience.company_name}
                                        onChange={(e) => props.handleCompanyNameChange(e, index)}
                                        required
                                    />
                                </Form.Group>
                                <br />
                                {
                                    experience.work.map((work, workIndex) => {
                                        return <WorkForm key={workIndex}
                                            handleDesignationChange={props.handleDesignationChange}
                                            handleWorkDetailChange={props.handleWorkDetailChange}
                                            work={work}
                                            workIndex={workIndex}
                                            removeWork={props.removeWork}
                                            addWork={props.addWork}
                                            index={index}
                                            removeWorkDisabled={(experience.work.length == 1)}
                                            addWorkDisabled={!(workIndex == experience.work.length - 1 && experience.work.length < 10)}
                                            removeWorkDetails={props.removeWorkDetails}
                                            addWorkDetails={props.addWorkDetails}

                                        />
                                    })
                                }


                            </Col>
                            <Col xs="auto">
                                {
                                    <Button variant="danger"
                                        onClick={(e) => props.removeExperience(e, index)}
                                        disabled={(props.professionalExperience.length == 1)}>
                                        Remove
                                    </Button>

                                }
                                {
                                    <Button variant="success" style={{ marginLeft: '10px' }}
                                        onClick={(e) => props.addExperience()}
                                        disabled={!(index == props.professionalExperience.length - 1 && props.professionalExperience.length < 10)} >
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
            
            <br />
        </Form>
    )
}

export default ExperienceForm
