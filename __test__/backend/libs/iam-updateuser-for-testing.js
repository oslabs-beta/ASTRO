import { iamClient } from './iamClient-for-testing.js';
import { UpdateUserCommand } from '@aws-sdk/client-iam';

// Set the parameters.
export const params = {
	UserName: 'ORIGINAL_USER_NAME', //ORIGINAL_USER_NAME
	NewUserName: 'NEW_USER_NAME', //NEW_USER_NAME
};

export const run = async () => {
	try {
		const data = await iamClient.send(new UpdateUserCommand(params));
		console.log('Success, username updated');
		return data;
	} catch (err) {
		console.log('Error', err);
	}
};
run();
