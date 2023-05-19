import axios from "../../customAxiosConfig/CustomAxiosConfig";

const BreakBikeService = async (externalId) => {
  return axios.put("/make-bike-unusable?externalId=".concat(externalId.toString())
  ).catch(function (error) {
      return error.response;
    });
} 

export default BreakBikeService;
