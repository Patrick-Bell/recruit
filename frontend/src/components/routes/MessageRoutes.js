import axios from 'axios'
const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:3000/api'

export const sendMessage = async (message) => {
    const response = await axios.post(`${apiUrl}/messages`, message, { withCredentials: true})
    return response.data
}

export const getMessages = async () => {
    const response = await axios.get(`${apiUrl}/messages`, { withCredentials: true })
    return response.data
}

export const completeMessage = async (id) => {
    const response = await axios.put(`${apiUrl}/messages/${id}`, { responded: true }, { withCredentials: true })
    return response.data
}