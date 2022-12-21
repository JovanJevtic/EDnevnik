import axios from 'axios';
const API_URL = 'http://localhost:5000/api/profesor';


export interface RegisterProfesorData {
    ime: string;
    prezime: string;
    isRazrednik: boolean;
    predmet: string;
    email: string;
    adminToken: string;
}

export interface LoginProfesorData {
    email: string;
    sifra: string;
}

// Register user
const registerProfesor = async (data: RegisterProfesorData) => {
    const axiosInstance = axios.create({
        baseURL: API_URL,
        headers: {'Authorization': 'Bearer '+ data.adminToken}
      })
    
    const response = await axiosInstance.post(API_URL, {    
        ime: data.ime,
        prezime: data.prezime,
        isRazrednik: data.isRazrednik,
        predmet: data.predmet, 
        email: data.email
    });
    
    // if (response.data.token) { 
    //     localStorage.setItem('profesorToken', (response.data.token));
    // }

    return response.data;
}

// Login user
const loginProfesor = async (data: LoginProfesorData) => {
    const response = await axios.post(API_URL + '/login', data);

    if (response.data.token) {
        localStorage.setItem('profesorToken', (response.data.token));
    }

    return response.data
}

//Get user data
const getMeProfesor = async (profesorToken: any) => {
    const config = {
        headers: { Authorization: `Bearer ${profesorToken}` }
    };

    const response = await axios.get(API_URL + '/me', config);
    
    // if (response.data.token) {
    //     localStorage.setItem('token', JSON.stringify(response.data.token));
    // }

    return response.data;
}

const logoutProfesor = () => {
    localStorage.removeItem('profesorToken');
}

const authProfesorService = {
    registerProfesor,
    loginProfesor,
    logoutProfesor, 
    getMeProfesor
}

export default authProfesorService;