import { Container, Card, Form, Button, Row, Col } from "react-bootstrap";
import { useEffect, useState } from "react";

import BasicDetailForm from "./BasicDetailForm";
import KeySkillsForm from "./KeySkillsForm";
import ExperienceForm from "./ExperienceForm";
import { json } from "react-router";
import EductionForm from "./EductionForm";
import AdditionalQualificationsForm from "./AdditionalQualificationsForm";
import { PREVIEW_RESUME_MENU } from "../../constants";
import { resumeAddService } from "../../services/resumeAdd.service";
import { toast } from "react-toastify";
import { HOME_MENU } from "../../constants";
import { useLocation } from "react-router-dom";
import { setResumeId } from "../../redux/";
import Resume from "./Resume";
import { getResumeId } from "../../redux/selectors";
import Tabs from "react-bootstrap/Tabs";
import Stack from "react-bootstrap/esm/Stack";
import Tab from "react-bootstrap/Tab";
import "bootstrap-icons/font/bootstrap-icons.css";
import React, { useRef } from "react";

const CreateResume = ({ handleNavigation }) => {
  const { state } = useLocation();

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [currentTab, setCurrentTab] = useState(0);

  const basicInfoFormRef = useRef(null);
  const keySkillFormRef = useRef(null);
  const experienceFormRef = useRef(null);
  const eductionFormRef = useRef(null);
  const additionalQualificationsFormRef = useRef(null);

  const dummyData = {
    firstName: "RAVIKUMAR",
    lastName: "HIREMATH",
    email: "avikumar.h@glowtouch.com",
    phoneNumber: "+91 97432 17925",
    objective:
      "Experienced Service Delivery Professional with a strong background in Customer Support industry. Skilled in leading cross-functional teams, fostering client relationships, and implementing strategies to optimize service delivery and enhance customer satisfaction. Exceptional communicator with a focus on aligning business objectives with service delivery excellence",
    keySkills: [
      "Strong leadership and team management abilities",
      "Strategic thinker with a focus on continuous improvement",
      "Customer-centric approach to service delivery",
    ],
    experience: [],
    professionalExperience: [
      {
        company_name:
          "GlowTouch Technologies Pvt. Ltd (From Aug 2009 till date)",
        work: [
          {
            designation: "Team Leader (Feb 2022 - Present)",
            work_details: [
              "Working on ServiceNow, JIRA, Polaris, SalesForce, Pega Genesis Cloud, Tableau, CSES",
              "Creating and updating Release Incident Management using ServiceNow tool",
              "Ensuring performance of services within agreed Service Level Agreements (SLAs) ",
              "Experience with JIRA environments with ability to create JIRA workflow",
            ],
          },
        ],
      },
      {
        company_name: "Technologies Pvt. Ltd (From Aug 2009 till date)",
        work: [
          {
            designation: "Team Leader (Feb 2022 - Present)",
            work_details: [
              "Working on ServiceNow, JIRA, Polaris, SalesForce, Pega Genesis Cloud, Tableau, CSES",
              "Creating and updating Release Incident Management using ServiceNow tool",
              "Ensuring performance of services within agreed Service Level Agreements (SLAs) ",
              "Experience with JIRA environments with ability to create JIRA workflow",
            ],
          },
        ],
      },
    ],
    education: ["Bachelor of Science, from Kuvempu University (2008-2011)"],
    additionalQualifications: [
      "Hardware & Network Engineering Course in Goal Information Technology.",
      "PC Hardware, Basic Networking Certification.",
      "CCNA (Cisco Certified Network Associate).",
    ],

    // Add more fields as needed
  };
  const resume = new Resume();
  const [formData, setFormData] = useState(
    state?.resumeData ? state?.resumeData : resume
  );
  const resumeId = state?.resumeId ? state?.resumeId : null;
  console.log("create resume");
  console.log(resumeId);

  const userId = state?.userId ? state?.userId : null;

  useEffect(() => {
    console.log("handleNavigation useEffect resumeId " + resumeId);

    if (
      resumeId == null &&
      getResumeId() != null &&
      state?.resumeData == null
    ) {
      //handleNavigation(HOME_MENU)
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleKeySkillChange = (e, index) => {
    const { name, value } = e.target;
    const keySkills = formData.keySkills;
    keySkills[index] = value;
    setFormData({ ...formData, keySkills: keySkills });
  };

  const handleEducationChange = (e, index) => {
    const { name, value } = e.target;
    const education = formData.education;
    education[index] = value;
    setFormData({ ...formData, education: education });
  };

  const handleAdditionalQualificationsChange = (e, index) => {
    const { name, value } = e.target;
    const additionalQualifications = formData.additionalQualifications;
    additionalQualifications[index] = value;
    setFormData({
      ...formData,
      additionalQualifications: additionalQualifications,
    });
  };

  const handleCompanyNameChange = (e, index) => {
    const { name, value } = e.target;
    const professionalExperience = formData.professionalExperience;
    professionalExperience[index].company_name = value;
    setFormData({
      ...formData,
      professionalExperience: professionalExperience,
    });
  };

  const handleDesignationChange = (e, index, workIndex) => {
    const { name, value } = e.target;
    const professionalExperience = formData.professionalExperience;
    professionalExperience[index].work[workIndex].designation = value;
    setFormData({
      ...formData,
      professionalExperience: professionalExperience,
    });
  };

  const handleWorkDetailChange = (e, index, workIndex, workDetailIndex) => {
    const { name, value } = e.target;
    const professionalExperience = formData.professionalExperience;
    professionalExperience[index].work[workIndex].work_details[
      workDetailIndex
    ] = value;
    setFormData({
      ...formData,
      professionalExperience: professionalExperience,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let formRef = getFormRef();
    if (checkFormValidty(formRef)) {
      resumeId ? updateResume() : createResume();
    } else {
      console.log("Form validation failed. Submit");
    }
  };

  const createResume = () => {
    setLoading(true);
    // Add logic to handle form submission, e.g., send data to backend
    let data = JSON.stringify(formData);
    resumeAddService
      .create(formData,userId)
      .then((response) => {
        // console.log(response)
        if (response.status) {
          // toast("Resume creation successful");
          //
          setResumeId(response.data.Resume._id);
          handleNavigation(PREVIEW_RESUME_MENU, { resumeId: response.data.Resume._id });
        } else if (response.status == false) {
          toast(response.message);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const updateResume = () => {
    setLoading(true);
    // Add logic to handle form submission, e.g., send data to backend
    let data = JSON.stringify(formData);
    resumeAddService
      .update(formData, resumeId,userId)
      .then((response) => {
        // console.log(response)
        if (response.status) {
          // toast("Resume creation successful");
          //
          console.log("setResumeId " + response.data.Resume._id);
          setResumeId(response.data.Resume._id);
          handleNavigation(PREVIEW_RESUME_MENU, {resumeId:response.data.Resume._id,userId:userId});
        } else if (response.status == false) {
          toast(response.message);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // Function to handle moving to the next step
  const nextStep = () => {
    //setCurrentTab((prev) => prev + 1)
    //setStep((prevStep) => prevStep + 1);
    let formRef = getFormRef();
    if (checkFormValidty(formRef)) {
      setCurrentTab((prev) => prev + 1);
      setStep((prevStep) => prevStep + 1);
    } else {
      console.log("Form validation failed. Next step");
    }
  };

  const getFormRef = () => {
    if (currentTab === 0) {
      return basicInfoFormRef;
    } else if (currentTab === 1) {
      return keySkillFormRef;
    } else if (currentTab === 2) {
      return experienceFormRef;
    } else if (currentTab === 3) {
      return eductionFormRef;
    } else {
      return additionalQualificationsFormRef;
    }
  };
  const checkFormValidty = (formRef) => {
    if (formRef.current) {
      if (typeof formRef.current.requestSubmit === "function") {
        formRef.current.requestSubmit();
      } else {
        formRef.current.dispatchEvent(
          new Event("submit", { cancelable: true })
        );
      }
    }
    let isAllRequiredValueFilled = formRef.current.checkValidity();

    if (isAllRequiredValueFilled) {
      return vaildatedFormData();
    } else {
      return false;
    }
  };

  const vaildatedFormData = () => {
    if (currentTab === 0) {
      return vaildatedBasicFormData();
    } else if (currentTab === 1) {
      return vaildatedSkillsData();
    } else if (currentTab === 2) {
      return vaildatedProfessionalExperienceData();
    } else if (currentTab === 3) {
      return vaildatedEducationData();
    } else if (currentTab === 4) {
      return vaildatedAdditionalInfoData();
    } else {
      return true;
    }
  };

  const vaildatedBasicFormData = () => {
    const userNameRegex = /^[a-zA-Z]+$/;

    const phoneRegex = formData.phoneNumber.startsWith('+')? /^(\+?\d{2})?\d{10}$/ : /^[0-9]{10}$/
   
    if (formData.firstName.length < 3) {
      console.log("First name cannot be less than 3 characters");
      toast("First name cannot be less than 3 characters");
      return false;
    } else if (!userNameRegex.test(formData.firstName)) {
      console.log("First name cannot contain special characters or numbers");
      toast("First name cannot contain special characters or numbers");
      return false;
    } else if (formData.lastName.length < 3) {
      console.log("Last name cannot be less than 3 characters");
      toast("Last name cannot be less than 3 characters");
      return false;
    } else if (!userNameRegex.test(formData.lastName)) {
      console.log("Last name cannot contain special characters or numbers");
      toast("Last name cannot contain special characters or numbers");
      return false;
    } else if (!phoneRegex.test(formData.phoneNumber.replace(/\s/g, ''))) {
      console.log("Invalid phone number. It must be exactly 10 digits and contain only numbers");
      toast("Invalid phone number. It must be minimum 10 digits.");
      return false;
    } else {
      return true;
    }
  };

  const vaildatedSkillsData = () => {
    if (formData.keySkills.length < 3) {
      toast("Minimum 3 skills is required");
      return false;
    } else {
      return true;
    }
  };

  const vaildatedProfessionalExperienceData = () => {
    if (formData.professionalExperience.length < 1) {
      console.log("Atleast one professional experience is required");
      toast("Atleast one professional experience is required");
      return false;
    } else {
      return true;
    }
  };

  const vaildatedEducationData = () => {
    if (formData.education.length < 1) {
      console.log("Atleast one education details is required");
      toast("Atleast one education details is required");
      return false;
    } else {
      return true;
    }
  };

  const vaildatedAdditionalInfoData = () => {
    if (formData.additionalQualifications.length < 1) {
      console.log("Atleast one additional qualification is required");
      toast("Atleast one additional qualification is required");
      return false;
    } else {
      return true;
    }
  };

  // Function to handle moving to the previous step
  const prevStep = () => {
    setCurrentTab((prev) => prev - 1);
    setStep((prevStep) => prevStep - 1);
  };

  const addKeySkills = () => {
    const keySkills = [...formData.keySkills, ""];
    setFormData({ ...formData, keySkills: keySkills });
  };

  const removeKeySkills = (e, index) => {
    e.preventDefault();
    const keySkills = [...formData.keySkills];
    keySkills.splice(index, 1);
    setFormData({ ...formData, keySkills: keySkills });
  };

  const addEducation = () => {
    const education = [...formData.education, ""];
    setFormData({ ...formData, education: education });
  };

  const removeEducation = (e, index) => {
    e.preventDefault();
    const education = [...formData.education];
    education.splice(index, 1);
    setFormData({ ...formData, education: education });
  };

  const addAdditionalQualifications = () => {
    const additionalQualifications = [...formData.additionalQualifications, ""];
    setFormData({
      ...formData,
      additionalQualifications: additionalQualifications,
    });
  };

  const removeAdditionalQualifications = (e, index) => {
    e.preventDefault();
    const additionalQualifications = [...formData.additionalQualifications];
    additionalQualifications.splice(index, 1);
    setFormData({
      ...formData,
      additionalQualifications: additionalQualifications,
    });
  };

  const addExperience = () => {
    const experience = [
      ...formData.professionalExperience,
      {
        company_name: "",
        work: [
          {
            designation: "",
            work_details: [""],
          },
        ],
      },
    ];
    setFormData({ ...formData, professionalExperience: experience });
  };

  const removeExperience = (e, index) => {
    e.preventDefault();
    const experience = [...formData.professionalExperience];
    experience.splice(index, 1);
    setFormData({ ...formData, professionalExperience: experience });
  };

  const addWork = (index) => {
    const work = [
      ...formData.professionalExperience[index].work,
      {
        designation: "",
        work_details: [""],
      },
    ];
    const experience = [...formData.professionalExperience];
    experience[index].work = work;

    setFormData({ ...formData, professionalExperience: experience });
  };

  const removeWork = (e, index, workIndex) => {
    e.preventDefault();
    const experience = [...formData.professionalExperience];
    experience[index].work.splice(workIndex, 1);
    setFormData({ ...formData, professionalExperience: experience });
  };

  const addWorkDetails = (index, workIndex) => {
    const workDetails = [
      ...formData.professionalExperience[index].work[workIndex].work_details,
      "",
    ];
    const experience = [...formData.professionalExperience];
    experience[index].work[workIndex].work_details = workDetails;
    setFormData({ ...formData, professionalExperience: experience });
  };

  const removeWorkDetails = (e, index, workIndex, workDetailIndex) => {
    e.preventDefault();
    const experience = [...formData.professionalExperience];
    experience[index].work[workIndex].work_details.splice(workDetailIndex, 1);
    setFormData({ ...formData, professionalExperience: experience });
  };

  if (loading)
    return (
      <div
        class="text-center"
        style={{
          height: "calc(100vh - 42px)",
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
        }}
      >
        <div class="spinner-border" role="status">
          <span class="sr-only"></span>
        </div>
      </div>
    );

  return (
    <>
      <div className="p-5 bg-primary">
        <Container>
          <Row>
            <Col>
              <div className="p-md-5 p-3"></div>
            </Col>
          </Row>
        </Container>
      </div>
      <Container className="bg-white rounded-top mt-n5 shadow" style={{ height: "calc(100vh - 185px)", overflow:'auto', scrollbarWidth:'none' }}>
      {/* <Container className="bg-white rounded-top mt-n5 shadow">   */}
        <Row>
          <Col className="px-md-5 p-2 pt-md-2 pb-md-5">
            <Tabs activeKey={currentTab} id="" variant="underline">
              <Tab eventKey={0} title="Summary" disabled={currentTab !== 0}>
                <BasicDetailForm
                  formData={formData}
                  handleChange={handleChange}
                  nextStep={nextStep}
                  ref={basicInfoFormRef}
                />
              </Tab>
              <Tab eventKey={1} title="Skills" disabled={currentTab !== 1}>
                <KeySkillsForm
                  keySkills={formData.keySkills}
                  handleKeySkillChange={handleKeySkillChange}
                  removeKeySkills={removeKeySkills}
                  addKeySkills={addKeySkills}
                  nextStep={nextStep}
                  prevStep={prevStep}
                  ref={keySkillFormRef}
                />
              </Tab>
              <Tab eventKey={2} title="Experience" disabled={currentTab !== 2}>
                <ExperienceForm
                  professionalExperience={formData.professionalExperience}
                  handleDesignationChange={handleDesignationChange}
                  handleWorkDetailChange={handleWorkDetailChange}
                  removeExperience={removeExperience}
                  addExperience={addExperience}
                  nextStep={nextStep}
                  prevStep={prevStep}
                  removeWork={removeWork}
                  addWork={addWork}
                  removeWorkDetails={removeWorkDetails}
                  addWorkDetails={addWorkDetails}
                  handleCompanyNameChange={handleCompanyNameChange}
                  ref={experienceFormRef}
                />
              </Tab>
              <Tab eventKey={3} title="Education" disabled={currentTab !== 3}>
                <EductionForm
                  education={formData.education}
                  handleEducationChange={handleEducationChange}
                  removeEducation={removeEducation}
                  addEducation={addEducation}
                  nextStep={nextStep}
                  prevStep={prevStep}
                  ref={eductionFormRef}
                />
              </Tab>
              <Tab
                eventKey={4}
                title="Additional Info"
                disabled={currentTab !== 4}
              >
                <AdditionalQualificationsForm
                  additionalQualifications={formData.additionalQualifications}
                  handleAdditionalQualificationsChange={
                    handleAdditionalQualificationsChange
                  }
                  removeAdditionalQualifications={
                    removeAdditionalQualifications
                  }
                  addAdditionalQualifications={addAdditionalQualifications}
                  prevStep={prevStep}
                  ref={additionalQualificationsFormRef}
                />
              </Tab>
            </Tabs>

            <Stack gap={3} direction="horizontal" className="mt-3">
              <Button
                className="btn-outline-primary bg-transparent text-primary"
                disabled={currentTab === 0}
                onClick={() => prevStep()}
              >
                Previous
              </Button>
              {currentTab != 4 ? (
                <Button
                  className="btn-primary  ms-auto"
                  disabled={currentTab === 4}
                  onClick={() => nextStep()}
                >
                  Let's go to next step!
                </Button>
              ) : (
                <Button
                  className="btn-primary  ms-auto"
                  onClick={(e) => handleSubmit(e)}
                >
                  Sumbit
                </Button>
              )}
            </Stack>
          </Col>
        </Row>
      </Container>
    </>
  );

  // return (
  //   <div>
  //     <Container>
  //       {/* <h2>Resume Builder</h2> */}
  //       <br /> <br />
  //       {step === 1 && (
  //         <BasicDetailForm
  //           formData={formData}
  //           handleChange={handleChange}
  //           nextStep={nextStep}
  //         />
  //       )}
  //       {step === 2 && (
  //         <KeySkillsForm
  //           keySkills={formData.keySkills}
  //           handleKeySkillChange={handleKeySkillChange}
  //           removeKeySkills={removeKeySkills}
  //           addKeySkills={addKeySkills}
  //           nextStep={nextStep}
  //           prevStep={prevStep}
  //         />
  //       )}
  //       {step === 3 && (
  //         <ExperienceForm
  //           professionalExperience={formData.professionalExperience}
  //           handleDesignationChange={handleDesignationChange}
  //           handleWorkDetailChange={handleWorkDetailChange}
  //           removeExperience={removeExperience}
  //           addExperience={addExperience}
  //           nextStep={nextStep}
  //           prevStep={prevStep}
  //           removeWork={removeWork}
  //           addWork={addWork}
  //           removeWorkDetails={removeWorkDetails}
  //           addWorkDetails={addWorkDetails}
  //           handleCompanyNameChange={handleCompanyNameChange}
  //         />
  //       )}
  //       {step === 4 && (
  //         <EductionForm
  //           education={formData.education}
  //           handleEducationChange={handleEducationChange}
  //           removeEducation={removeEducation}
  //           addEducation={addEducation}
  //           nextStep={nextStep}
  //           prevStep={prevStep}
  //         />
  //       )}
  //       {step === 5 && (
  //         <AdditionalQualificationsForm
  //           additionalQualifications={formData.additionalQualifications}
  //           handleAdditionalQualificationsChange={
  //             handleAdditionalQualificationsChange
  //           }
  //           removeAdditionalQualifications={removeAdditionalQualifications}
  //           addAdditionalQualifications={addAdditionalQualifications}
  //           handleSubmit={handleSubmit}
  //           prevStep={prevStep}
  //         />
  //       )}
  //     </Container>
  //   </div>
  // );
};

export default CreateResume;
