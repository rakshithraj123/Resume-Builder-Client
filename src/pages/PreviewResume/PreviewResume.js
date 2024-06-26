
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
import { CREATE_RESUME_MENU } from "../../constants";
import CustomPopupDialog from '../../components/CustomPopupDialog';

const PreviewResume = ({ handleNavigation, savedResumeId }) => {
  const { state } = useLocation();
  const [loading, setLoading] = useState(false);
  const [showReloadDialog, setShowReloadDialog] = useState(false);
  let abortController 

  let resumeId = state?.resumeId;
  if (resumeId == null) {
    resumeId = savedResumeId;
  }
  const [resumeData, setResumeData] = useState({});

  let userId = state?.userId? state?.userId : null;

  useEffect(() => {
    abortController = new AbortController();
    if (resumeId == null) {
      handleNavigation();
    } else {
      fetchData();    
    }
    return () => {
      abortController.abort(Error("unmounting"));
    };
  }, []);

  const fetchData = async () => {
    try {
      setShowReloadDialog(false)
      setLoading(true)
      const response = await resumeAddService.fetch(resumeId, abortController);
      setLoading(false)

      if (response.status) {
        setResumeData(response.data.Resume.content);
      } else {
        toast("Fail to fetch resume");
      }
    } catch (error) {
      if (error.message === 'unmounting') {
       //aborted due to component unmounted
      } else    
      if (error.message === "TIME_OUT") {
        setShowReloadDialog(true)
        setLoading(true);
      } else {
        console.error("Error:", error);   
        setLoading(false)   
      }   
    } finally {
  
    }
  };

  const printResume = (e) => {
    e.preventDefault();
    const contentToPrint = document.getElementById("content-to-print");
    const originalContents = document.body.innerHTML;
    document.body.innerHTML = contentToPrint.innerHTML;
    window.print();
    //document.body.innerHTML = originalContents;
    window.location.reload();
  };

  const goToResumeEdit = (e) => {
    e.preventDefault();
    handleNavigation(CREATE_RESUME_MENU, { resumeData: resumeData, resumeId: resumeId, userId: userId })
  };

  const getFromToDate = (startDate, endDate, present) => {
    if(startDate == null || startDate == ""){
      return ""
    }

    let fromToDate = " (From "
    let date = new Date(startDate);
    fromToDate = fromToDate + date.toLocaleString('en-US', { month: 'long' })
    fromToDate = fromToDate + " "+date.getFullYear() +" - "

    if(present){
      date = new Date(endDate);
      fromToDate = fromToDate + "Present)"
    }else{
      date = new Date(endDate);
      fromToDate = fromToDate + date.toLocaleString('en-US', { month: 'long' })
      fromToDate = fromToDate + " "+date.getFullYear() +")"
    }
    return fromToDate 
  }

  if (loading)
    return (
      <div
        class="text-center"
        style={{
          height: "calc(100vh - 41px)",
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
        }}
      >
         {showReloadDialog && <CustomPopupDialog
        handleOkClick={(e) => {
          setShowReloadDialog(false)
          fetchData()
        }}
        handleCancelClick={() => {
          setShowReloadDialog(false)
        }}
        title={"Resume Builder"}
        message={"Something went wrong, Do you want to Reload Resume?"}
      />}
        <div class="spinner-border" role="status">
          <span class="sr-only"></span>
        </div>
      </div>
    );

  return (
    <>
      {showReloadDialog && <CustomPopupDialog
        handleOkClick={(e) => {
          setShowReloadDialog(false)
          fetchData()
        }}
        handleCancelClick={() => {
          setShowReloadDialog(false)
        }}
        title={"Resume Builder"}
        message={"Something went wrong, Do you want to Reload Resume?"}
      />}
      <div className="p-5 bg-primary">
        <Container>
          <Row className="align-items-center">
            <Col>
              <div className="py-5">
                <h3 className="text-white">
                  <i class="bi bi-journal-check"></i> Preview your resume
                </h3>
              </div>
            </Col>
            <Col md="auto">
              <Button
                variant="outline-light"
                onClick={(e) => {
                  printResume(e);
                }}
              >
                Print / Download
              </Button>
            </Col>
          </Row>
        </Container>
      </div>

      {/* <Container className="bg-white rounded-top p-md-5 p-3 mt-n5 shadow" style={{ height: '680px', overflow:'auto', scrollbarWidth:'none' }}> */}
      <Container className="bg-white rounded-top p-md-5 p-3 mt-n5 shadow" style={{ height: "calc(100vh - 227px)", overflow:'auto', scrollbarWidth:'none' }}>  
        <Row>
          <Col>
            <>
              <div className="bg-white shadow-lg p-3" id="content-to-print">
                <Row className=" justify-content-between mb-5">
                  <Col>
                    <h3 className={`${styles.largeFont}`}>
                      {resumeData.firstName} {resumeData.lastName}
                    </h3>
                  </Col>
                  <Col className="text-end">
                    <h5 className={`${styles.defaultFont}`}>
                      Mobile: {resumeData.phoneNumber}
                    </h5>
                    <h5 className={`${styles.mediumFont}`}>
                      Email: {resumeData.email}
                    </h5>
                  </Col>
                </Row>

                <p className={`mb-5 ${styles.defaultFont}`}>
                  {resumeData.objective}
                </p>
                <h4 className={`mb-3 ${styles.largeFont}`}>Key Skills</h4>
                <ul className={`list-unstyled ps-4 mb-5 ${styles.defaultFont}`}>
                  {(resumeData["keySkills"] ?? []).map((item, index) => (
                    <li key={index}>➢{item}</li>
                  ))}
                </ul>

                <h4 className={`mb-3 ${styles.largeFont}`}>
                  Professional Experience
                </h4>
                {(resumeData["professionalExperience"] ?? []).map(
                  (experience, experienceIndex) => (
                    <div key={experienceIndex}>
                      <h5 className={`mb-4 ${styles.mediumFont}`}>
                        {experience.company_name}{getFromToDate(experience.startDate,
                          experience.endDate,
                          experience.present)}
                      </h5>

                      {experience.work.map((item, workIndex) => (
                        <div key={workIndex}>
                          <h6 className={`mb-4 ${styles.smallFont}`}>
                            {item.designation}
                          </h6>
                          <ul className={`lps-4 mb-5 ${styles.defaultFont}`}>
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
                <h4 className={`mb-3 ${styles.largeFont}`}>Education</h4>

                <ul className={`lps-4 mb-5 ${styles.defaultFont}`}>
                  {(resumeData["education"] ?? []).map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>

                <h4 className={`mb-3 ${styles.largeFont}`}>
                  Additional Qualifications
                </h4>

                <ul className={`lps-4 mb-5 ${styles.defaultFont}`}>
                  {(resumeData["additionalQualifications"] ?? []).map(
                    (item, index) => (
                      <li key={index}>{item}</li>
                    )
                  )}
                </ul>
              </div>
            </>

            <div className="text-center pt-4">
              <Button variant="primary" onClick={(e) => goToResumeEdit(e)}>
                EDIT
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );

  // return (
  //   <div>
  //     <Container>
  //       {Object.keys(resumeData).length === 0 ? (
  //         <div className="text-center" style={{ height: "calc(100vh - 100px)", justifyContent: 'center', alignItems: "center", display: "flex" }}>
  //           <div className="spinner-border" role="status">
  //             <span className="sr-only"></span>
  //           </div>
  //         </div>
  //       ) : (
  //         <div id="content-to-print">
  //           <Row className="mb-3">
  //             <Col>
  //               <h2>
  //                 {resumeData.firstName} {resumeData.lastName}
  //               </h2>
  //             </Col>
  //             <Col xs="auto" style={{ marginRight: "10px" }}>
  //               <Row className="justify-content-end">
  //                 {resumeData.phoneNumber}
  //               </Row>
  //               <Row className="justify-content-end">{resumeData.email}</Row>
  //             </Col>
  //           </Row>
  //           <Row>
  //             <Col>
  //               <p>{resumeData.objective}</p>
  //             </Col>
  //           </Row>
  //           <Row className="mb-3">
  //             <Col>
  //               <h5>Key Skills</h5>
  //               <ul>
  //                 {(resumeData["keySkills"] ?? []).map((item, index) => (
  //                   <li key={index}>{item}</li>
  //                 ))}
  //               </ul>
  //             </Col>
  //           </Row>
  //           <Row>
  //             <Col>
  //               <h5>Professional Experience</h5>

  //               {(resumeData["professionalExperience"] ?? []).map(
  //                 (experience, experienceIndex) => (
  //                   <div key={experienceIndex}>
  //                     <h6>{experience.company_name}</h6>

  //                     {experience.work.map((item, workIndex) => (
  //                       <div key={workIndex}>
  //                         <h6>{item.designation}</h6>
  //                         <ul>
  //                           {item.work_details.map(
  //                             (workDetail, workDetailIndex) => (
  //                               <li key={workDetailIndex}>{workDetail}</li>
  //                             )
  //                           )}
  //                         </ul>
  //                       </div>
  //                     ))}
  //                   </div>
  //                 )
  //               )}
  //             </Col>
  //           </Row>
  //           <Row>
  //             <Col>
  //               <h5>Education</h5>
  //               <ul>
  //                 {(resumeData["education"] ?? []).map((item, index) => (
  //                   <li key={index}>{item}</li>
  //                 ))}
  //               </ul>
  //             </Col>
  //           </Row>
  //           <Row>
  //             <Col>
  //               <h5>Additional Qualifications</h5>
  //               <ul>
  //                 {(resumeData["additionalQualifications"] ?? []).map((item, index) => (
  //                   <li key={index}>{item}</li>
  //                 ))}
  //               </ul>
  //             </Col>
  //           </Row>
  //         </div>
  //       )}
  //       <Row className="mb-3 | justify-content-end" xs="auto">
  //         <Col>
  //           <Button variant="primary" onClick={(e) => goToResumeEdit(e)}>
  //             Edit
  //           </Button>
  //         </Col>
  //         <Col><Button variant="primary" onClick={(e) => printResume(e)}>
  //           Print
  //         </Button></Col>
  //       </Row>
  //     </Container>
  //   </div>
  // );
};

export default PreviewResume;