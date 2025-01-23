import axios from "axios";

const apiUrl = 'http://localhost:3000'


export const fetchJobs = async () => {
    const response = await axios.get(`${apiUrl}/api/jobs`, { withCredentials: true })
    return response.data
}

export const addJob = async (job) => {
    const response = await axios.post(`${apiUrl}/api/jobs`, job, { withCredentials: true })
    return response.data
}

export const deleteJob = async (id) => {
    const response = await axios.delete(`${apiUrl}/api/jobs/${id}`, { withCredentials: true })
    return response.data
}

export const findOneJob = async (id) => {
    const response = await axios.get(`${apiUrl}/api/jobs/${id}`, { withCredentials: true })
    return response.data

}