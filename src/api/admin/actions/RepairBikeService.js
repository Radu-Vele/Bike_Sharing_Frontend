import axios from "../../customAxiosConfig/CustomAxiosConfig";

const RepairBikeService = async (externalId) => {
  return axios.put("/repair-bike?externalId=".concat(externalId.toString()) //TODO: why does it only work like this
  ).catch(function (error) {
      return error.response;
    });
} 

export default RepairBikeService;
