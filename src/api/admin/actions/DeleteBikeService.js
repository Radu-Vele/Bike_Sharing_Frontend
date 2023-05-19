import axios from "../../customAxiosConfig/CustomAxiosConfig";

const DeleteBikeService = async (bikeId) => {
  return axios.delete("/delete-bike", {params: {
        bikeId: bikeId
    }}).catch(function (error) {
      return error.response;
    });
} 

export default DeleteBikeService;
