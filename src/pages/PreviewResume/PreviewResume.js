import React from 'react';
import { Button, Container, Row, Col, ListGroup } from 'react-bootstrap';
import styles from "./PreviewResume.module.css";
import { useLocation } from 'react-router-dom';

const PreviewResume = ({ handleNavigation }) => {
    const { state } = useLocation();
    const data = state?.data;
    console.log(JSON.stringify(data))

    let data_ = {
        "firstName": 'RAVIKUMAR',
        "lastName": 'HIREMATH',
        "phoneNumber": "+91 97432 17925",
        "email": "ravikumar.h@glowtouch.com",
        "objective": "Experienced Service Delivery Professional with a strong background in Customer Support industry. Skilled in leading cross-functional teams, fostering client relationships, and implementing strategies to optimize service delivery and enhance customer satisfaction. Exceptional communicator with a focus on aligning business objectives with service delivery excellence.",
        "keySkills": ["Strong leadership and team management abilities",
            "Strategic thinker with a focus on continuous improvement",
            "Customer-centric approach to service delivery"],
        "professionalExperience": [
            {
                "company_name": "GlowTouch Technologies Pvt. Ltd (From Aug 2009 till date)",
                "work": [{
                    "designation": "Team Leader (Feb 2022 - Present)",
                    "work_details": [
                        "Working on ServiceNow, JIRA, Polaris, SalesForce, Pega Genesis Cloud, Tableau\, CSES",
                        "Creating and updating Release Incident Management using ServiceNow tool",
                        "Ensuring performance of services within agreed Service Level Agreements (SLAs) ",
                        "Experience with JIRA environments with ability to create JIRA workflow",
                    ]
                }]
            },
            {
                "company_name": "Technologies Pvt. Ltd (From Aug 2009 till date)",
                "work": [{
                    "designation": "Team Leader (Feb 2022 - Present)",
                    "work_details": [
                        "Working on ServiceNow, JIRA, Polaris, SalesForce, Pega Genesis Cloud, Tableau\, CSES",
                        "Creating and updating Release Incident Management using ServiceNow tool",
                        "Ensuring performance of services within agreed Service Level Agreements (SLAs) ",
                        "Experience with JIRA environments with ability to create JIRA workflow",
                    ]
                }]
            }
        ],
        "education": [
            "Bachelor of Science, from Kuvempu University (2008-2011)",
        ],
        "additionalQualifications": [
            "Hardware & Network Engineering Course in Goal Information Technology.",
            "PC Hardware, Basic Networking Certification.",
            "CCNA (Cisco Certified Network Associate).",
        ]
    }


    const printResume = (e) => {
        e.preventDefault()
        const contentToPrint = document.getElementById('content-to-print');
        const originalContents = document.body.innerHTML;
        document.body.innerHTML = contentToPrint.innerHTML;
        window.print();
        //document.body.innerHTML = originalContents;
        window.location.reload();
    }

    return (<div >
        <Container >
            <div id="content-to-print" >
                <Row className="mb-3" >
                    <Col  >
                        <h2>{data.firstName} {data.lastName}</h2>
                    </Col>
                    <Col xs="auto" style={{marginRight:"10px"}}>
                        <Row className="justify-content-end" >{data.phoneNumber}</Row>
                        <Row className="justify-content-end">{data.email}</Row>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <p>{data.objective}</p>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col>
                        <h5>Key Skills</h5>
                        <ul>
                            {data['keySkills'].map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <h5>Professional Experience</h5>

                        {data['professionalExperience'].map((experience, experienceIndex) => (
                            <div key={experienceIndex}>
                                <h6>{experience.company_name}</h6>

                                {experience.work.map((item, workIndex) => (
                                    <div key={workIndex}>
                                        <h6>{item.designation}</h6>
                                        <ul>
                                            {item.work_details.map((workDetail, workDetailIndex) => (
                                                <li key={workDetailIndex}>{workDetail}</li>))
                                            }
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <h5>Education</h5>
                        <ul>
                            {data["education"].map((item, index) => (
                                <li key={index}>{item}</li>))
                            }
                        </ul>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <h5>Additional Qualifications</h5>
                        <ul>
                            {data["additionalQualifications"].map((item, index) => (
                                <li key={index}>{item}</li>))
                            }
                        </ul>
                    </Col>
                </Row>
            </div>
            <Row className="mb-3 | justify-content-end" xs="auto">
                <Button variant="primary" onClick={(e) => printResume(e)} >
                    Print
                </Button>
            </Row>

        </Container>
    </div>)
}

export default PreviewResume