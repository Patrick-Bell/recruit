import axios from 'axios'
const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:3000/api'

export const sendMessage = async (message) => {
    const response = await axios.post(`/api/messages`, message, { withCredentials: true})
    return response.data
}

export const getMessages = async () => {
    const response = await axios.get(`/api/messages`, { withCredentials: true })
    return response.data
}

export const completeMessage = async (id) => {
    const response = await axios.put(`/api/messages/${id}`, { responded: true }, { withCredentials: true })
    return response.data
}