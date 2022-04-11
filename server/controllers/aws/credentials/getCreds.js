const dotenv = require('dotenv');
// dotenv allows you to separate secrets from source code files
// good to dynamically configure app without changing source code
  // can use env for development (set a db url to a specific dev only db)
  // print console logs only in dev mode
dotenv.config();

const getCreds = (req, res, next) => {
  const creds = {
    region: process.env.AWS_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  	}
  }
  res.locals.credentials = creds;
  return next();
}

module.exports = getCreds;