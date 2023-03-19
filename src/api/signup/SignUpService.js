import axios from "../customAxiosConfig/CustomAxiosConfig";

function createSignupBody(user) {
  const body = {
    username: user.username,
    legalName: user.legalName,
    phoneNumber: user.phoneNumber,
    email: user.email,
    password: user.password
  };
  return body;
}

const SignUpService = (user, isAdmin) => {
  try {
    if(isAdmin.signUpAdmin) {
      console.log("got to the point I send the request");
      return axios.post(`/signup-admin`, createSignupBody(user));
    }
    else {
      return axios.post(`/signup`, createSignupBody(user));
    }
  } catch (err) {
    let error = "";
    if (err.response) {
      error += err.response;
    }
    return error;
  }
};

export default SignUpService;