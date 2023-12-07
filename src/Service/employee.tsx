import { createSlice } from "@reduxjs/toolkit";


const initialState ={
    image:"",
    employees:[],
    loadingImage:false,
    errors:"",
    loading:false,
    ImageError:"",
    // employees: [],
    members:[],
    loadingMember:false,
    memberError:"",
    employee:{}
}

// const initialState = {
//     employees: [],
//     loading: false,
//     errors: "",
//   };

const employeeSlice = createSlice({
    name: "employees",
     initialState,
    reducers: {
        startLoading(state,action){
            state.loading = action.payload;
        },
        LoadingMember(state){
            state.loadingMember=true
        },
        getMembers(state, action){
            state.members = action.payload;
            state.loadingMember=false

        },
        getMembersFailure(state, action){
            state.memberError = action.payload;
            state.loadingMember=false
        },
        createEmployeeSuccess(state,action){
            state.employee = action.payload;
            // state.employees = action.payload;
            state.loading = false;
            state.errors = "";
        },
        createEmployeeFailure(state,action){
            state.loading = false;
            state.errors = action.payload
        },
        employeeLoading: (state) => {
                    state.loading = true;
                },
    
    getEmployeesSuccess: (state, { payload }) => {
        state.employees = payload;
            state.loading = false;
            state.errors = "";
        },
        getEmployeesFailure: (state, action) => {
            state.loading = false;
            state.errors = action.payload;
        },
        loadingImage(state,action){
            state.loadingImage = action.payload;
        },
        getImageSuccess(state,action){
            state.image = action.payload;
            state.loadingImage = false;
        },
        getImageFailure(state,action){
            state.loadingImage = false;
            state.ImageError=action.payload
        },
       
           
          
    }
  
})
    






export const EmployeeActions = employeeSlice.actions;
export default employeeSlice.reducer;



// export const EmployeeAction = employeeSlice.actions

// export default employeeSlice.reducer




// const employeeSlice = createSlice({
//     name:"employee",
//     initialState,
//     reducers:{

      
        