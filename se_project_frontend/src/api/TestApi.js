import axios from "axios"

export default async () => {
    try {
        const response = await axios.get("http://localhost:8081/testMe")
        return response.data
    }
    catch (error) {
        return "Did not work"
    }
}