const {
    LambdaClient,
    ListFunctionsCommand,
} = require('@aws-sdk/client-lambda');

//Extract Lambda Functions for the Assumed Role
//***********************Begin************************ */

const getFunctions = async (req, res, next) => {
    // constructing a new client object (LambdaClient) to invoke service methods on AWS Lambda using the specified AWS account credentials provider, client config options, and request metric collector. 
    // service calls made using the new client object is blocking (other code won't be allowed to run) and won't return until the service call completes
    const client = new LambdaClient({
      // note that we do not need to specify config.region or config.credentials; aws automatically recognizes we want to set the config object's region & credentials properties to specific values
      region: req.body.region,
      credentials: req.body.credentials,
    });

    
    // set FunctionVersion to 'ALL' to include all published/unpublished versions of each function 
    const lamParams = { FunctionVersion: 'ALL' };
    
    try {
      // calling send operation on client with lamParams object as input
      const listOfLambdaFuncs = await client.send(
        // ListFunctionsCommand is a class that returns a list of Lambda functions (50 max) with version-specific configuration of each one
        new ListFunctionsCommand(lamParams)
        );
        // console.log('list is: ', listOfLambdaFuncs);

      const funcNames = listOfLambdaFuncs.Functions.map(el => el.FunctionName);
      res.locals.functions = funcNames;

      return next();
    } catch (err) {
      console.error('Error in Lambda List Functions: ', err);
      return next(err);
    }
  };
  //***********************End************************ */
  module.exports = getFunctions;