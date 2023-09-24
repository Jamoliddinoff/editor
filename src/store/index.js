import { configureStore } from '@reduxjs/toolkit'
import shapes from './shapesSlice'
import eventsType from './eventsSlice'
import editor from './editorSlice'

export const store = configureStore({
    reducer: {
        shapes,
        eventsType,
        editor
    },

})
