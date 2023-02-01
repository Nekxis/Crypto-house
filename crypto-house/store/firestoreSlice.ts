import {createSlice} from "@reduxjs/toolkit";
import {popper} from "@popperjs/core";


export const firestoreSlice = createSlice({
    name: 'store',
    initialState: {
        theFirestore: [],
    },
    reducers: {
        setFirestore: (state, action) => {
            const newFirestore = action.payload
            state.theFirestore = newFirestore?.theFirestore.theFirestore
            console.log(state.theFirestore, action.payload)
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


export const {setFirestore, addItem, removeItem} = firestoreSlice.actions
export const selectFirestore = (state: any) => state.theFirestore;


