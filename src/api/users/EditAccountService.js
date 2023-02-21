import React from "react";
import axios from "../customAxiosConfig/CustomAxiosConfig";
import AuthenticationService from "../authentication/AuthenticationService";

const EditAccountService = (info) => {
    let username = AuthenticationService.getLoggedInUser();
    let userBody = {
        username:username,
        legalName:info.legalName,
        phoneNumber:info.phoneNumber
    }

    //perform an edit request
    try{
        return axios.put("/edit-account", userBody);
    } catch (err) {
        let error = "";
        if(err.response) {
            error += err.response;
        }
        return error;
    }
}

export default EditAccountService;