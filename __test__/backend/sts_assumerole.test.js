jest.mock('./libs/iamClient-for-testing');
jest.mock('./libs/stsClient-for-testing');
jest.mock('@aws-sdk/client-sts');
jest.mock('@aws-sdk/client-iam');

// Get service clients module and commands.
import 'regenerator-runtime/runtime'
import { run, params } from './libs/iam-updateuser-for-testing';
import { iamClient } from './libs/iamClient-for-testing';
import { stsClient } from './libs/stsClient-for-testing';

describe('@aws-sdk/client-iam mock', () => {
  it('should successfully mock IAM client', async () => {
    iamClient.send.mockResolvedValue({ isMock: true });
    const response = await run(params);
    expect(response.isMock).toEqual(true);
  });
});

describe('@aws-sdk/client-sts mock', () => {
  it('should successfully mock STS client', async () => {
    stsClient.send.mockResolvedValue({ isMock: true });
    const response = await run(params);
    expect(response.isMock).toEqual(true);
  });
});