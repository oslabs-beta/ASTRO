import { createSlice } from "@reduxjs/toolkit";


export const insightsToggle = createSlice({
	name: 'insightsToggle',
		initialState: {
			toggle: 'Functions'
		},
		reducers: {
			toggleChange: (state, action) => {
				state.toggle = action.payload;
			}
		}
})

export const { toggleChange } = insightsToggle.actions
export default insightsToggle.reducer;