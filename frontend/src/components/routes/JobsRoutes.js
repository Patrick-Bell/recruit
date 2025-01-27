import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:3000/api'


export const fetchJobs = async () => {
    const response = await axios.get(`${apiUrl}/jobs`, { withCredentials: true })
    return response.data
}

export const addJob = async (job) => {
    const response = await axios.post(`${apiUrl}/jobs`, job, { withCredentials: true })
    return response.data
}

export const deleteJob = async (id) => {
    const response = await axios.delete(`${apiUrl}/jobs/${id}`, { withCredentials: true })
    return response.data
}

export const findOneJob = async (id) => {
    const response = await axios.get(`${apiUrl}/jobs/${id}`, { withCredentials: true })
    return response.data

}