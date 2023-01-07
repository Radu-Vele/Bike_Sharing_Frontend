import axios from "../customAxiosConfig/CustomAxiosConfig"
import AuthenticationService from "../authentication/AuthenticationService"

const RidesHistoryService = () => {
    let username = AuthenticationService.getLoggedInUser();

    //perform a get request to retrieve account information
    try{
        return axios.get('/ride-list', {
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

export default RidesHistoryService;