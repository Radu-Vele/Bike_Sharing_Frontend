import axios from "../../customAxiosConfig/CustomAxiosConfig";

const AddNewStation = async (lat, long, capacity, name, saveToCSV, fillHalf) => {
  return axios.post("/create-station-options", {
      latitude: lat,
      longitude: long,
      maximumCapacity: capacity,
      name: name,
      saveToCSV: saveToCSV,
      fillHalf: fillHalf
    }).catch(function (error) {
      return error.response;
    });
} 

export default AddNewStation
