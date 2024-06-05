import React, { forwardRef } from 'react'
import { Container, Card, Form, Button, Row, Col } from 'react-bootstrap'
import WorkForm from './WorkForm'
import styles from "./CreateResume.module.css";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import DateRangePicker from '../../components/DateRangePicker';

const ExperienceForm = forwardRef((props, ref)  => {
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Form submitted');
        // Add your form submission logic here
      };
    return (
<>
            <div className="p-md-5 p-3">
                <h3 className="mb-0">Let’s work on your experience</h3>
                <p className="small text-muted mb-5">Start with your most recent job first.</p>

                <Form ref={ref} onSubmit={handleSubmit}>


                    {
                        props.professionalExperience.map((experience, index) => {

                            const handleDateChange = (event) => {
                               props.handleCompanyDateChangeChange(event, index)
                              };
                            return <div className="nestedContainer" key={index}>
                                <Row>
                                    <Col >

                                        <Row className="mb-md-3">
                                           
                                            <Form.Group as={Col} md={12} controlId={index}>
                                                <FloatingLabel controlId="" label="Company Name" className="mb-3">
                                                    <Form.Control
                                                        placeholder="Enter Company Name"
                                                        type="text"
                                                        name="company_name"
                                                        value={experience.company_name}
                                                        onChange={(e) => props.handleCompanyNameChange(e, index)}
                                                        required
                                                    />
                                                </FloatingLabel>
                                            </Form.Group>
                                            <DateRangePicker as={Col}  md={6}
                                             handleDateChange={handleDateChange}
                                             startDate={experience.startDate}
                                             endDate={experience.endDate}
                                             present={experience.present}
                                             />
                                        </Row>

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
                                            <Button variant="outline-danger" size="lg"
                                                onClick={(e) => props.removeExperience(e, index)}
                                                disabled={(props.professionalExperience.length == 1)}>
                                                <i class="bi bi-trash"></i>
                                            </Button>

                                        }
                                    </Col>

                                </Row>


                                {((props.professionalExperience.length > 1) && <hr className={styles.my_custom_divider} />)}



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

                <div className="py-2">
                    <Button variant="link"
                        disabled={!(props.professionalExperience.length < 10)}
                        onClick={(e) => props.addExperience()}>
                        + Add more Compamy</Button>
                </div>
            </div>
        </>









        
    )
});

export default ExperienceForm
