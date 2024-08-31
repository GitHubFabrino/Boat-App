// src/profileSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchAllUser, fetchUserByEmailAndPwd } from './database';
import { AppThunk } from './store';
import { User } from '@/app/(tabs)/BottomTab/Project.Interface';

interface ProfileState {
    profile: User[]
}

const initialState: ProfileState = {
    profile: []
};

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setProfile(state, action: PayloadAction<User[]>) {
            state.profile = action.payload;
        },
        lougout(state) {
            // state.profile. = [];
        },
    },
});

export const { setProfile, lougout } = profileSlice.actions;
export default profileSlice.reducer;
export const loadUser = (email: string, pwd: string): AppThunk => async dispatch => {
    try {
        const user = await fetchUserByEmailAndPwd(email, pwd);
        if (user) {
            console.log('profile : ', user);
            dispatch(setProfile(user));
        }
    } catch (error) {
        console.error('Failed to load projects from database', error);
    }
};

export const loadAllUser = (): AppThunk => async dispatch => {
    try {
        const user = await fetchAllUser();
        if (user) {
            console.log('profile : ', user);
            dispatch(setProfile(user));
        }
    } catch (error) {
        console.error('Failed to load projects from database', error);
    }
};
