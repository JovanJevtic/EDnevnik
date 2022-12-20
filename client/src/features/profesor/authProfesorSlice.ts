import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authProfesorService, { LoginProfesorData, RegisterProfesorData } from "./authProfesorServices";

const profesorToken: string = (localStorage.getItem('profesorToken') as string);

export interface IProfesor {
    ime: string;
    prezime: string;
    email: string;
    token: string; 
    predmet: string;
    isRazrednik: string;
    profesorToken: string;
}

export interface IInitialState {
    profesor: IProfesor | null;
    isError: boolean;
    isLoading: boolean;
    isSuccess: boolean;
    message: string;
}

const initialState = {
    profesor: null,
    isError: false, 
    isLoading: false,
    isSuccess: false,
    message: '',
} as IInitialState

export const register = createAsyncThunk('authProfesor/register', async (userData: RegisterProfesorData,   thunkAPI) => {
    try {
        return await authProfesorService.registerProfesor(userData);
    } catch (error: any) {
        const message = 
            (error.response &&
                error.response.data &&
                error.response.data.message) ||
                error.message || 
                error.toString();    
        return thunkAPI.rejectWithValue(message);    
    }
});

export const login = createAsyncThunk('authProfesor/login', async (userData: LoginProfesorData, thunkAPI) => {
    try {
      return await authProfesorService.loginProfesor(userData)
    } catch (error: any) {
        const message = 
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
});

export const logout = createAsyncThunk('authProfesor/logout', async () => {
    authProfesorService.logoutProfesor();
})

export const getMe = createAsyncThunk('authProfesor/me', async (token: string, thunkAPI) => {
    try {
        return await authProfesorService.getMeProfesor(token);
    } catch (error: any) {
        const message = 
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
});

export const authProfesorSlice = createSlice({
    name: 'authProfesor',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false
            state.isError = false
            state.isSuccess = false
            state.message = ''
        }
    }, 
    extraReducers: (builder) => {
        builder 
            .addCase(register.pending, (state) => {
                state.isLoading = true
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isSuccess = true
                state.isLoading = false
                state.profesor = action.payload
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload as string
                state.profesor = null
            })
            .addCase(login.pending, (state) => {
                state.isLoading = true
              })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.profesor = action.payload
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload as string
                state.profesor = null
            })
            .addCase(logout.fulfilled, (state) => {
                state.profesor = null
            })
            .addCase(getMe.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.profesor = action.payload
            })
            .addCase(getMe.pending, (state) => {
                state.isLoading = true
              })
            .addCase(getMe.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload as string
                state.profesor = null
            })
    }
});

export const { reset } = authProfesorSlice.actions;
export default authProfesorSlice.reducer;