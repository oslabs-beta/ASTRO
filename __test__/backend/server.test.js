const request = require('supertest');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config();

// Get service clients module and commands.
const regeneratorRuntime = require('regenerator-runtime');
const {
	LambdaClient,
	ListFunctionsCommand,
} = require('@aws-sdk/client-lambda');
const {
	getFunctions,
	lambdaClient,
} = require('../../server/controllers/aws/metrics/getLambdaFuncs.js');

const server = 'http://localhost:1111';

// describe('Route integration', () => {
// 	describe('/aws/getCreds', () => {
// 		describe('GET', () => {
// 			it('responds with 200 status, json content type, and creds from .env', async () => {
// 				return request(server)
// 					.get('/aws/getCreds')
// 					.expect('Content-Type', /json/)
// 					.expect(200, {
// 						region: process.env.AWS_REGION,
// 						credentials: {
// 							accessKeyId: process.env.AWS_ACCESS_KEY_ID,
// 							secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
// 						},
// 					});
// 			});
// 		});
// 	});
// });

// import 'regenerator-runtime/runtime';

/**
 * @tests for getLambdaFuncs.js file
 */

// // jest.mock returns a useful automatic mock that can be used to spy on calls to a class constructor and all of its methods. arrow functions in classes will NOT be part of the mock bc tehy aren't present on object's proottype and are properties holding a reference to a function
// jest.mock('../../server/controllers/aws/metrics/getLambdaFuncs.js');
// jest.mock('@aws-sdk/client-lambda');
// // jest.mock('LambdaClient');

// beforeEach(() => {
// 	// clear all instances and calls to constructor and its methods
// 	LambdaClient.mockClear();
// 	ListFunctionsCommand.mockClear();
// });

// describe('@aws-sdk/client-lambda mock', () => {
// 	const lambdaClient = new LambdaClient({ region: 'us-east-1' });

// 	// it('should successfully mock Lambda client once', () => {
// 	//   expect(LambdaClient).toHaveBeenCalledTimes(1);
// 	// });

// 	it('returns the list of functions', async () => {
// 		lambdaClient.send.mockResolvedValue({
// 			Functions: [
// 				{ FunctionName: 'Hello-World' },
// 				{ FunctionName: 'GoodbyeWorld2' },
// 			],
// 		});
// 		return request(server)
// 			.post('/aws/getLambdaFunctions')
// 			.expect('Content-Type', /json/)
// 			.expect(200, ['Hello World', 'Hello World2']);
// 	});
// });
