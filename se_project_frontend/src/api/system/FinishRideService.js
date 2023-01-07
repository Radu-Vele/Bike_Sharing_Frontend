import React from "react";
import axios from "axios";

const FinishRideService = (info) => {
  try {
    return axios.put("/finish-ride", info);
  } catch (err) {
    let error = "";
    if (err.response) {
      error += err.response;
    }
    return error;
  }
};

export default FinishRideService;