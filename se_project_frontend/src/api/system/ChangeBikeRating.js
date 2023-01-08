import React from "react";
import axios from "../customAxiosConfig/CustomAxiosConfig";

const ChangeBikeRating = (info) => {
  try {
    return axios.put("/calculate-rating", info);

  } catch (err) {
    let error = "";
    if (err.response) {
      error += err.response;
    }
    return error;
  }
};

export default ChangeBikeRating;