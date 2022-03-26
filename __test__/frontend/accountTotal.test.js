// import React from "react";
// import { render, fireEvent, screen } from "./test-utils";
// import { rest } from 'msw'
// import { setupServer} from 'msw/node'
// import { Insights } from '../../src/pages/Insights' 
  
//   const handlers = [
// 		rest.get('/aws/getCreds', (req, res, ctx) => {
// 			return res(ctx.json({
// 				region: 'testRegion',
// 				credentials: {
// 					accessKeyId: 'testAKI',
// 					secretAccessKey: 'testSAK',
// 				}
// 			}), ctx.delay(150))
// 		})
// 	]
	
// 	const server = setupServer(...handlers)

// 	beforeAll(() => server.listen())

// 	// Reset any runtime request handlers we may add during the tests.
// 	afterEach(() => server.resetHandlers())

// 	// Disable API mocking after the tests are done.
// 	afterAll(() => server.close())

//   describe('switch to account totals when it is clicked', () => {
// 		// render(<Insights/>)
    
//     it("switch to account totals",  () => {
//       render(<Insights/>)
//       expect(screen.queryAllByText(/Account Totals/i)).toBeInTheDocument();
//     });
  

//   });
