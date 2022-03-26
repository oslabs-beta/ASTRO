import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import funcListReducer from './slices/funcListSlice';
import chartSliceReducer from './slices/chartSlice';
import userCredsReducer from './slices/credSlice';
import insightsToggleReducer from './slices/insightsToggleSlice';
import chartDataReducer from './slices/dataSlice';
import timePeriodReducer from './slices/timePeriodSlice'

export const store = configureStore({
  reducer: {
    //store all slices here in key/val format
    //each key/val is saying we want to have a state.key = userReducer func that decides how to update state when action is dispatched
      user: userReducer,
      funcList: funcListReducer,
      chart: chartSliceReducer,
      creds: userCredsReducer,
      toggleInsights: insightsToggleReducer,
      data: chartDataReducer,
      time: timePeriodReducer
  }
});

