import { createSlice } from "@reduxjs/toolkit";

const OnlineSlice = createSlice({

name:'online',
initialState:{

    value:[{
        number:9145043400,
        staus:"online"

    },{
        number:1234567890,
        staus:"offline"
    }],
},
reducers:{

    isOnlineReducer:(state,action)=>{

    },
    isOfflineReducer:(state,action)=>{


    }
}
    
})
export const{isOfflineReducer,isOnlineReducer} = OnlineSlice.actions;
export default OnlineSlice.reducer;