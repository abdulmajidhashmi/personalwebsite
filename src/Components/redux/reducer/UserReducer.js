import { createSlice } from "@reduxjs/toolkit";

const UserSlice = createSlice({
  name: "user",
  initialState: {
    value:{
     number:"no user",
    },},

  reducers: {

    adddata:(state,action)=>{

        state.value = action.payload;
    }
  },
});


export const{adddata}  = UserSlice.actions;
export default UserSlice.reducer;