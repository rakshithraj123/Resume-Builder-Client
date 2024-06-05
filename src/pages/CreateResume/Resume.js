class Resume {
    constructor(firstName, lastName, email, phoneNumber, objective, keySkills, experience, professionalExperience, education, additionalQualifications) {
      this.firstName = firstName || "";
      this.lastName = lastName || "";
      this.email = email || "";
      this.phoneNumber = phoneNumber || "";
      this.objective = objective || "";
      this.keySkills = keySkills || [""];
      this.experience = experience || [];
      this.professionalExperience = professionalExperience || [{
        company_name: "",
        startDate:"",
        endDate:"",
        present:false,
        work: [{
          designation: "",
          work_details: [""]
        }]
      }];
      this.education = education || [""];
      this.additionalQualifications = additionalQualifications || [""];
    }
  }
  export default Resume