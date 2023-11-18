import {configureStore} from '@reduxjs/toolkit';
import { chatReducer } from './reducer/darkmode';
import { userReducer } from './reducer/user';

const store = configureStore({
    reducer:{
        mode : chatReducer,
        user : userReducer,
    }
})

export default store;