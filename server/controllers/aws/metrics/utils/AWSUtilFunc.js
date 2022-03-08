//The following assumes that User inputs the time timeRange (either in min, hours, days)
const moment = require('moment');

/*
input time range period for aggregating the metrics

e.g. if the time range selected on the frontend is minutes, metrics from CloudWatch will be 
aggregated by 1 minute (60 seconds)
*/

const timeRangePeriod = {
  minutes: 60, // 1 min
  hours: 300, // 5 mins
  days: 3600, // 1 hour
};

// routing parameters for defining the EndTime

const roundTimeMultiplier = {
  minutes: 5, // the EndTime time stamps will be rounded to nearest 5 minutes
  hours: 15, // rounded to nearest 15 minutes
  days: 60, // rounded to nearest hour
};

// routing parameters to compute the startTime

const timeRangeMultiplier = {
  minutes: 60, // the EndTime time stamps will be rounded to nearest 5 minutes
  hours: 3600, // 3600 seconds in an hour
  days: 86400, // 86400 seconds in a day
};

const AWSUtilFunc = {};

AWSUtilFunc.prepCwMetricQueryLambdaAllFunc = (
  timeRangeNum,
  timeRangeUnits,
  metricName,
  metricStat
) => {
  // roundTime will round to the nearest 5 minutes, 15 minutes for hours, and nearest hour for days
  const roundTime = roundTimeMultiplier[timeRangeUnits];

  // define the End and Start times in UNIX time Stamp format (milliseconds) for getMetricsData method
  const EndTime =
    //current time in Unix TimeStamp (# of milliseconds between current time stamp and UTC January 1, 1970 (Unix Epoch))
    // Unix epoch useful to computers to track and sort dated info in dynamic and distributed apps both online and client side
    Math.round(new Date().getTime() / 1000 / 60 / roundTime) * 60 * roundTime; 
  
  const StartTime =
    EndTime - timeRangeNum * timeRangeMultiplier[timeRangeUnits];

  const period = timeRangePeriod[timeRangeUnits];

  // initialize the parameters
  const metricParamsBaseAllFunc = {
    StartTime: new Date(StartTime * 1000),
    EndTime: new Date(EndTime * 1000),
    LabelOptions: {
      Timezone: '-0400',
    },
    //    MetricDataQueries: [],
  };

  const metricDataQueryAllfunc = [
    {
      Id: `m${metricName}_AllLambdaFunc`,
      Label: `Lambda ${metricName} All Functions`,
      MetricStat: {
        Metric: {
          Namespace: 'AWS/Lambda',
          MetricName: `${metricName}`,
        },
        Period: period,
        Stat: metricStat,
      },
    },
  ];

  const metricParamsAllfunc = {
    ...metricParamsBaseAllFunc,
    MetricDataQueries: metricDataQueryAllfunc,
  };

  return metricParamsAllfunc;
};

AWSUtilFunc.prepCwMetricQueryLambdaByFunc = (
  timeRangeNum,
  timeRangeUnits,
  metricName,
  metricStat,
  funcNames
) => {
  const roundTime = roundTimeMultiplier[timeRangeUnits];
  //define the End and Start times in UNIX time Stamp format for getMetricsData method
  //Rounded off to nearest roundTimeMultiplier
  const EndTime =
    Math.round(new Date().getTime() / 1000 / 60 / roundTime) * 60 * roundTime; //current time in Unix TimeStamp
  const StartTime =
    EndTime - timeRangeNum * timeRangeMultiplier[timeRangeUnits];

  const period = timeRangePeriod[timeRangeUnits];

  //initialize the parameters
  const metricParamsBaseByFunc = {
    StartTime: new Date(StartTime * 1000),
    EndTime: new Date(EndTime * 1000),
    LabelOptions: {
      Timezone: '-0400',
    },
    //    MetricDataQueries: [],
  };

  const metricDataQueryByFunc = [];

  funcNames.forEach((func, index) => {
    let metricDataQuery = {
      Id: `m${index}`,
      Label: `Lambda ${metricName} ${func}`,
      MetricStat: {
        Metric: {
          Namespace: `AWS/Lambda`,
          MetricName: `${metricName}`,
          Dimensions: [
            {
              Name: `FunctionName`,
              Value: `${func}`,
            },
          ],
        },
        Period: period,
        Stat: metricStat,
      },
    };

    metricDataQueryByFunc.push(metricDataQuery);
  });

  const metricParamsByFunc = {
    ...metricParamsBaseByFunc,
    MetricDataQueries: metricDataQueryByFunc,
  };
  return metricParamsByFunc;
};

// export default AWSUtilFunc;

module.exports = AWSUtilFunc;
