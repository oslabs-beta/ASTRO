/* 
Purpose:
iamClient.js is a helper function that creates an AWS Identity and Access Management (IAM) service client.
*/
import { IAMClient } from '@aws-sdk/client-iam';

const REGION = 'us-east-1'

const iamClient = new IAMClient({ region: REGION });
export { iamClient };