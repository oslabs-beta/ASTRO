import React from 'react'
import "regenerator-runtime/runtime";
import { render, fireEvent, screen, funcList } from './test-utils'
import { Insights } from '../../src/pages/Insights'
import { Dashboard } from '../../src/components/Dashboard';
// import subject from '../../src/features/store'


describe('render react components', () => {
		// let initialState;

		// beforeEach(() => {
		// 	initialState = {
		// 		funcList: [],
    //     region: '',
    //     credentials: {
    //       accessKeyId: '',
    //       secretAccessKey: '',
    //     }
		// 	};
		// });
    
    // it("renders Insights", async () => {
		// 	const insights = await render(<Insights />);
		// 	expect(await insights).toBeTruthy();
		// });

    it("renders dashboard", () => {
      const dash = render (<Dashboard/>);
      expect(dash).toBeTruthy();
    })
})

