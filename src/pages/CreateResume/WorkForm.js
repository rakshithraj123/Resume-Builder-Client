import React from 'react'
import { Container, Card, Form, Button, Row, Col } from 'react-bootstrap'

const WorkForm = (props) => {
    return (
        <Col style={{ backgroundColor: '#3aa48a', padding: "10px", marginBottom: "30px" }} >
            <Form.Group controlId={props.workIndex} >
                <Form.Control
                    placeholder="Enter Designation"
                    type="text"
                    name="designation"
                    value={props.work.designation}
                    onChange={(e) => props.handleDesignationChange(e, props.index, props.workIndex)}
                    required
                />
            </Form.Group>
            <br />
            {
                props.work.work_details.map((workDetail, workDetailIndex) => {
                    return <Row style={{ padding: "10px" }} key={workDetailIndex}>
                        <Col >
                            <Form.Group controlId={workDetailIndex} >
                                <Form.Control
                                    placeholder="Enter Work Detail"
                                    type="text"
                                    name="workDetail"
                                    value={workDetail}
                                    onChange={(e) => props.handleWorkDetailChange(e, props.index, props.workIndex, workDetailIndex)}
                                    required
                                    
                                />
                            </Form.Group>
                        </Col>
                        <Col xs="auto">
                            {
                                <Button variant="danger"
                                    onClick={(e) => props.removeWorkDetails(e,props.index, props.workIndex, props.workDetailIndex)}
                                    disabled={(props.work.work_details.length == 1)}>
                                    Remove
                                </Button>

                            }
                            {
                                <Button variant="success" style={{ marginLeft: '10px' }}
                                 onClick={(e) => props.addWorkDetails(props.index, props.workIndex)}
                                    disabled={!(workDetailIndex == props.work.work_details.length - 1 && props.work.work_details.length < 10)} >
                                    Add
                                </Button>
                            }
                        </Col>
                    </Row>



                })
            }

            {
                <Row className="justify-content-center">
                    <Col xs="auto">
                        {
                            <Button variant="primary" onClick={(e) => props.removeWork(e, props.index, props.workIndex)}
                                disabled={props.removeWorkDisabled}>
                                Remove
                            </Button>
                        }
                    </Col>
                    <Col xs="auto">
                        {
                            <Button variant="primary" onClick={(e) => props.addWork(props.index)}
                                disabled={props.addWorkDisabled}>
                                Add
                            </Button>
                        }
                    </Col>
                </Row>

            }

        </Col>)
}

export default WorkForm
