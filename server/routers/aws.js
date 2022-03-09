const express = require('express');
const router = express.Router();

//AWS middleware
const getFunctions = require('../controllers/aws/metrics/getLambdaFuncs');
const getMetricsAllFunc = require('../controllers/aws/metrics/getMetricsAllFuncs');
const getMetricsByFunc = require('../controllers/aws/metrics/getMetricsByFunc');

//Returning all Lambda funcs
router.route('/getLambdaFunctions').post(getFunctions, (req, res) => {
    res.status(200).json(res.locals.functions);
});

// Returning specified metric for all Lambda funcs
// http://localhost:1111/aws/getMetricsAllFunc/:metricName
router.route('/getMetricsAllFunc/:metricName').post(getMetricsAllFunc, (req, res) => {
    res.status(200).json(res.locals.metricAllFuncData)
});

//Return metric for specified func
router
  .route('/getMetricsByFunc/:metricName')
  .post(getFunctions, getMetricsByFunc, (req, res) => {
    res.status(200).json(res.locals.metricByFuncData);
  });

//Returing Lambda Functions Logs
router.route('/getLogs').post(getLogs, (req, res) => {
  res.status(200).json(res.locals.functionLogs);
});

//Updating Lambda Function Logs
router.route('/updateLogs').post(updateLogs, (req, res) => {
  res.status(200).json(res.locals.updatedLogs);
});

module.exports = router;