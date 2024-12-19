import {configureStore} from '@reduxjs/toolkit';
import UserReducer from '../reducer/UserReducer'
import OnlineReducer from '../reducer/OnlineReducer';


const Store = configureStore({

    reducer:{

        User:UserReducer,
        Online:OnlineReducer
    },
})

export default Store;