import axios from "../customAxiosConfig/CustomAxiosConfig"
import AuthenticationService from "../authentication/AuthenticationService"

const UserDetailsService = () => {
    //perform a get request to retrieve account information
    try{
        return axios.get('/account-details');
    } catch (err) {
        let error = "";
        if(err.response) {
            error += err.response;
        }
        return error;
    }
}

export default UserDetailsService;