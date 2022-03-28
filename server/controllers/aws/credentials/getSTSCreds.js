const STSCreds = {};
const dotenv = require('dotenv');
dotenv.config();

const {
	AssumeRoleCommand,
	STSClient,
} = require('@aws-sdk/client-sts');

STSCreds.get = async (req, res, next) => {
	const roleParams = {
		RoleArn: res.locals.arn,
		RoleSessionName: 'AstroSession',
	};

	const credentials = {
		accessKeyId: process.env.AWS_ACCESS_KEY_ID,
		secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
	};

	const region = process.env.AWS_REGION;

	const stsClient = await new STSClient({
		credentials,
		region,
	});

	try {
		// Class AssumeRole Command returns a temporary access key ID, secret access key, and security token to access AWS resources
		// these temporary security credentials can be used to access any AWS resource
		const assumedRole = await stsClient.send(
			new AssumeRoleCommand(roleParams)
		);
		const accessKeyId = assumedRole.Credentials.AccessKeyId;
		const secretAccessKey = assumedRole.Credentials.SecretAccessKey;
		const sessionToken = assumedRole.Credentials.SessionToken;

    // what gets sent back to the client
		res.locals.STSCreds = {
			credentials: {
				accessKeyId,
				secretAccessKey,
				sessionToken,
			},
			region,
		};

		return next();
    
	} catch (err) {
		if (err) {
			console.error(err);
			return next(err);
		}
	}
};

module.exports = STSCreds;
