import React from "react";
import axios from "../customAxiosConfig/CustomAxiosConfig";

const FinishRideService = (rideId) => {
  try {
    return axios.put("/end-ride", null, { 
      params: { 
        rideId,
      },
    });

  } catch (err) {
    let error = "";
    if (err.response) {
      error += err.response;
    }
    return error;
  }
};

export default FinishRideService;