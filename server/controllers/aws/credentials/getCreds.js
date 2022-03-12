const dotenv = require('dotenv');
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