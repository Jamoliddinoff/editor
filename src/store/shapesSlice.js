import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    list:JSON?.parse(localStorage.getItem('json'))?.list || [],
    arrows:JSON?.parse(localStorage.getItem('json'))?.arrows || [],
    shape:null,
    tempImage:null,
}


export const shapesSlice = createSlice({
    name: 'shapes',
    initialState,
    reducers: {
        createShape: (state,action) => {
            state.list.push({
                id: Math.round(Math.random()*1000000),
                ...action.payload
            })
            localStorage.setItem('json',JSON.stringify({...state}))

        },
        setShape: (state,action) => {
            const findElement = state.list.findIndex(item => item.id === action.payload.id);
            if(action.payload?.parentId){
                let list = [...action.payload?.list];
                let parent = list.find(x=>x.id===action.payload?.parentId)
                if(parent?.children){
                    let child = parent?.children.find(y=>y.id==action.payload.id);
                    let childIdx = parent?.children.findIndex(y=>y.id==action.payload.id);
                    let children = [...parent.children];
                    children[childIdx]={
                        ...child,
                        width:action.payload.width,
                        height:action.payload.height,
                    };

                    if(child.id){
                        parent={
                            ...parent,
                            children:children,
                        }
                        const i = state.list.findIndex(item => item.id === action.payload.parentId);
                        list[i] = parent
                        state.list=list
                    }
                }

            } else {
                state.list[findElement] = {...state.list[findElement], ...action.payload}
            }
            localStorage.setItem('json',JSON.stringify({...state}))

        },
        uploadJson:(state,action) => {
            if(action.payload.shapes){
                state.list=action.payload.shapes;
            }
            if(action.payload.arrows){
                state.arrows=action.payload.arrows;
            }
            localStorage.setItem('json',JSON.stringify({...state}))

        },

        createHotspotChild:(state,action) => {
            const findIndex = state.list.findIndex(item => item.id === action.payload.childShape.parentId);
            const findElement = action.payload.list.find(item => item.id === action.payload.childShape.parentId);
            if(findElement){
                if(findElement.children){
                    state.list[findIndex] = {
                        ...findElement,
                        children:[
                            ...findElement?.children,
                            {
                                ...action.payload.childShape,
                                id: Math.round(Math.random()*1000000)
                            }
                        ]
                    }
                } else {
                    state.list[findIndex] = {
                        ...findElement,
                        children:[
                            {
                                ...action.payload.childShape,
                                id: Math.round(Math.random()*1000000)
                            }
                        ]
                    }
                }

                localStorage.setItem('json',JSON.stringify({...state}))
            }
        },

        removeShape: (state, action) => {
            const findElement = state.list.findIndex(item => item.id === action.payload.id);
            if(action.payload?.parentId){
                let list = action.payload?.list;
                let parent = list.find(x=>x.id===action.payload?.parentId)
                if(parent?.children){
                    let child = parent?.children.find(y=>y.id==action.payload.id);

                    if(child.id){
                        parent={
                            ...parent,
                            children:parent?.children.filter(x=>x.id!=child.id)
                        }
                        debugger
                        state.list=[...action.payload.list,parent]
                    }
                }

            } else {
                state.list.splice(findElement,1)
            }

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
            localStorage.removeItem('json');

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
export const {
    createShape,
    setShape,
    removeShape,
    createArrow,
    setArrow,
    clearArrow,
    clearBoard,
    setAllShapes,
    handleShape,
    getTempImage,
    createHotspotChild,
    uploadJson
} = shapesSlice.actions

export default shapesSlice.reducer;
