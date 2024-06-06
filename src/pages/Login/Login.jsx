import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userService } from "../../services";
import { NETWORK_ERROR, LOGGING_IN, HOME_MENU, SIGN_UP_PATH } from "../../constants";
import LoadingSpinner from "../../components/LoadingSpinner";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Logo from '../../img/logo.svg';
import LoginBg from '../../img/loginbg.jpg';
import Image from 'react-bootstrap/Image';
import { encryptText, decryptText } from './cryptoUtils.js';
import { toast } from "react-toastify";

// css
import styles from "./Login.module.css";

const LoginPage = ({ handleAuthEvt, handleNavigation }) => {
  const navigate = useNavigate();

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    const encryptedEmail = localStorage.getItem("rememberMeEmail");
    const encryptedPassword = localStorage.getItem("rememberMePassword");

    if (encryptedEmail && encryptedPassword) {
      setFormData({
        email: decryptText(encryptedEmail),
        password: decryptText(encryptedPassword)
      });
      setRememberMe(true);
    }
  }, []);

  const handleChange = (evt) => {
    setMessage("");
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleRememberMeChange = (evt) => {
    setRememberMe(evt.target.checked);
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    const validationMessage = validateFormData();
    if (validationMessage !== true) {
      setMessage(validationMessage);
      return;
    }

    setLoading(true);
    userService
      .login(formData)
      .then((response) => {
        setMessage(JSON.stringify(response));
        setLoading(false);
        handleAuthEvt();
        handleNavigation(HOME_MENU);
        if (rememberMe) {
          localStorage.setItem("rememberMeEmail", encryptText(formData.email));
          localStorage.setItem("rememberMePassword", encryptText(formData.password));
        } else {
          localStorage.removeItem("rememberMeEmail");
          localStorage.removeItem("rememberMePassword");
          setRememberMe(false);
        }
      })
      .catch((err) => {
        console.log(err);
        if (err.message === "TIME_OUT") {
          toast("Login timed out. Please try again.");
        }else{
          toast(err.message);
        }      
        setLoading(false);
      });
  };

  const { email, password } = formData;

  const validateFormData = () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(formData.email)) {
      return "Invalid email address";
    }
    return true;
  };

  const isFormInvalid = () => {
    return !(email && password);
  };

  if (loading) {
    return (
      <main className={styles.container}>
        <LoadingSpinner text={LOGGING_IN} />
      </main>
    );
  }

  return (
    <>
      <Container>
        <Row className="vh-100 align-items-center justify-content-md-center">
          <Col xs lg="8">
            <Row className="bg-white rounded-4 shadow-lg">
              <Col xs="12" md="6" className="p-md-5 p-3">
                <div className="py-4">
                  <h4 className="text-uppercase fw-bold mb-5">
                    <Image src={Logo} width={40} /> Resume Builder
                  </h4>
                  <h2 className="fw-bolder fs-1">Login to your account</h2>
                  <p className="text-muted mb-5">Hi, Welcome back &#128075; </p>
                  <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formEmail">
                      <FloatingLabel controlId="floatingInput" label="Email address" className="mb-3">
                        <Form.Control
                          type="email"
                          placeholder="name@example.com"
                          name="email"
                          value={email}
                          onChange={handleChange}
                        />
                      </FloatingLabel>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formPassword">
                      <FloatingLabel controlId="floatingPassword" label="Password">
                        <Form.Control
                          type="password"
                          placeholder="Password"
                          name="password"
                          value={password}
                          onChange={handleChange}
                        />
                      </FloatingLabel>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                      <Form.Check
                        type="checkbox"
                        label="Remember me"
                        checked={rememberMe}
                        onChange={handleRememberMeChange}
                      />
                    </Form.Group>
                    <div className="d-grid mb-3">
                      <Button variant="primary" type="submit" className="p-3" disabled={isFormInvalid()}>
                        Sign in
                      </Button>
                    </div>
                    <Form.Group className="text-center text-muted">
                      Don't have an account? <Link to={SIGN_UP_PATH}>Create an account</Link>
                    </Form.Group>
                    <p className={styles.message}>{message}</p>
                  </Form>
                </div>
              </Col>
              <Col xs="12" lg="6" className="p-3 d-none d-sm-block">
                <Image src={LoginBg} className="rounded-3 object-fit-cover h-100" fluid />
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default LoginPage;
