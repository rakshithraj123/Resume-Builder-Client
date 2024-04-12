import React from 'react';
import { Container, Row, Col, ListGroup } from 'react-bootstrap';
import styles from "./PreviewResume.module.css";

const PreviewResume = () => {

    let data = {
        "name": "RAVIKUMAR HIREMATH",
        "phoneNo": "+91 97432 17925",
        "email": "ravikumar.h@glowtouch.com",
        "objective": "Experienced Service Delivery Professional with a strong background in Customer Support industry. Skilled in leading cross-functional teams, fostering client relationships, and implementing strategies to optimize service delivery and enhance customer satisfaction. Exceptional communicator with a focus on aligning business objectives with service delivery excellence.",
        "Key Skills": ["Strong leadership and team management abilities",
            "Strategic thinker with a focus on continuous improvement",
            "Customer-centric approach to service delivery"],
        "Professional Experience": [
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
        "Education": [
            "Bachelor of Science, from Kuvempu University (2008-2011)",
        ],
        "Additional Qualifications": [
            "Hardware & Network Engineering Course in Goal Information Technology.",
            "PC Hardware, Basic Networking Certification.",
            "CCNA (Cisco Certified Network Associate).",
        ]
    }

    return (<div >
        <Container>
            <Row className="mb-3" >
                <Col md={8} >
                    <h2>{data.name}</h2>
                </Col>
                <Col md={4} >
                    <Row className="justify-content-end" >{data.phoneNo}</Row>
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
                        {data['Key Skills'].map((item, index) => (
                            <li>{item}</li>
                        ))}
                    </ul>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h5>Professional Experience</h5>

                    {data['Professional Experience'].map((experience, index) => (
                        <div>
                            <h6>{experience.company_name}</h6>

                            {experience.work.map((item, index) => (
                                <div>
                                    <h6>{item.designation}</h6>
                                    <ul>
                                        {item.work_details.map((workDetail, index) => (
                                            <li>{workDetail}</li>))
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
                        {data["Education"].map((item, index) => (
                            <li>{item}</li>))
                        }
                    </ul>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h5>Additional Qualifications</h5>
                    <ul>
                        {data["Additional Qualifications"].map((item, index) => (
                            <li>{item}</li>))
                        }
                    </ul>
                </Col>
            </Row>
        </Container>
    </div>)
}

export default PreviewResume