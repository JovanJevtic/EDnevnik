import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import predmetService, { CreatePredmetData, UpdatePredmetData, GetPredmetData } from './predmetService';

export interface IPredmet {
    _id: string;
    ime: string;
    profesori: string[]; 
}

export interface IInitialState {
    predmeti: IPredmet[] | null;
    isError: boolean;
    isLoading: boolean;
    isSuccess: boolean;
    message: string;
}

const initialState = {
    predmeti: null,
    isError: false, 
    isLoading: false,
    isSuccess: false,
    message: ''
} as IInitialState

export const getPredmeti = createAsyncThunk('predmet/getPredmeti', async (token, thunkAPI) => {
    try {
        return await predmetService.getPredmeti(token);
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

export const createPredmet = createAsyncThunk('predmet/createPredmet', async (userData: CreatePredmetData, thunkAPI) => {
    try {
      return await predmetService.createPredmet(userData)
    } catch (error: any) {
        const message = 
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
});

export const updatePredmet = createAsyncThunk('predmet/updatePredmet', async (userData: UpdatePredmetData, thunkAPI) => {
    try {
        return await predmetService.updatePredmet(userData);
      } catch (error: any) {
          const message = 
          (error.response && error.response.data && error.response.data.message) ||
          error.message ||
          error.toString()
        return thunkAPI.rejectWithValue(message)
      }
})

export const getPredmet = createAsyncThunk('predmet/getPredmet', async (data: GetPredmetData, thunkAPI) => {
    try {
        return await predmetService.getPredmet(data);
    } catch (error: any) {
        const message = 
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
});

export const predmetSlice = createSlice({
    name: 'predmetSlice',
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
            .addCase(getPredmet.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getPredmet.fulfilled, (state, action) => {
                state.isSuccess = true
                state.isLoading = false
                state.predmeti = action.payload
            })
            .addCase(getPredmet.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload as string
                state.predmeti = null
            })
            .addCase(createPredmet.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.predmeti?.push(action.payload)
            })
            .addCase(createPredmet.pending, (state) => {
                state.isLoading = true
              })
            .addCase(createPredmet.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload as string
            })
            .addCase(updatePredmet.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.predmeti?.push(action.payload); 
            })
            .addCase(updatePredmet.pending, (state) => {
                state.isLoading = true
              })
            .addCase(updatePredmet.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload as string
            })
            .addCase(getPredmeti.pending, (state) => {
                state.isLoading = true
              })
            .addCase(getPredmeti.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.predmeti = action.payload
            })
            .addCase(getPredmeti.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload as string
            })
    }
});

export const { reset } = predmetSlice.actions;
export default predmetSlice.reducer;