import {createSlice} from "@reduxjs/toolkit";
import {userStore} from "../Types";

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null,
    },
    reducers: {
        login: (state, action) => {
            state.user = action.payload;
        },
        logout: (state) => {
            state.user = null;
        },
    },
});

export const {login, logout} = userSlice.actions;

export const selectUser = (state: userStore) => state.user.user;
