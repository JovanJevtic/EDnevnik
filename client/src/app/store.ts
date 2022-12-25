import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import authAdminReducer from '../features/admin/authAdminSlice';
import authProfesorReducer from '../features/profesor/authProfesorSlice';
import authUcenikReducer from '../features/ucenik/authUcenikSlice';

export const store = configureStore({
    reducer: {
        authAdmin: authAdminReducer,
        authProfesor: authProfesorReducer,
        authUcenik: authUcenikReducer
    }
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch    