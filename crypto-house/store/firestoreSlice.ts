import {createSlice} from "@reduxjs/toolkit";


export const firestoreSlice = createSlice({
    name: 'store',
    initialState:{
        theFirestore: [],
    },
    reducers: {
        setFirestorm:(state, action) => {
            state.theFirestore = action.payload
        },
        addItem: (state, action) => {
           state.theFirestore.push(action.payload)
        },
        removeItem: (state, action) => {
            state.theFirestore.filter(uuid => uuid !== action.payload)
        }

    },
    });

export const  {setFirestorm , addItem, removeItem } = firestoreSlice.actions
export const selectFirestore = (state: any) => state.theFirestore;

