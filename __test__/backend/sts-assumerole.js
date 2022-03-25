/**
 * This file demonstrates how to use AWS STS to assume an IAM role
 */

import { stsClient } from './libs/stsClient-for-testing';
import {
	AssumeRoleCommand,
	GetCallerIdentityCommand,
} from '@aws-sdk/client-sts';

export const params = {
	RoleArn: 'ARN_OF_ROLE_TO_ASSUME',
	RoleSessionName: 'session1',
	DurationSeconds: 900,
};

export const run = async () => {
	try {
		const data = await stsClient.send(new AssumeRoleCommand(params));
		return data;
		const rolecreds = {
			accessKeyId: data.Credentials.AccessKeyId,
			secretAccessKey: data.Credentials.SecretAccessKey,
			sessionToken: data.Credentials.SessionToken,
		};

		// Get Amazon Resource Name (ARN) of current identity
		try {
			const stsParams = { credentials: rolecreds };
			const stsClient = new STSClient(stsParams);
			const results = await stsClient.send(
				new GetCallerIdentityCommand(rolecreds)
			);
			console.log('Success', results);
		} catch (err) {
			console.log(err, err.stack);
		}
	} catch (err) {
		console.log('Error', err);
	}
};
run();
