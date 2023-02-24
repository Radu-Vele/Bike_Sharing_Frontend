import axios from "../customAxiosConfig/CustomAxiosConfig";

const LoginService = () => {
  try {
    return axios.post(`/login`, null, {});
  } catch (err) {
    let error = "";
    if (err.response) {
      error += err.response;
    }
    return error;
  }
};

export default LoginService;