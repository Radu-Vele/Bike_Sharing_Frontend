import React from "react";
import axios from "../customAxiosConfig/CustomAxiosConfig";

const ImportInitialStations = () => {
  try {
    return axios.post("/init-stations-bikes-csv");
  } catch (err) {
    let error = "";
    if (err.response) {
      error += err.response;
    }
    return error;
  }
};

export default ImportInitialStations;