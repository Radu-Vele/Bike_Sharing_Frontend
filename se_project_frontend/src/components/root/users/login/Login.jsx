import React from "react";
import Footer from "../../fragments/footer/Footer";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthenticationService from "../../../../api/authentication/AuthenticationService";
import LoginService from "../../../../api/login/LoginService";
import style from "../../../../css/Footer.module.css";
import AuthenticateUserDataService from "../../../../api/authentication/AuthenticateUserDataService";
import { TextField } from "@mui/material"
import { Container } from "@mui/system";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";

const Login = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const [loginState, setLoginState] = useState({
    hasLoginFailed: false,
    showSuccessMessage: false,
  });

  const validate = () => {
    const errors = {};

    if (!credentials.username) {
      errors.username = "Username required";
      errors.user_err = true; 
    } else if (credentials.username.length < 4) {
      errors.username = "Minimum 4 characters";
      errors.user_err = true; 
    }

    if (!credentials.password) {
      errors.password = "A password is required";
      errors.pass_err = true; 
    }
    return errors;
  };

  const handleSubmit = async (event) => {
    
    event.preventDefault();
    let errors = validate(credentials);
    setErrors(errors);
    console.log(errors);

    if (Object.keys(errors).length === 0) {
      setLoading(true);
      
      const res = await AuthenticateUserDataService(
        credentials.username,
        credentials.password
      );
      console.log(res.data);

      if (res.status !== 200) {
        setLoading(false);
        setLoginState((prevState) => ({ ...prevState, hasLoginFailed: true }));
        setLoginState((prevState) => ({
          ...prevState,
          showSuccessMessage: false,
        }));
      } 

      else {
        let jwtToken = res.data.jwtToken;
        const token = `Bearer ${jwtToken}`;
        
        AuthenticationService.setUpToken(token);
        
        const response = await LoginService(credentials.username, jwtToken);
        console.log(response);
        
        if (response.status !== 200) {
          setLoading(false);
          setLoginState((prevState) => ({
            ...prevState,
            hasLoginFailed: true,
          }));
          setLoginState((prevState) => ({
            ...prevState,
            showSuccessMessage: false,
          }));
        } else if (response.data === "USER") {
          AuthenticationService.registerSuccessfulLoginUser(
            credentials.username
          );
          navigate("/user-home");
        }
      }
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Typography component="h1" variant="h5">
          Log in
      </Typography >

      <Typography hidden={!loginState.hasLoginFailed} color="red">
        Invalid credentials
      </Typography >

      <Typography hidden={!loginState.showSuccessMessage} color="red">
        Login successful
      </Typography >

      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            onChange= { (e) => setCredentials({ ...credentials, username: e.target.value })}
            autoFocus
            error = {errors.user_err}
            helperText={errors.username}
          />
        <TextField
            margin="normal"s
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={ (e) => setCredentials({ ...credentials, password: e.target.value })}
            error = {errors.pass_err}
            helperText={errors.password}
          />

        <LoadingButton
            color="primary"
            loading={ loading }
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
        </LoadingButton>
      </Box>             
      <Footer class={style.footer_cover} />
    </Container>
  );
};

export default Login;
