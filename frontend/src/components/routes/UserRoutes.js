import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:3000/api'

export const sendEmailSummary = async () => {
    const response = await axios.post(`/api/send_summary`, {}, { withCredentials: true })
    return response.data
}

