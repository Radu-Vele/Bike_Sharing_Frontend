import axios from "../customAxiosConfig/CustomAxiosConfig"

const UserDetailsService = () => {

    //perform a delete request
    try{
        return axios.delete('/delete-account');
    } catch (err) {
        let error = "";
        if(err.response) {
            error += err.response;
        }
        return error;
    }
}

export default UserDetailsService;