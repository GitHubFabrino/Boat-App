
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from './store';
import { Equipe, User } from '@/app/(tabs)/BottomTab/Project.Interface';
import { deleteEquipeFromDB, deleteProjectFromDB, fetchEquipeByUserId, findEquipeById, insertEquipeInDb } from './database';

interface EquipeState {
    equipe: Equipe[]
}

const initialState: EquipeState = {
    equipe: []
};

const equipeSlice = createSlice({
    name: 'equipe',
    initialState,
    reducers: {
        setEquipe(state, action: PayloadAction<Equipe[]>) {
            state.equipe = action.payload;
        },
        ajoutEquipe(state, action: PayloadAction<{ newEquipe: Equipe }>) {
            const { newEquipe } = action.payload;
            if (!state.equipe) {
                state.equipe = [];
            }
            state.equipe.push(newEquipe);
        },
        deleteEquipe(state, action: PayloadAction<number>) {
            state.equipe = state.equipe.filter(eq => eq.id !== action.payload);
        },

    },
});

export const { setEquipe, ajoutEquipe, deleteEquipe } = equipeSlice.actions;
export default equipeSlice.reducer;

export const loadEquipe = (userId: number): AppThunk => async dispatch => {
    try {
        const equipe = await fetchEquipeByUserId(userId);
        console.log('EQUIPE ALL : ', equipe); // Ajoutez ceci pour vérifier les données récupérées
        dispatch(setEquipe(equipe));
    } catch (error) {
        console.error('Failed to load projects from database', error);
    }
};

export const removeEquipe = (idEquipe: number): AppThunk => async dispatch => {
    try {
        await deleteEquipeFromDB(idEquipe);
        dispatch(deleteEquipe(idEquipe));
    } catch (error) {
        console.error('Failed to delete project from database', error);
    }
};

export const insertEquipeToDb = (equipe: Equipe): AppThunk => async dispatch => {
    try {

        const insertEquipeId = await insertEquipeInDb(equipe)
        console.log("ID IN DB EQUIPE : ", insertEquipeId);

        const newEquipefromDb = await findEquipeById(insertEquipeId)
        dispatch(ajoutEquipe({ newEquipe: newEquipefromDb[0] }));

    } catch (error) {
        console.error('Failed to insert user:', error);
    }
};