import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:3000/api'


export const addReminder = async (formData) => {
    const response = await axios.post(`/api/reminders`, { reminder: formData }, { withCredentials: true} )
    return response.data
}

export const getReminders = async () => {
    const response = await axios.get(`/api/reminders`, { withCredentials: true })
    return response.data
}

export const deleteReminders = async (id) => {
    const response = await axios.delete(`/api/reminders/${id}`, { withCredentials:true })
    return response.data
}