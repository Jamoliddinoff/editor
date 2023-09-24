import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    list:JSON.parse(localStorage.getItem('json'))?.list||[],
    arrows:JSON.parse(localStorage.getItem('json'))?.arrows||[],
    shape:null,
    tempImage:null,
}


export const shapesSlice = createSlice({
    name: 'shapes',
    initialState,
    reducers: {
        createShape: (state,action) => {
            state.list.push({
                id: Math.round(Math.random()*10000),
                ...action.payload
            })
            localStorage.setItem('json',JSON.stringify({...state}))

        },
        setShape: (state,action) => {
            const findElement = state.list.findIndex(item => item.id === action.payload.id);
            state.list[findElement] = {...state.list[findElement],...action.payload}
            localStorage.setItem('json',JSON.stringify({...state}))

        },
        removeShape: (state, action) => {
            const findElement = state.list.findIndex(item => item.id === action.payload.id);
            state.list.splice(findElement,1)
            localStorage.setItem('json',JSON.stringify({...state}))

        },
        createArrow:(state,action) =>{
            state.arrows.push({
                ...action.payload
            })
            localStorage.setItem('json',JSON.stringify({...state}))

        },
        handleShape:(state,action) => {
            state.shape = action.payload;
            localStorage.setItem('json',JSON.stringify({...state}))

        },
        getTempImage:(state,action) => {
            state.tempImage = action.payload;
            localStorage.setItem('json',JSON.stringify({...state}))

        },
        setArrow: (state,action) => {
            const findElement = state.arrows.findIndex(item => item.id === action.payload.id);
            state.arrows[findElement] = {...state.arrows[findElement],...action.payload}
            localStorage.setItem('json',JSON.stringify({...state}))

        },
        clearArrow: (state,action) => {
            state.arrows= action.payload.arrowss.filter(item=>item.id!==action.payload.id);
            localStorage.setItem('json',JSON.stringify({...state}))

        },
        clearBoard: (state) =>{
            state.list=[];
            state.arrows=[];
            localStorage.setItem('json','');

        },

        setAllShapes:(state,action) => {
            const {x,y,list,arrows} = action.payload;
            state.list=list.map(item => {
                return {...item,x:item.x-x,y:item.y-y}
            });
        }
    },
})

// Action creators are generated for each case reducer function
export const { createShape, setShape, removeShape,createArrow,setArrow ,clearArrow,clearBoard,setAllShapes,handleShape,getTempImage} = shapesSlice.actions

export default shapesSlice.reducer;
