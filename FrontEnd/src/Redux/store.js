import {configureStore} from '@reduxjs/toolkit';
import { chatReducer } from './reducer/darkmode';

const store = configureStore({
    reducer:{
        mode : chatReducer,
    }
})

export default store;