
import { configureStore } from '@reduxjs/toolkit';
import {userSlice} from "./userSlice"
import {coinApi} from "./apiSlice";

export const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        [coinApi.reducerPath]: coinApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(coinApi.middleware),
});
