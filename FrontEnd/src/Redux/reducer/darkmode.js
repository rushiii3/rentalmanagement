import {createReducer} from '@reduxjs/toolkit';
const initialState = {
    mode: null,
  };
  export const chatReducer  = createReducer(initialState,{
    EnableDarkMode:(state,action) => {
        state.mode = "dark text-foreground bg-background";
    },
    EnableLightMode:(state,action) => {
        state.mode = null;
    }
  })  
  