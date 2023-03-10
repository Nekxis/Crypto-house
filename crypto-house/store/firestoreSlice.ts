import {createSlice} from "@reduxjs/toolkit";
import {FirestoreStore} from "../Types";

export const firestoreSlice = createSlice({
    name: 'store',
    initialState: {
        theFirestore: [],
    },
    reducers: {
        setFirestore: (state, action) => {
            const newFirestore = action.payload
            state.theFirestore = newFirestore?.theFirestore.theFirestore
        },
        clearFirestore: (state) => {
            state.theFirestore = []
        },
        addItem: (state, action) => {
            // @ts-ignore
            state.theFirestore.push(action.payload)
        },
        removeItem: (state, action) => {

            // @ts-ignore
            const newFirestore = state.theFirestore.filter(item => item.uuid !== action.payload.uuid)
            state.theFirestore = newFirestore
        }

    },
});

export const {setFirestore, clearFirestore, addItem, removeItem} = firestoreSlice.actions
export const selectFirestore = (state: FirestoreStore) => state.theFirestore;


