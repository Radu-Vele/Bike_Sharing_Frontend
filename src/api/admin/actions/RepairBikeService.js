import axios from "../../customAxiosConfig/CustomAxiosConfig";

const RepairBikeService = async (externalId) => {
  return axios.put("/repair-bike", {params : {
    externalId: externalId
  }}
  ).catch(function (error) {
      return error.response;
    });
} 

export default RepairBikeService;
