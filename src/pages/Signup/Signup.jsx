import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { userService } from "../../services";
import { NETWORK_ERROR, REGISTRING, LOG_IN_MENU, LOG_IN_PATH } from "../../constants";
import { toast } from "react-toastify";
import LoadingSpinner from "../../components/LoadingSpinner";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Logo from "../../img/logo.svg";
import SignupBg from "../../img/signup.jpg";
import Image from "react-bootstrap/Image";

import styles from "./Signup.module.css";
import { validateSignUpFormData } from "../../Utils/ResumeBuilderUtilities.jsx";

const Signup = ({ handleAuthEvt, handleNavigation }) => {
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
    "Junior Engineer",
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

    const {isValid,validationMessage} = validateSignUpFormData(formData);
    if (!isValid) {
      toast(validationMessage);
      return;
    }

    setIsSubmitted(true);
    setMessage('');
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
        if (err.message === "TIME_OUT") {
          toast("Signup timed out. Please try again.");
        }else{
          toast(err.message);
        }   
        setIsSubmitted(false);
      });
  };

  const handleKeyPress = (event) => {
    const { key } = event;
    console.log(key)
    // Allow control keys such as Backspace, Delete, Arrow keys, etc.
    if (
      !['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown','Plus'].includes(key) &&
      (key < '0' || key > '9') && key !== '+'
    ) {
      event.preventDefault();
    }
  };

  const handlePaste = (event) => {
    const paste = (event.clipboardData || window.clipboardData).getData('text');
    if (!/^\d+$/.test(paste)) {
      event.preventDefault();
    }
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
    <Container>
      <Row className="vh-100 align-items-center justify-content-md-center">
        <Col xs lg="8">
          <Row className="bg-white rounded-4 shadow-lg">
            <Col xs="12" lg="6" className="p-3 d-none d-sm-block">
              <Image
                src={SignupBg}
                className="rounded-3 object-fit-cover h-100"
                fluid
              />
            </Col>
            <Col xs="12" md="6" className="p-md-5 p-3">
              <div>
                <h4 className="text-uppercase fw-bold mb-3">
                  <Image src={Logo} width={40} /> Resume Builder
                </h4>
                <h2 className="fw-bolder fs-1">Get Started</h2>
                <p className="text-muted mb-3">
                  Already have an account? <Link to={LOG_IN_PATH}>Sign in</Link>
                </p>
                <Form autoComplete="off" onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="First Name"
                      className="mb-3"
                    >
                      <Form.Control
                        type="text"
                        placeholder="John"
                        name="firstName"
                        value={firstName}
                        onChange={handleChange}
                      />
                    </FloatingLabel>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Last Name"
                      className="mb-3"
                    >
                      <Form.Control
                        type="text"
                        placeholder="Doe"
                        name="lastName"
                        value={lastName}
                        onChange={handleChange}
                      />
                    </FloatingLabel>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Email address"
                      className="mb-3"
                    >
                      <Form.Control
                        type="email"
                        placeholder="name@example.com"
                        name="email"
                        value={email}
                        onChange={handleChange}
                      />
                    </FloatingLabel>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <FloatingLabel controlId="" label="Password">
                      <Form.Control
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={password}
                        onChange={handleChange}
                      />
                    </FloatingLabel>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <FloatingLabel controlId="" label="Confirm Password">
                      <Form.Control
                        type="password"
                        placeholder="Confirm Password"
                        name="passwordConf"
                        value={passwordConf}
                        onChange={handleChange}
                      />
                    </FloatingLabel>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <FloatingLabel controlId="" label="Phone Number">
                      <Form.Control
                        type="tel"
                        placeholder=""
                        name="phoneNumber"
                        value={phoneNumber}
                        onChange={handleChange}
                        onKeyDown={handleKeyPress}
                        onPaste={handlePaste}
                        maxLength={10}
                      />
                    </FloatingLabel>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <FloatingLabel controlId="" label="Designation">
                      <Form.Select
                        aria-label=""
                        name="designation"
                        value={designation}
                        onChange={handleChange}
                      >
                        <option value="">Select Designation</option>
                        {designationOptions.map((option, index) => (
                          <option key={index} value={option}>
                            {option}
                          </option>
                        ))}
                      </Form.Select>
                    </FloatingLabel>
                  </Form.Group>
                  <div className="d-grid mb-3">
                    <Button
                      variant="primary"
                      type="submit"
                      className="p-3"
                      disabled={isFormInvalid() || isSubmitted}
                    >
                      {!isSubmitted ? "Sign up" : "🚀 Sending..."}
                    </Button>
                  </div>
                </Form>
                <p className={styles.message}>{message}</p>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Signup;
