import axios from "../../customAxiosConfig/CustomAxiosConfig";

const FetchBikesData = (filters) => {
  try {
    return axios.post("/fetch-bikes-filtered", filters);
  } catch (err) {
    let error = "";
    if (err.response) {
      error += err.response;
    }
    return error;
  }
};

export default FetchBikesData;