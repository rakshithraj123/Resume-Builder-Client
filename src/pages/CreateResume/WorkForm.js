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
                    <Col xs="auto">
                        <Button variant="outline-danger" size="lg"
                            onClick={(e) => props.removeWork(e, props.index, props.workIndex)}
                            disabled={props.removeWorkDisabled}>
                            <i class="bi bi-trash"></i>
                        </Button>
                    </Col>

                </Row>

                <br />
                {
                    props.work.work_details.map((workDetail, workDetailIndex) => {
                        return <Row className="mb-3 md-3 me-5 align-items-center">
                            <Form.Group as={Col} controlId={workDetailIndex}>
                                <FloatingLabel controlId="" label="Work Detail" className="mb-3">
                                    <Form.Control type="text" placeholder=" " value={workDetail}
                                        onChange={(e) => props.handleWorkDetailChange(e, props.index, props.workIndex, workDetailIndex)}
                                        required
                                    />
                                </FloatingLabel>
                            </Form.Group>
                            <Form.Group as={Col} md="auto" controlId="" className="mb-3">
                                <Button variant="primary" size="lg"
                                    onClick={(e) => props.addWorkDetails(props.index, props.workIndex)}
                                    disabled={!(workDetailIndex == props.work.work_details.length - 1 && props.work.work_details.length < 10)} >
                                    <i class="bi bi-plus-lg"></i></Button>{' '}
                                <Button variant="outline-danger" size="lg"
                                    onClick={(e) => props.removeWorkDetails(e, props.index, props.workIndex, props.workDetailIndex)}
                                    disabled={(props.work.work_details.length == 1)}

                                ><i class="bi bi-trash"></i></Button>
                            </Form.Group>
                        </Row>




                        // return <Row style={{ padding: "10px" }} key={workDetailIndex}>
                        //     <Col xs={12} sm={11} md={10} lg={10} offset={2}>
                        //         <Form.Group controlId={workDetailIndex} >
                        //             <Form.Control
                        //                 placeholder="Enter Work Detail"
                        //                 type="text"
                        //                 name="workDetail"
                        //                 value={workDetail}
                        //                 onChange={(e) => props.handleWorkDetailChange(e, props.index, props.workIndex, workDetailIndex)}
                        //                 required

                        //             />
                        //         </Form.Group>
                        //     </Col>
                        //     <Col xs="auto" className="mt-2 mt-sm-2 mt-md-2 mt-lg-2 mt-xl-2 mt-xxl-0">
                        //         {
                        //             <Button variant="danger"
                        //                 onClick={(e) => props.removeWorkDetails(e, props.index, props.workIndex, props.workDetailIndex)}
                        //                 disabled={(props.work.work_details.length == 1)}>
                        //                 Remove
                        //             </Button>

                        //         }
                        //         {
                        //             <Button variant="success" style={{ marginLeft: '10px' }}
                        //                 onClick={(e) => props.addWorkDetails(props.index, props.workIndex)}
                        //                 disabled={!(workDetailIndex == props.work.work_details.length - 1 && props.work.work_details.length < 10)} >
                        //                 Add
                        //             </Button>
                        //         }
                        //     </Col>
                        // </Row>



                    })
                }


                <div style={{ marginTop: '-10px' }}>
                    <Button variant="link"
                        disabled={props.addWorkDisabled}
                        onClick={(e) => props.addWork(props.index)}>
                        + Add more Designation</Button>
                </div>
            </Col>


        </div>)
}

export default WorkForm
