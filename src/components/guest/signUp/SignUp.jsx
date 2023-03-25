import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SignUpService from "../../../api/signup/SignUpService";
import { TextField } from "@mui/material"
import { Container } from "@mui/system";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";

const SignUp = (signupAdmin) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [info, setInfo] = useState({
    username: "",
    legalName: "",
    phoneNumber: "",
    email: "",
    password: "",
    repeatpassword: "",
  });

  const validate = () => {
    const errors = {};

    if (!info.username) {
      errors.username = "Required";
      errors.username_err = true;
    } 
    else if (info.username.length < 5) {
      errors.username = "Minimum 5 char";
      errors.username_err = true;
    }

    if (!info.legalName) {
      errors.legalName = "Required";
      errors.legalName_err = true;
    } 
    else if (info.legalName.length < 2 || info.legalName.length > 20) {
      errors.legalName = "2 to 20 char";
      errors.legalName_err = true;
    }

    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(info.email)) {
      errors.email = "Invalid email address";
      errors.email_err = true;
    }

    if (!info.password) {
      errors.password = "Required";
      errors.password_err = true;
    }
    if (!info.repeatpassword) {
      errors.repeatpassword = "Password repetation is required.";
      errors.repeatpassword_err = true;
    }
    if (info.password !== info.repeatpassword) {
      errors.repeatpassword = "Passwords don't match";
      errors.repeatpassword_err = true;
    }
    
    if(!info.phoneNumber) {
      errors.phoneNumber = "Required";
      errors.phoneNumber_err = true;
    } 
    else if (!/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im.test(info.phoneNumber)) {
      errors.phoneNumber = "Invalid phone number";
      errors.phoneNumber_err = true;
    }

    return errors;
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    let errors = validate(info);
    
    //hide labels
    setSuccess(false);
    setError(false);

    setErrors(errors);

    if (Object.keys(errors).length === 0) {
      setLoading(true);

      await SignUpService(info, signupAdmin)
        .then((response) => {
          if (response.status === 201) {
            if(!signupAdmin) {
              navigate("/login");
            }
            else {
              setError(false);
              setLoading(false);
              setSuccess(true);
            }
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
  <Container component="main" maxWidth="sm">
    <Typography component="h1" variant="h5">
          Sign up
    </Typography >

    <Typography hidden={!error} color="error">
      Invalid signup
    </Typography >

    <Typography hidden={!success} color="green">
      A new user was added successfully, you may now leave this page.
    </Typography >

    <Box component="form" onSubmit={submitHandler} noValidate sx={{ mt: 1 }}>
        <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            onChange= {(e) => setInfo({ ...info, username: e.target.value })}
            autoFocus
            error = {errors.username_err}
            helperText={errors.username}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="legalName"
            label="Full name"
            name="legalName"
            autoComplete="legalName"
            onChange= {(e) => setInfo({ ...info, legalName: e.target.value })}
            autoFocus
            error = {errors.legalName_err}
            helperText={errors.legalName}
          />
        <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email address"
            name="email"
            autoComplete="email"
            onChange= {(e) => setInfo({ ...info, email: e.target.value })}
            autoFocus
            error = {errors.email_err}
            helperText={errors.email}
          />
        <TextField
            margin="normal"
            required
            fullWidth
            id="phoneNumber"
            label="Phone number"
            name="phoneNumber"
            autoComplete="phoneNumber"
            onChange= {(e) => setInfo({ ...info, phoneNumber: e.target.value })}
            autoFocus
            error = {errors.phoneNumber_err}
            helperText={errors.phoneNumber}
          />
        <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="repassword"
            autoComplete="current-password"
            onChange={(e) => setInfo({ ...info, password: e.target.value })}
            error = {errors.password_err}
            helperText={errors.password}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Repeat Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange= {(e) => setInfo({ ...info, repeatpassword: e.target.value })}
            autoFocus
            error = {errors.repeatpassword_err}
            helperText={errors.repeatpassword}
          />
        <LoadingButton
            color="primary"
            loading={ loading }
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
        </LoadingButton>
      </Box>             
    </Container>
  );
};

export default SignUp;
