import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authUcenikService, { LoginUcenikData, RegisterUcenikData } from "./authUcenikService";

const ucenikToken: string = (localStorage.getItem('ucenikToken') as string);

export interface IUcenik {
    ime: string;
    prezime: string;
    email: string;
    jbmg: string;
    razredId: string;
    imeRoditelja: string;
    datumRodjenja: Date;
    ucenikToken: string;
}

export interface IInitialState {
    ucenik: IUcenik | null;
    isError: boolean;
    isLoading: boolean;
    isSuccess: boolean;
    message: string;
}

const initialState = {
    ucenik: null,
    isError: false, 
    isLoading: false,
    isSuccess: false,
    message: '',
} as IInitialState

export const register = createAsyncThunk('authUcenik/register', async (userData: RegisterUcenikData,   thunkAPI) => {
    try {
        return await authUcenikService.registerUcenik(userData);
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

export const login = createAsyncThunk('authUcenik/login', async (userData: LoginUcenikData, thunkAPI) => {
    try {
      return await authUcenikService.loginUcenik(userData)
    } catch (error: any) {
        const message = 
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
});

export const logout = createAsyncThunk('authUcenik/logout', async () => {
    authUcenikService.logoutUcenik();
})

export const getMe = createAsyncThunk('authUcenik/me', async (token: string, thunkAPI) => {
    try {
        return await authUcenikService.getMeUcenik(token);
    } catch (error: any) {
        const message = 
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
});

export const authUcenikSlice = createSlice({
    name: 'authUcenik',
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
                state.ucenik = action.payload
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload as string
                state.ucenik = null
            })
            .addCase(login.pending, (state) => {
                state.isLoading = true
              })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.ucenik = action.payload
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload as string
                state.ucenik = null
            })
            .addCase(logout.fulfilled, (state) => {
                state.ucenik = null
            })
            .addCase(getMe.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.ucenik = action.payload
            })
            .addCase(getMe.pending, (state) => {
                state.isLoading = true
              })
            .addCase(getMe.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload as string
                state.ucenik = null
            })
    }
});

export const { reset } = authUcenikSlice.actions;
export default authUcenikSlice.reducer;