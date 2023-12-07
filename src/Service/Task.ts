import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    loading:false,
    error:"",
    createTask:"",
    assignMessage:{},
    task: ["Project Name", "Status"],
    loadingTask: false,
    myTask:[],
    loadingApproval: false,
    loadingDecline: false,
    taskId: "",
    update: {},
    updateDecline: {},
    searchTask: [],
    search: "",
}

const TaskSlice = createSlice({
    name:"task",
    initialState,
    reducers:{
        createTask:(state, action) =>{
            state.loading=false
            state.createTask=action.payload
        },
        startLoading:(state) =>{
            state.loading=true
        },
        createTaskFailure:(state, action) =>{
            state.loading=false,
            state.error= action.payload
        },
        assignTask:(state, action) =>{
                state.assignMessage=action.payload
                state.loading=false
        },
        assignTaskFailure:(state, action) =>{
            state.loading=false
            state.error=action.payload
        },
        getTask: (state, action) => {
            state.task = action.payload;
            state.loadingTask = false;
          },
          getTaskError: (state, action) => {
            (state.loadingTask = false), (state.error = action.payload);
          },
          DeclineLoading: (state, action) => {
            state.loadingDecline = action.payload.loading;
            state.taskId = action.payload.id;
          },
          MyTask:(state, action) =>{
            state.myTask=action.payload
            state.loading=false
          },
          updateTask(state, action){
            state.loading=false
            state.update = action.payload
          }

    }
})


export const TaskActions = TaskSlice.actions

export default TaskSlice.reducer