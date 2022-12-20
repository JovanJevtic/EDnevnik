import axios from 'axios';
const API_URL = 'http://localhost:5000/api/admin';


export interface RegisterAdminData {
    ime: string;
    email: string;
    adminSifra: string;
    sifra: string;
}

export interface LoginAdminData {
    email: string;
    sifra: string;
}

// Register user
const registerAdmin = async (data: RegisterAdminData) => {
    const response = await axios.post(API_URL, data);
    if (response.data.token) {
        localStorage.setItem('adminToken', (response.data.token));
    }

    return response.data;
}

// Login user
const loginAdmin = async (data: LoginAdminData) => {
    const response = await axios.post(API_URL + '/login', data);

    if (response.data.token) {
        localStorage.setItem('adminToken', (response.data.token));
    }

    return response.data
}

//Get user data
const getMeAdmin = async (token: any) => {
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };

    const response = await axios.get(API_URL + '/me', config);
    
    // if (response.data.token) {
    //     localStorage.setItem('token', JSON.stringify(response.data.token));
    // }

    return response.data;
}

const logoutAdmin = () => {
    localStorage.removeItem('adminToken');
}

const authAdminService = {
    registerAdmin,
    loginAdmin,
    logoutAdmin, 
    getMeAdmin
}

export default authAdminService;