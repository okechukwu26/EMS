import {createSlice} from "@reduxjs/toolkit"


const initialState ={
    createProject:{},
    loading:false,
    error:"",
    detail:{},
    projectStep:0,
    getProject:[],
    allProject:[]
}

const projectSlice =createSlice({
    name:"project",
    initialState,
    reducers:{
        createProject:(state, action) =>{
            state.loading =false
            state.createProject=action.payload
        },
        getProject:(state, action) =>{
            state.getProject = action.payload
            state.loading=false
        },
        getProjectError:(state, action) =>{
            state.error=action.payload
            state.loading=false
        },
        startLoading:(state) =>{
            state.loading =true
        },
        createProjectFailure:(state, action) =>{
            state.loading=false
            state.error=action.payload
        },
        getDetail:(state, action) =>{
            state.detail=action.payload
        },
        changeStep:(state,action) =>{
            state.projectStep = action.payload
        },
        getAllProject:(state, action) =>{
            state.allProject = action.payload
            state.loading=false
        }
    }
})

export const projectAction = projectSlice.actions
export default projectSlice.reducer