import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:3000/api'

export const getCandidates = async () => {
    const response = await axios.get(`/api/candidates`, { withCredentials: true })
    return response.data
}

export const deleteOneCandidate = async (id) => {
    const response = await axios.delete(`/api/candidates/${id}`, { withCredentials:true })
    console.log('deleteing')
    return response.data
}



export const readMessage = async (id) => {
    const response = await axios.put(`/api/candidates/${id}`, { added_to_system: true }, { withCredentials: true })
    return response.data
}

export const moveApplicant = async (id, toStage) => {
    const response = await axios.put(`/api/applicants/${id}`, { stage: toStage }, { withCredentials: true })
    return response.data
}

export const findOneApplicant = async (id) => {
    const response = await axios.get(`/api/applicants/${id}`, { withCredentials: true })
    return response.data
}