import axios from "../../customAxiosConfig/CustomAxiosConfig";

const AddFreshBikeHere = async (stationName) => {
  return axios.post("/add-fresh-bike?stationName=".concat(stationName)
  ).catch(function (error) {
      return error.response;
    });
} 

export default AddFreshBikeHere;
