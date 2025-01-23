import axios from "axios";

const apiUrl = 'http://localhost:3000/api'

export const getCandidates = async () => {
    const response = await axios.get(`${apiUrl}/candidates`, { withCredentials: true })
    return response.data
}

export const readMessage = async (id) => {
    const response = await axios.put(`${apiUrl}/candidates/${id}`, { added_to_system: true }, { withCredentials: true })
    return response.data
}

export const moveApplicant = async (id, toStage) => {
    const response = await axios.put(`${apiUrl}/applicants/${id}`, { stage: toStage }, { withCredentials: true })
    return response.data
}

export const findOneApplicant = async (id) => {
    const response = await axios.get(`${apiUrl}/applicants/${id}`, { withCredentials: true })
    return response.data
}