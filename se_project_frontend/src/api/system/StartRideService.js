import React from "react";
import axios from "../customAxiosConfig/CustomAxiosConfig";

const StartRideService = (info) => {

  try {
    console.log(info);
    return axios.post("/init-ride", info);
  } catch (err) {
    let error = "";
    if (err.response) {
      error += err.response;
    }
    return error;
  }
};

export default StartRideService;