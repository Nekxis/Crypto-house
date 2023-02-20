import {configureStore} from '@reduxjs/toolkit';
import {userSlice} from "./userSlice"
import {coinApi} from "./apiSlice";
import {firestoreSlice} from "./firestoreSlice";

export const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        theFirestore: firestoreSlice.reducer,
        [coinApi.reducerPath]: coinApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(coinApi.middleware),
});
