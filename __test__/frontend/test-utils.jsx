import React from 'react';
import { render as rtlRender } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import insightsToggleReducer from '../../src/features/slices/insightsToggleSlice'
import chartSliceReducer from '../../src/features/slices/chartSlice'
import credSliceReducer from '../../src/features/slices/credSlice'
import chartDataReducer from '../../src/features/slices/dataSlice'
import funcListReducer from '../../src/features/slices/funcListSlice'
import userReducer from '../../src/features/slices/userSlice'

function render(
	ui,
	{
		preloadedState,
		store = configureStore({
			reducer: { 
				toggleInsights: insightsToggleReducer,
				chart: chartSliceReducer,
				creds: credSliceReducer,
				data: chartDataReducer,
				funcList: funcListReducer,
				user: userReducer 
			},
			preloadedState,
		}),
		...renderOptions
	} = {}
) {
	function Wrapper({ children }) {
		return <Provider store={store}>{children}</Provider>;
	}
	return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

// re-export everything
export * from '@testing-library/react'
// override render method
export { render }