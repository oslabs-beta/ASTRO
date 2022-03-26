import { createSlice } from "@reduxjs/toolkit";


export const timePeriod = createSlice({
	name: 'timePeriod',
		initialState: {
			time: '7d'
		},
		reducers: {
			timeChange: (state, action) => {
				state.time = action.payload;
			}
		}
})

export const { timeChange } = timePeriod.actions
export default timePeriod.reducer;