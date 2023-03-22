import React from "react";
import axios from "../customAxiosConfig/CustomAxiosConfig";

const FinishRideService = () => {
  try {
    return axios.put("/end-ride");
  } catch (err) {
    let error = "";
    if (err.response) {
      error += err.response;
    }
    return error;
  }
};

export default FinishRideService;