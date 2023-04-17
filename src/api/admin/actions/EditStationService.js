import axios from "../../customAxiosConfig/CustomAxiosConfig";

const EditStationService = async (currName, newName, capacity) => {
  return axios.put("/edit-station", {
      currName: currName,
      newName: newName,
      newCapacity: capacity
    }).catch(function (error) {
      return error.response;
    });
} 

export default EditStationService
