import { createSlice } from "@reduxjs/toolkit";
export const stringSlice = createSlice({
    name:'stringuuid',
    initialState:{
        value:''
    },
    reducers:{
        set:(state,action)=>
        {
            state.value = ''
            state.value = action.payload;
        },
    }
})

export const {set} = stringSlice.actions
export default stringSlice.reducer;