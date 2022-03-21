const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController.js');
const STSCreds = require('../controllers/aws/credentials/getSTSCreds');


router.route('/login').post(
  userController.getUser, 
  STSCreds.get,
  (req, res) => {
    return res.status(200).json(res.locals.STSCreds);
  }
)

router.route('/register').post(
  userController.createUser, 
  STSCreds.get,
  (req, res) => {
    return res.status(200).json(res.locals.STSCreds);
  }
)

module.exports = router;