import {configureStore} from '@reduxjs/toolkit';
import UserReducer from '../reducer/UserReducer'


const Store = configureStore({

    reducer:{

        User:UserReducer,
    },
})

export default Store;