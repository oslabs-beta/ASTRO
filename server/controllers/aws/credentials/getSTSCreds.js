const AWSUtilFunc = require('../Metrics/utils/AWSUtilFunc.js');
const STSCreds = {};

const { AssumeRoleCommand, STSClient } = require('@aws-sdk/client-sts');

const {
  Lambda,
  LambdaClient,
  ListFunctionsCommand,
} = require('@aws-sdk/client-lambda');

const {
  CloudWatchClient,
  GetMetricDataCommand,
} = require('@aws-sdk/client-cloudwatch');

STSCreds.get = async (req, res, next) => {
  const roleParams = {
    RoleArn: res.locals.arn,
    RoleSessionName: 'AstroSession',
  };
}
const stsClient = new STSClient();

/*
const dotenv = require('dotenv');
// const { fromIni } = require('@aws-sdk/credential-provider-ini');
const { STSClient } = require('@aws-sdk/client-sts');

dotenv.config();

// root user credentials
const credentials = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
};
const region = process.env.AWS_REGION;

// Create an Amazon CloudWatch Logs service client object.
const stsClient = new STSClient({
  region: region,
  credentials: credentials,
});

module.exports = {
  stsClient,
};

*/

try {
  // Class AssumeRole Command returns a temporary access key ID, secret access key, and security token to access AWS resources
  // these temporary security credentials can be used to access any AWS resource
  const assumedRole = await stsClient.send(new AssumeRoleCommand(roleParams));
  const accessKeyId = assumedRole.Credentials.AccessKeyId;
  const secretAccessKey = assumedRole.Credentials.SecretAccessKey;
  const sessionToken = assumedRole.Credentials.SessionToken;

  res.locals.STScreds = { accessKeyId, secretAccessKey, sessionToken };

  console.log('temporary credentials from getSTSCreds.js are: ', roleParams)
  return next();

} catch (err) {
  if (err) {
    console.error(err);
    return next(err);
  }
};

module.exports = STSCreds;

