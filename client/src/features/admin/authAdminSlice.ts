import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authAdminService, { LoginAdminData, RegisterAdminData } from "./authAdminServcies";

const adminToken: string = (localStorage.getItem('adminToken') as string);

export interface IAdmin {
    ime: string;
    email: string;
    adminToken: string; 
}

export interface IInitialState {
    admin: IAdmin | null;
    isError: boolean;
    isLoading: boolean;
    isSuccess: boolean;
    message: string;
}

const initialState = {
    admin: null,
    isError: false, 
    isLoading: false,
    isSuccess: false,
    message: ''
} as IInitialState

export const register = createAsyncThunk('authAdmin/register', async (userData: RegisterAdminData, thunkAPI) => {
    try {
        return await authAdminService.registerAdmin(userData);
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

export const login = createAsyncThunk('authAdmin/login', async (userData: LoginAdminData, thunkAPI) => {
    try {
      return await authAdminService.loginAdmin(userData)
    } catch (error: any) {
        const message = 
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
});

export const logout = createAsyncThunk('authAdmin/logout', async () => {
    authAdminService.logoutAdmin();
})

export const getMe = createAsyncThunk('authAdmin/me', async (token: string, thunkAPI) => {
    try {
        return await authAdminService.getMeAdmin(token);
    } catch (error: any) {
        const message = 
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
});

export const authAdminSlice = createSlice({
    name: 'authAdmin',
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
                state.admin = action.payload
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload as string
                state.admin = null
            })
            .addCase(login.pending, (state) => {
                state.isLoading = true
              })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.admin = action.payload
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload as string
                state.admin = null
            })
            .addCase(logout.fulfilled, (state) => {
                state.admin = null
            })
            .addCase(getMe.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.admin = action.payload
            })
            .addCase(getMe.pending, (state) => {
                state.isLoading = true
              })
            .addCase(getMe.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload as string
                state.admin = null
            })
    }
});

export const { reset } = authAdminSlice.actions;
export default authAdminSlice.reducer;