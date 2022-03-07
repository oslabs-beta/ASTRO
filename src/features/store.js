import { configureStore } from '@reduxjs/toolkit';
//import all the reducers here
import userReducer from './slices/userSlice'

export const store = configureStore({
    reducer: {
        //store all slices here in key/val format
        //each key/val is saying we want to have a state.key = userReducer func that decides how to update state when action is dispatched
        user: userReducer
    }
});

