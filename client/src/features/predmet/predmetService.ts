import axios from 'axios';
const API_URL = 'http://localhost:5000/api/predmet';


export interface CreatePredmetData {
    ime: string;
    profesori: string[];
    adminToken: string;
}

export interface UpdatePredmetData {
    ime: string;
    profesori: string[];
    adminToken: string;
}

export interface GetPredmetData {
    ime: string;
}

const createPredmet = async (data: CreatePredmetData) => {
    const config = {
        headers: { Authorization: `Bearer ${data.adminToken}` }
    };
    const response = await axios.post(API_URL, data, config);

    return response.data;
}

const updatePredmet = async (data: UpdatePredmetData) => {
    const config = {
        headers: { Authorization: `Bearer ${data.adminToken}` }
    };

    const response = await axios.post(API_URL + `/${data.ime}`, data, config);

    return response.data
}

const getPredmet = async (data: GetPredmetData) => {
    const response = await axios.get(API_URL + `/${data.ime}`);

    return response.data;
}

const getPredmeti = async (token: any) => {
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };

    const response = await axios.get(API_URL, config);

    return response.data;
}

const predmetService = {
    createPredmet,
    updatePredmet,
    getPredmet,
    getPredmeti
}

export default predmetService;