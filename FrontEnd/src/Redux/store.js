import {configureStore} from '@reduxjs/toolkit';
import { DarkModeReducer } from './reducer/darkmode';
import { userReducer } from './reducer/user';
import { chatReducer } from './reducer/chat';
const store = configureStore({
    reducer:{
        mode : DarkModeReducer,
        user : userReducer,
        chat:chatReducer,
    }
})

export default store;