// src/authSlice.ts
import { User } from '@/app/(tabs)/BottomTab/Project.Interface';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from './store';
import { findUserById, updateUseToDb } from './database';
import { loadUser } from './profileSlice';

interface AuthState {
    isAuthenticated: boolean;
    id: number | null;
    nomUser: string | null;
    prenomUser: string | null;
    emailUser: string | null;
    passwordUser: string | null;
    photo: string | null
}

const initialState: AuthState = {
    isAuthenticated: false,
    id: null,
    nomUser: null,
    prenomUser: null,
    emailUser: null,
    passwordUser: null,
    photo: null
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login(state, action: PayloadAction<{ id: number; nomUser: string; prenomUser: string; emailUser: string; passwordUser: string; photo: string }>) {
            console.log(action.payload);
            state.isAuthenticated = true;
            state.id = action.payload.id;
            state.nomUser = action.payload.nomUser;
            state.prenomUser = action.payload.prenomUser;
            state.emailUser = action.payload.emailUser;
            state.passwordUser = action.payload.passwordUser;
            state.photo = action.payload.photo;
            console.log("after : ", action.payload);
        },
        Logout(state) {
            state.isAuthenticated = false;
            state.id = null;
            state.nomUser = null;
            state.prenomUser = null;
            state.emailUser = null;
            state.passwordUser = null;
        },
    },
});

export const { login, Logout } = authSlice.actions;
export default authSlice.reducer;

export const modifierUser = (Id: number, updateUser: User): AppThunk => async dispatch => {
    try {
        const user = await findUserById(Id)
        console.log("USER FIND : ", user);

        if (user) {
            const updateuser: User = {
                id: user.id,
                nomUser: updateUser.nomUser,
                prenomUser: updateUser.prenomUser,
                emailUser: updateUser.emailUser,
                passwordUser: updateUser.passwordUser,
                photo: updateUser.photo
            }
            await updateUseToDb(updateuser)
            const useraf = await findUserById(Id)
            console.log("USER after update ty : ", useraf);
            dispatch(loadUser(updateUser.emailUser, updateUser.passwordUser))
            dispatch(login(updateuser))
        }


    } catch (error) {
        console.error('Failed to insert user:', error);
    }
};