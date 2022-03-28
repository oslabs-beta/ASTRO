const express = require('express');
const router = express.Router();

//AWS middleware
const getCreds = require('../controllers/aws/credentials/getCreds');
const getLambdaFunctions = require('../controllers/aws/metrics/getLambdaFuncs');
const getMetricsAllFunc = require('../controllers/aws/metrics/getMetricsAllFuncs');
const getMetricsByFunc = require('../controllers/aws/metrics/getMetricsByFunc');
const getLogs = require('../controllers/aws/Logs/getLogs');
const updateLogs = require('../controllers/aws/Logs/updateLogs');

// only used when credentials are inputted into .env file
router.route('/getCreds').get(getCreds, (req,res) => {
  return res.status(200).json(res.locals.credentials);
})

// Returning all Lambda funcs for an account
router.route('/getLambdaFunctions').post(getLambdaFunctions, (req, res) => {
  return res.status(200).json(res.locals.functions);
});

// Returning specified metric for all Lambda funcs
// http://localhost:1111/aws/getMetricsAllFunc/:metricName
router
  .route('/getMetricsAllFunc/:metricName')
  .post(getMetricsAllFunc, (req, res) => {
    return res.status(200).json(res.locals.metricAllFuncData)
});

// Return metric for specified func
router
  .route('/getMetricsByFunc/:metricName')
  .post(getLambdaFunctions, getMetricsByFunc, (req, res) => {
    return res.status(200).json(res.locals.metricByFuncData);
  });

// Returning Lambda Functions Logs
router
  .route('/getLogs')
  .post(getLogs, (req, res) => {
    return res.status(200).json(res.locals.functionLogs);
});

// Updating Lambda Function Logs
router
  .route('/updateLogs')
  .post(updateLogs, (req, res) => {
    return res.status(200).json(res.locals.updatedLogs);
});

module.exports = router;