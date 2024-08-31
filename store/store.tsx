
import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice'
import profileReducer from './profileSlice'
import projectReducer from './projectSlice'
import equipeReducer from './equipeSlice'

const store = configureStore({
    reducer: {
        auth: authReducer,
        profile: profileReducer,
        projects: projectReducer,
        equipe: equipeReducer
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
export default store;


