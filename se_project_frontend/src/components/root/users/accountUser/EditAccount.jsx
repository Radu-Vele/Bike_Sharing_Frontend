import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import styles from "../../../../css/Forms.module.css";
import { useLocation } from "react-router-dom";
import LoadingDotsDark from "../login/animation/LoadingDotsDark";
import Background from "../../fragments/background/Background";
import EditAccountService from "../../../../api/users/EditAccountService";

const EditAccount = () => {
    const navigate = useNavigate();
    const location = useLocation();
  
    const [info, setInfo] = useState({
        legalName: "",
        phoneNumber: "",
    });
  
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

  
    const validate = () => {
      const errors = {};
  
      if (info.legalName.length < 2 || info.legalName.length > 20) {
        errors.legalName = "2 and 20 char";
      }
  
      if (!/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im.test(info.phoneNumber)) { 
        errors.phoneNumber = "Invalid phone number";
      }

      return errors;
    };
  
    const submitHandler = async (event) => {
        event.preventDefault();
        let errors = validate(info);
        setErrors(errors)

        if (Object.keys(errors).length === 0) {
            const response = await EditAccountService(info);
            setLoading(true);
            if (response.status === 201) {
                setLoading(false);
                window.location.reload(false);
            }
            else {
              setLoading(false);
              console.log(errors);
            }
        }

    };
  
    return (
      <>
        <main className={styles.form_style}>
          <h2>Edit account</h2>
            <form id="userInfo" onSubmit={submitHandler}>

            <section className={styles.form_field}>
                <input
                defaultValue=""
                type="text"
                name="name"
                onChange={(e) => setInfo({ ...info, legalName: e.target.value })}
                />

                <label htmlFor="name" className={styles.label_name}>
                <span className={styles.content_name}>Full Name</span>
                {errors.legalName && (
                    <small className={styles.errors}>Invalid Full Name</small>
                )}
                </label>
            </section>

            <section className={styles.form_field}>
                <input
                defaultValue=""
                type="text"
                name="phoneNumber"
                onChange={(e) => setInfo({ ...info, phoneNumber: e.target.value })}
                />

                <label htmlFor="name" className={styles.label_name}>
                <span className={styles.content_name}>Phone Nr.</span>
                {errors.phoneNumber && (
                    <small className={styles.errors}>Invalid Phone Number</small>
                )}
                </label>
            </section>
  
            <article className={styles.form_field}>
              {loading && <LoadingDotsDark />}
  
              {!loading && (
                <button id="button" type="submit" className={styles.button}>
                  Save
                </button>
              )}
            </article>
          </form>
        
        </main>
        
        <Background />
    </>
    
    );
  };

export default EditAccount;