import axios from "../customAxiosConfig/CustomAxiosConfig"
import AuthenticationService from "../authentication/AuthenticationService"

const UserDetailsService = () => {
    let username = AuthenticationService.getLoggedInUser();

    //perform a delete request
    try{
        return axios.delete('/delete-account', {
            params: {
                username,
            },
        });
    } catch (err) {
        let error = "";
        if(err.response) {
            error += err.response;
        }
        return error;
    }
}

export default UserDetailsService;