import { createSlice } from '@reduxjs/toolkit';

export const chartData = createSlice({
  name: 'chartData',
  initialState: {
    data: {
      invocations: undefined,
      errors: undefined,
      throttles: undefined,
    },
  },
  reducers: {
    invocationsChange: (state, action) => {
      state.data.invocations = action.payload;
    },
    errorsChange: (state, action) => {
      state.data.errors = action.payload;
    },
    throttlesChange: (state, action) => {
      state.data.throttles = action.payload;
    },
  },
});

export const { invocationsChange, errorsChange, throttlesChange } = chartData.actions;
export default chartData.reducer;
