import axios from "axios";

const AuthenticateUserDataService = (username, password) => {
  return axios
    .post(`http://localhost:8081/authenticate`, {
      username,
      password,
    })
    .then((res) => {
      if (res != null) {
        return res;
      }
    })
    .catch((err) => {
      let error = "";

      if (err.response) {
        error += err.response;
      }
      return error;
    });
};

export default AuthenticateUserDataService;