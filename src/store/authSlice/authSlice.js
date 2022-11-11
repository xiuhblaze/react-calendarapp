import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        status: 'checking', // checking, authenticated, not-authenticated
        isSaving: false,
        user: {},
        errorMessage: undefined
    },
    reducers: {
        onChecking: (state) => {
            state.status        = 'checking';
            state.user          = {};
            state.errorMessage  = undefined;
        },
        onLogin: (state, action) => {
            state.status        = 'authenticated';
            state.isSaving      = false;
            state.user          = action.payload;
            state.errorMessage  = undefined;
        },
        onLogout: (state, action) => {
            state.status        = 'not-authenticated';
            state.user          = {};
            state.errorMessage  = action.payload;
        },
        onRegister: (state) => {
            state.isSaving = true;
        },
        clearErrorMessage: (state) => {
            state.errorMessage  = undefined;
        }
    }
});

// Action creators are generated for each case reducer function
export const { onChecking, onLogin, onLogout, onRegister, clearErrorMessage } = authSlice.actions;