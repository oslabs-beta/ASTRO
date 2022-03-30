import React from "react";
import { render, fireEvent, screen } from "./test-utils";

import toggleChange from '../../src/features/slices/insightsToggleSlice'
import nameChange from "../../src/features/slices/chartSlice";
import getBackendCreds from "../../src/features/slices/credSlice";
import chartDataReducer from "../../src/features/slices/dataSlice";
import funcListReducer from "../../src/features/slices/funcListSlice";
import userReducer from "../../src/features/slices/userSlice";



describe('default state', () => {
	let initialState;

	beforeEach(() => {
		initialState = {
			toggle: 'Functions',
			name: 0
		}
	})


	it("should return a default state when given an undefined input for INSIGHTS TOGGLE SLICE", () => {
		expect(toggleChange(initialState.toggle, { payload: undefined })).toEqual(initialState.toggle);
	});

	it("should return a default state when given an undefined input for CHART SLICE", () => {
		expect(nameChange(initialState.name, { payload: undefined })).toEqual(initialState.name);
	});
});



//////////////////////////////////////////////////////////////////////////

describe('default state', () => {
	let initialState;

	beforeEach(() => {
		initialState = {
			region: '',
			credentials: {
				accessKeyId: '',
				secretAccessKey: '',
			}
		}
	})


	it("should return a default state when given an undefined input for CRED SLICE", async () => {
		expect(getBackendCreds(initialState.region, { payload: undefined })).toHaveLength(0);
	});

});

