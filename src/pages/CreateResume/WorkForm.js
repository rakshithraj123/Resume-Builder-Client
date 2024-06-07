import React from 'react'
import { Container, Card, Form, Button, Row, Col } from 'react-bootstrap'
import styles from "./CreateResume.module.css";
import FloatingLabel from 'react-bootstrap/FloatingLabel';

const WorkForm = (props) => {
    return (
        <div>
            <Col className={styles.workForm} >
                <Row>
                    <Col>
                        <Form.Group controlId={props.workIndex} >
                            <FloatingLabel controlId="" label="Designation" className="mb-3">
                                <Form.Control
                                    placeholder="Enter Designation"
                                    type="text"
                                    name="designation"
                                    value={props.work.designation}
                                    onChange={(e) => props.handleDesignationChange(e, props.index, props.workIndex)}
                                    required
                                />
                            </FloatingLabel>
                        </Form.Group>
                    </Col>
                    <Form.Group as={Col} md="auto" controlId="" className="mb-3">
                        <Button variant="primary" size="lg"
                           disabled={props.addWorkDisabled}
                           onClick={(e) => props.addWork(props.index)}>
                              <i class="bi bi-plus-lg"></i></Button>{' '}
                        <Button variant="outline-danger" size="lg"
                            onClick={(e) => props.removeWork(e, props.index, props.workIndex)}
                            disabled={props.removeWorkDisabled}>
                            <i class="bi bi-trash"></i>
                        </Button>
                    </Form.Group>
                </Row>

                <br />
                {
                    props.work.work_details.map((workDetail, workDetailIndex) => {
                        return  <Col xs={11}>
                              <Row className="mb-3 md-3 me-5 align-items-center" >
                            <Form.Group as={Col} controlId={workDetailIndex}>
                                <FloatingLabel controlId="" label="Work Detail" className="mb-3">
                                    <Form.Control type="text" placeholder=" " value={workDetail}
                                        onChange={(e) => props.handleWorkDetailChange(e, props.index, props.workIndex, workDetailIndex)}
                                        required
                                    />
                                </FloatingLabel>
                            </Form.Group>
                            <Form.Group as={Col} md="auto" controlId="" className="mb-3">
                                
                                <Button variant="outline-danger" size="lg"
                                    onClick={(e) => props.removeWorkDetails(e, props.index, props.workIndex, props.workDetailIndex)}
                                    disabled={(props.work.work_details.length == 1)}

                                ><i class="bi bi-trash"></i></Button>
                            </Form.Group>
                        </Row>   
                        </Col>                                           
                    })
                    
                }
                   <div style={{ marginTop: '-10px' }}>
                    <Button variant="link"
                        onClick={(e) => props.addWorkDetails(props.index, props.workIndex)}
                        disabled={!(props.work.work_details.length < 10)} >
                    
                        + Add more Work details</Button>
                </div>

            </Col>


        </div>)
}

export default WorkForm
