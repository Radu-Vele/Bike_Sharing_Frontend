import axios from "../../customAxiosConfig/CustomAxiosConfig";

const DeleteStation = async (station_name) => {
  return axios.delete("/delete-station", {params: {
        stationName: station_name
    }}).catch(function (error) {
      return error.response;
    });
} 

export default DeleteStation;
