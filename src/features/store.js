import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import funcListReducer from './slices/funcListSlice';
import chartSliceReducer from './slices/chartSlice';

export const store = configureStore({
  reducer: {
    //store all slices here in key/val format
    //each key/val is saying we want to have a state.key = userReducer func that decides how to update state when action is dispatched
      user: userReducer,
      funcList: funcListReducer,
      chart: chartSliceReducer
  }
});

