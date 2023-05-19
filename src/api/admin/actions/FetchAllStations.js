import axios from "../../customAxiosConfig/CustomAxiosConfig";

const FetchStationsService = async () => {
  return axios.get("/get-stations").catch(function (error) {
      return error.response;
    });
} 

export default FetchStationsService
