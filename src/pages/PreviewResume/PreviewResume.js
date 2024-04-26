import React, { useEffect, useState } from "react";
import {
  Button,
  Container,
  Row,
  Col,
  ListGroup,
  Spinner,
} from "react-bootstrap";
import styles from "./PreviewResume.module.css";
import { useLocation } from "react-router-dom";
import { resumeAddService } from "../../services/resumeAdd.service";
import { toast } from "react-toastify";

const PreviewResume = ({ handleNavigation }) => {
  const { state } = useLocation();
  const resumeId = state?.resumeId;
  const [resumeData, setResumeData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await resumeAddService.fetch(resumeId);
        console.log(response);

        if (response.status) {
          setResumeData(response.data.Resume.content);
        } else {
          toast("Fail to fetch resume");
        }
      } catch (error) {
        console.error("Error:", error);
        // Handle error
      }
    };
    fetchData();
  }, []);

  const printResume = (e) => {
    e.preventDefault();
    const contentToPrint = document.getElementById("content-to-print");
    const originalContents = document.body.innerHTML;
    document.body.innerHTML = contentToPrint.innerHTML;
    window.print();
    //document.body.innerHTML = originalContents;
    window.location.reload();
  };

  return (
    <div>
      <Container>
        {Object.keys(resumeData).length === 0 ? (
          <div class="text-center">
            <div class="spinner-border" role="status">
              <span class="sr-only"></span>
            </div>
          </div>
        ) : (
          <div id="content-to-print">
            <Row className="mb-3">
              <Col>
                <h2>
                  {resumeData.firstName} {resumeData.lastName}
                </h2>
              </Col>
              <Col xs="auto" style={{ marginRight: "10px" }}>
                <Row className="justify-content-end">
                  {resumeData.phoneNumber}
                </Row>
                <Row className="justify-content-end">{resumeData.email}</Row>
              </Col>
            </Row>
            <Row>
              <Col>
                <p>{resumeData.objective}</p>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col>
                <h5>Key Skills</h5>
                <ul>
                  {resumeData["keySkills"].map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </Col>
            </Row>
            <Row>
              <Col>
                <h5>Professional Experience</h5>

                {resumeData["professionalExperience"].map(
                  (experience, experienceIndex) => (
                    <div key={experienceIndex}>
                      <h6>{experience.company_name}</h6>

                      {experience.work.map((item, workIndex) => (
                        <div key={workIndex}>
                          <h6>{item.designation}</h6>
                          <ul>
                            {item.work_details.map(
                              (workDetail, workDetailIndex) => (
                                <li key={workDetailIndex}>{workDetail}</li>
                              )
                            )}
                          </ul>
                        </div>
                      ))}
                    </div>
                  )
                )}
              </Col>
            </Row>
            <Row>
              <Col>
                <h5>Education</h5>
                <ul>
                  {resumeData["education"].map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </Col>
            </Row>
            <Row>
              <Col>
                <h5>Additional Qualifications</h5>
                <ul>
                  {resumeData["additionalQualifications"].map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </Col>
            </Row>
          </div>
        )}
        <Row className="mb-3 | justify-content-end" xs="auto">
          <Button variant="primary" onClick={(e) => printResume(e)}>
            Print
          </Button>
        </Row>
      </Container>
    </div>
  );
};

export default PreviewResume;
