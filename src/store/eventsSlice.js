import { createSlice } from '@reduxjs/toolkit'
import {EVENT_TYPES} from "../constants";

const initialState = {
    type:EVENT_TYPES.CURSOR
}

export const eventSlice = createSlice({
    name: 'events',
    initialState,
    reducers: {
        setEvent: (state,action) => {
            state.type=action.payload
        },
    },
})

export const { setEvent } = eventSlice.actions

export default eventSlice.reducer;
