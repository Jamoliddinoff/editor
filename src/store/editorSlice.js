import { createSlice } from '@reduxjs/toolkit'
import {EVENT_TYPES} from "../constants";

const initialState = {
    background:'#ffffff'
}

export const editorSlice = createSlice({
    name: 'events',
    initialState,
    reducers: {
        setBackground: (state,action) => {
            state.background=action.payload
        },
    },
})

export const { setBackground } = editorSlice.actions

export default editorSlice.reducer;
