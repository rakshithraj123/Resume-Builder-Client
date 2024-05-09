import { Container, Card, Form, Button, Row, Col } from "react-bootstrap";
import { useState } from "react";

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

const CreateResume = ({ handleNavigation }) => {
  const { state } = useLocation();

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

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
    experience:[],
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
  const [formData, setFormData] = useState(state?.resumeData? state?.resumeData : {})


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
    setLoading(true)
    // Add logic to handle form submission, e.g., send data to backend
    let data = JSON.stringify(formData);
    resumeAddService
      .create(formData)
      .then((response) => {
        // console.log(response)
        if (response.status) {
          // toast("Resume creation successful");
          //
          handleNavigation(PREVIEW_RESUME_MENU, response.data.Resume._id)
        } else if (response.status == false) {
          toast(response.message);
        }
      })
      .catch((err) => {
        console.log(err);
      }).finally(() => {
        setLoading(false)
      })
  };

  // Function to handle moving to the next step
  const nextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };

  // Function to handle moving to the previous step
  const prevStep = () => {
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
      <div class="text-center" style={{ height: "calc(100vh - 100px)", justifyContent: 'center', alignItems: "center", display: "flex" }}>
        <div class="spinner-border" role="status">
          <span class="sr-only"></span>
        </div>
      </div>
    );

  return (
    <div>
      <Container>
        {/* <h2>Resume Builder</h2> */}
        <br /> <br />
        {step === 1 && (
          <BasicDetailForm
            formData={formData}
            handleChange={handleChange}
            nextStep={nextStep}
          />
        )}
        {step === 2 && (
          <KeySkillsForm
            keySkills={formData.keySkills}
            handleKeySkillChange={handleKeySkillChange}
            removeKeySkills={removeKeySkills}
            addKeySkills={addKeySkills}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        )}
        {step === 3 && (
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
          />
        )}
        {step === 4 && (
          <EductionForm
            education={formData.education}
            handleEducationChange={handleEducationChange}
            removeEducation={removeEducation}
            addEducation={addEducation}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        )}
        {step === 5 && (
          <AdditionalQualificationsForm
            additionalQualifications={formData.additionalQualifications}
            handleAdditionalQualificationsChange={
              handleAdditionalQualificationsChange
            }
            removeAdditionalQualifications={removeAdditionalQualifications}
            addAdditionalQualifications={addAdditionalQualifications}
            handleSubmit={handleSubmit}
            prevStep={prevStep}
          />
        )}
      </Container>
    </div>
  );
};

export default CreateResume;
