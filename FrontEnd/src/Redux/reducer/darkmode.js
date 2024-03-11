import { createReducer } from '@reduxjs/toolkit';

// Function to retrieve mode from localStorage
const getInitialMode = () => {
  return localStorage.getItem('mode') || null;
};

const initialState = {
  mode: getInitialMode(), // Initialize mode from localStorage
};

export const DarkModeReducer = createReducer(initialState, {
  EnableDarkMode: (state, action) => {
    state.mode = "dark text-foreground bg-background";
    localStorage.setItem('mode', state.mode);
  },
  EnableLightMode: (state, action) => {
    state.mode = null;
    localStorage.removeItem('mode');
  }
});
