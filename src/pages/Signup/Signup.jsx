// npm modules
import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userService } from "../../services";
import { NETWORK_ERROR, REGISTRING } from "../../constants";
import { toast } from "react-toastify";
import LoadingSpinner from "../../components/LoadingSpinner";
import { LOG_IN_MENU } from "../../constants";
// css
import styles from "./Signup.module.css";

const Signup = ({ handleAuthEvt, handleNavigation }) => {
  const navigate = useNavigate();
  const imgInputRef = useRef(null);

  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordConf: "",
    phoneNumber: "",
    designation: "",
  });
  const [photoData, setPhotoData] = useState({ photo: null });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const designationOptions = [
    "Analyst",
    "Juinor Engineer",
    "Engineer",
    "Senior Engineer",
    "Manager",
  ];

  const handleChange = (evt) => {
    setMessage("");
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleChangePhoto = (evt) => {
    const file = evt.target.files[0];
    let isFileInvalid = false;
    let errMsg = "";
    const validFormats = ["gif", "jpeg", "jpg", "png", "svg", "webp"];
    const photoFormat = file.name.split(".").at(-1);

    // cloudinary supports files up to 10.4MB each as of May 2023
    if (file.size >= 10485760) {
      errMsg = "Image must be smaller than 10.4MB";
      isFileInvalid = true;
    }
    if (!validFormats.includes(photoFormat)) {
      errMsg = "Image must be in gif, jpeg/jpg, png, svg, or webp format";
      isFileInvalid = true;
    }

    setMessage(errMsg);

    if (isFileInvalid) {
      imgInputRef.current.value = null;
      return;
    }

    setPhotoData({ photo: evt.target.files[0] });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    // setIsSubmitted(true)
    //  setTimeout(() =>{
    //   toast("Hello Geeks 5");
    //    setIsSubmitted("false")

    //    handleAuthEvt()
    //    handleNavigation(LOG_IN_MENU)
    //  },2000)
    const validationMessage = validateFormData();
    if (validationMessage !== true) {
      setMessage(validationMessage);
      return;
    }

    setIsSubmitted(true);
    userService
      .register(formData)
      .then((response) => {
        setMessage(JSON.stringify(response));
        setIsSubmitted(false);
        toast("Registration success");
        handleAuthEvt();
        handleNavigation(LOG_IN_MENU);
      })
      .catch((err) => {
        console.log(err);
        setMessage(err.message);
        setIsSubmitted(false);
      });

    // try {
    //   // if (!import.meta.env.VITE_BACK_END_SERVER_URL) {
    //   //   throw new Error('No VITE_BACK_END_SERVER_URL in front-end .env')
    //   // }
    //   setIsSubmitted(true)
    //   await authService.signup(formData, photoData.photo)
    //   handleAuthEvt()
    //   navigate('/')
    // } catch (err) {
    //   console.log(err)
    //   setMessage(err.message)
    //   setIsSubmitted(false)
    // }
  };

  const validateFormData = () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^[6-9]\d{9}$/;

    if (!formData.firstName || !formData.lastName) {
      return "First name and last name are required";
    }

    if (!emailPattern.test(formData.email)) {
      return "Invalid email address";
    }

    if (formData.password.length < 8) {
      return "Password must be at least 8 characters long";
    }

    if (formData.password !== formData.passwordConf) {
      return "Passwords do not match";
    }

    if (!phonePattern.test(formData.phoneNumber)) {
      return "Invalid phone number";
    }

    if (designation === "" || designation === "Select Designation") {
      return "Select designation from drop down";
    }

    return true;
  };

  const {
    firstName,
    lastName,
    email,
    password,
    passwordConf,
    phoneNumber,
    designation,
  } = formData;

  const isFormInvalid = () => {
    return !(
      firstName &&
      lastName &&
      email &&
      password &&
      password === passwordConf &&
      phoneNumber &&
      (designation !== "" || designation !== "Select Designation")
    );
  };

  if (isSubmitted)
    return (
      <main className={styles.container}>
        <LoadingSpinner text={REGISTRING} />
      </main>
    );

  return (
    <main className={styles.container}>
      <h1>Sign Up</h1>
      <br />
      <form autoComplete="off" onSubmit={handleSubmit} className={styles.form}>
        <label className={styles.label}>
          First Name
          <input
            type="text"
            value={firstName}
            name="firstName"
            onChange={handleChange}
          />
        </label>
        <label className={styles.label}>
          Last Name
          <input
            type="text"
            value={lastName}
            name="lastName"
            onChange={handleChange}
          />
        </label>
        <label className={styles.label}>
          Email
          <input
            type="text"
            value={email}
            name="email"
            onChange={handleChange}
          />
        </label>
        <label className={styles.label}>
          Password
          <input
            type="password"
            value={password}
            name="password"
            onChange={handleChange}
          />
        </label>
        <label className={styles.label}>
          Confirm Password
          <input
            type="password"
            value={passwordConf}
            name="passwordConf"
            onChange={handleChange}
          />
        </label>
        <label className={styles.label}>
          Phone Number
          <input
            type="phone"
            value={phoneNumber}
            name="phoneNumber"
            onChange={handleChange}
            maxLength={10}
          />
        </label>
        <label className={styles.dropDownLabel}>
          Designation         
          <select
            value={designation}
            name="designation"
            onChange={handleChange}
            className={styles.dropDownSelect}
          >
            <option value="">Select Designation</option>
            {designationOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
        {/* <label className={styles.label}>
          Upload Photo
          <input 
            type="file" 
            name="photo" 
            onChange={handleChangePhoto}
            ref={imgInputRef}
          />
        </label> */}
        <div>
          <button
            className={styles.button}
            disabled={isFormInvalid() || isSubmitted}
          >
            {!isSubmitted ? "Sign Up" : "🚀 Sending..."}
          </button>
        </div>
      </form>
      <p className={styles.message}>{message}</p>
    </main>
  );
};

export default Signup;
