import axios from "../customAxiosConfig/CustomAxiosConfig";

const EditAccountService = (info) => {
    let userBody = {
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