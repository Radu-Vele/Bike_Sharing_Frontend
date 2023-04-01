import axios from "../../customAxiosConfig/CustomAxiosConfig";

const FetchRidesData = (timeInterval) => {
  try {
    return axios.post("/fetch-rides-statistics", timeInterval);
  } catch (err) {
    let error = "";
    if (err.response) {
      error += err.response;
    }
    return error;
  }
};

export default FetchRidesData;