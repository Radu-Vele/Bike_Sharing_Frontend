import axios from "axios"
const REGISTER_URL = "http://localhost:8081/api/v1/registration"

export default async(userName, legalName, email, password) => {

    try {
        const response = await axios.post(REGISTER_URL, {
                userName : userName,
                legalName: legalName,
                email: email,
                password: password
        })
        return response.data
    }
    catch (error) {

    }
}