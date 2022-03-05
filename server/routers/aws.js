const express = require('express');
const router = express.Router();

//AWS middleware
const getFunctions = require('../controllers/aws/Metrics/getLambdaFuncs');

//Returning all Lambda funcs
router.route('/getLambdaFunctions').post(getFunctions, (req, res) => {
    res.status(200).json(res.locals.functions);
});

module.exports = router;