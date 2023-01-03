import React from "react";
import Footer from "../../fragments/footer/Footer";
import Background from "../../fragments/background/Background";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SignUpAppClientService from "../../../../api/signup/SignUpAppClientService";
import styles from "../../../../css/Forms.module.css";
import style from "../../../../css/Footer.module.css";
import LoadingDotsDark from "../login/animation/LoadingDotsDark";

const SignUp = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [info, setInfo] = useState({
    username: "",
    legalName: "",
    phoneNumber: "",
    email: "",
    password: "",
    repeatpassword: "",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const errors = {};

    if (!info.username) {
      errors.username = "Required";
    } else if (info.username.length < 5) {
      errors.username = "Minimum 5 char";
    }

    if (!info.legalName) {
      errors.legalName = "Required";
    } else if (info.legalName.length < 2 || info.legalName.length > 20) {
      errors.legalName = "2 to 20 char";
    }

    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(info.email)) {
      errors.email = "Invalid email address";
    }

    if (!info.password) {
      errors.password = "Required";
    }
    if (!info.repeatpassword) {
      errors.repeatpassword = "Repeate";
    }
    if (info.password !== info.repeatpassword) {
      errors.repeatpassword = "Passwords don't match";
    }
    
    if(!info.phoneNumber) {
      errors.phoneNumber = "Required";
    } else if (!/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im.test(info.phoneNumber)) {
      errors.phoneNumber = "Invalid phone number";
    }

    return errors;
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    let errors = validate(info);
    setErrors(errors);

    if (Object.keys(errors).length === 0) {
      console.log(info);
      setLoading(true);
      await SignUpAppClientService(info)
        .then((response) => {
          if (response.status === 201) {
            navigate("/login");
          }
        })
        .catch((err) => {
          setError(true);
          setLoading(false);
        });
    } else {
      console.log(errors);
    }
  };

  return (
    <>
      <main className={styles.form_style}>
        <h2>Sign up</h2>
        {error && (
          <div className={styles.errors}>
            This username or email already exist.
          </div>
        )}

        <form className={styles.signup_form} onSubmit={submitHandler}>
          <section className={styles.form_field}>
            <input
              id="name"
              onChange={(e) => setInfo({ ...info, username: e.target.value })}
              type="text"
              name="name"
            />
            <label htmlFor="name" className={styles.label_name}>
              <span className={styles.content_name}>Username</span>
              {errors.username && (
                <small className={styles.errors}>{errors.username}</small>
              )}
            </label>
          </section>

          <section className={styles.form_field}>
            <input
              id="legalName"
              type="text"
              name="legalName"
              onChange={(e) => setInfo({ ...info, legalName: e.target.value })}
            />
            <label htmlFor="legalName" className={styles.label_name}>
              <span className={styles.content_name}>Full Name</span>
              {errors.legalName && (
                <small className={styles.errors}>{errors.legalName}</small>
              )}
            </label>
          </section>

          <section className={styles.form_field}>
            <input
              id="phoneNumber"
              type="text"
              name="phoneNumber"
              onChange={(e) => setInfo({ ...info, phoneNumber: e.target.value })}
            />
            <label htmlFor="phoneNumber" className={styles.label_name}>
              <span className={styles.content_name}>Phone Number</span>
              {errors.phoneNumber && (
                <small className={styles.errors}>{errors.phoneNumber}</small>
              )}
            </label>
          </section>

          <section className={styles.form_field}>
            <input
              id="email"
              name="email"
              type="email"
              onChange={(e) => setInfo({ ...info, email: e.target.value })}
            />
            <label htmlFor="email" className={styles.label_name}>
              <span className={styles.content_name}>Email</span>
              {errors.email && (
                <small className={styles.errors}>{errors.email}</small>
              )}
            </label>
          </section>

          <section className={styles.form_field}>
            <input
              id="password"
              name="password"
              type="password"
              onChange={(e) => setInfo({ ...info, password: e.target.value })}
            />

            <label htmlFor="password" className={styles.label_name}>
              <span className={styles.content_name}>Password</span>
              {errors.password && (
                <small className={styles.errors}>{errors.password}</small>
              )}
            </label>
          </section>

          <section className={styles.form_field}>
            <input
              id="repassword"
              name="repassword"
              type="password"
              onChange={(e) =>
                setInfo({ ...info, repeatpassword: e.target.value })
              }
            />

            <label htmlFor="repassword" className={styles.label_name}>
              {!errors.repeatpassword && (
                <span className={styles.content_name}>Confirm Password</span>
              )}
              {errors.repeatpassword && (
                <small className={styles.errors}>{errors.repeatpassword}</small>
              )}
            </label>
          </section>

          <section className={styles.form_field}>
            {loading && <LoadingDotsDark />}

            {!loading && (
              <button id="button" type="submit" className={styles.button}>
                Signup
              </button>
            )}
          </section>
        </form>
      </main>
      <Footer class={style.footer} />
      <Background />
    </>
  );
};

export default SignUp;
