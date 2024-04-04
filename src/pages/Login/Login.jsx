// npm modules
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userService } from "../../services";
import { NETWORK_ERROR, LOGGING_IN, HOME_MENU } from "../../constants";
import LoadingSpinner from "../../components/LoadingSpinner";

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

  const handleChange = (evt) => {
    setMessage("");
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    // if (!import.meta.env.VITE_BACK_END_SERVER_URL) {
    //   throw new Error('No VITE_BACK_END_SERVER_URL in front-end .env')
    // }
    // await authService.login(formData)

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
      })
      .catch((err) => {
        console.log(err);
        setMessage(NETWORK_ERROR);
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

  if (loading)
    return (
      <main className={styles.container}>
        <LoadingSpinner text={LOGGING_IN} />
      </main>
    );

  return (
    <main className={styles.container}>
      <h1>Log In</h1>
      <br />
      <br />
      <form autoComplete="off" onSubmit={handleSubmit} className={styles.form}>
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
        <div>
          <Link to="/">Reset</Link>
          <button className={styles.button} disabled={isFormInvalid()}>
            Log In
          </button>
        </div>
      </form>
      <p className={styles.message}>{message}</p>
    </main>
  );
};

export default LoginPage;
