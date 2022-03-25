/**
 * stsClient-for-testing.js is a helper function that creates an AWS Security Token Service service client instance
 * 
 */

import { STSClient } from '@aws-sdk/client-sts';

const REGION = 'us-east-1';

const stsClient = new STSClient({ region: REGION });
export { stsClient };