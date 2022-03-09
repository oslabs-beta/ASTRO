const express = require('express');
const router = express.Router();

//AWS middleware
const getFunctions = require('../controllers/aws/metrics/getLambdaFuncs');
const getMetricsAllFunc = require('../controllers/aws/metrics/getMetricsAllFuncs')

//Returning all Lambda funcs
router.route('/getLambdaFunctions').post(getFunctions, (req, res) => {
    // console.log(res.locals.functions)
    res.status(200).json(res.locals.functions);
});

//Returning specified metric for all Lambda funcs
router.route('/getMetricsAllFunc/:metricName').post(getMetricsAllFunc, (req, res) => {
    res.status(200).json(res.locals.metricAllFuncData)
});

module.exports = router;