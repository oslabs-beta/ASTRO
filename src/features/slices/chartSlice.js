import { createSlice } from '@reduxjs/toolkit';

export const chartName = createSlice({
  name: 'chartName',
  initialState: {
    name: 0
  },
  reducers: {
    nameChange: (state, action) => {
      state.name = action.payload;
    }
  }
});


export const { nameChange } = chartName.actions;
export default chartName.reducer;