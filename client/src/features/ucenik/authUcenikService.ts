import axios from 'axios';
const API_URL = 'http://localhost:5000/api/ucenik';


export interface RegisterUcenikData {
    ime: string;
    prezime: string;
    jbmg: string;
    datumRodjenja: Date;
    imeRoditelja: string;
    razredId: string;
    email: string;
    adminToken: string;
}

export interface LoginUcenikData {
    email: string;
    sifra: string;
}

// Register user
const registerUcenik = async (data: RegisterUcenikData) => {
    const axiosInstance = axios.create({
        baseURL: API_URL,
        headers: {'Authorization': 'Bearer '+ data.adminToken}
      })
    
    const response = await axiosInstance.post(API_URL, {    
        ime: data.ime,
        prezime: data.prezime,
        jbmg: data.jbmg,
        razredId: data.razredId, 
        email: data.email,
        datumRodjenja: data.datumRodjenja,
        imeRoditelja: data.imeRoditelja
    });
    
    // if (response.data.token) { 
    //     localStorage.setItem('profesorToken', (response.data.token));
    // }

    return response.data;
}

// Login user
const loginUcenik = async (data: LoginUcenikData) => {
    const response = await axios.post(API_URL + '/login', data);

    if (response.data.token) {
        localStorage.setItem('ucenikToken', (response.data.token));
    }

    return response.data
}

//Get user data
const getMeUcenik = async (ucenikToken: any) => {
    const config = {
        headers: { Authorization: `Bearer ${ucenikToken}` }
    };

    const response = await axios.get(API_URL + '/me', config);
    
    // if (response.data.token) {
    //     localStorage.setItem('token', JSON.stringify(response.data.token));
    // }

    return response.data;
}

const logoutUcenik = () => {
    localStorage.removeItem('ucenikToken');
}

const authUcenikService = {
    registerUcenik,
    loginUcenik,
    logoutUcenik, 
    getMeUcenik
}

export default authUcenikService;