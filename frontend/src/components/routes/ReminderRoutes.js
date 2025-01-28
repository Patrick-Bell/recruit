import axios from "axios";

const apiUrl = 'http://localhost:3000/api'


export const addReminder = async (formData) => {
    const response = await axios.post(`${apiUrl}/reminders`, { reminder: formData }, { withCredentials: true} )
    return response.data
}

export const getReminders = async () => {
    const response = await axios.get(`${apiUrl}/reminders`, { withCredentials: true })
    return response.data
}

export const deleteReminders = async (id) => {
    const response = await axios.delete(`${apiUrl}/reminders/${id}`, { withCredentials:true })
    return response.data
}