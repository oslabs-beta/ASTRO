const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const PORT = 1111;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, + '/src/')));
app.use(cors());
app.use(cookieParser());

// const userRouter = require('./routers/userRouter.js');
// const awsRouter = require('./routers/aws.js');


app.use('*', (req, res) => {
  res.status(404).json({ err: 'endpoint requested is not found' });
});

app.use((err, req, res, next) => {

  const defaultErr = {
    log: `Express error handler caught unknown middleware error ${err}`,
    status: 500,
    message: { err: 'An error occurred. Please contact the Opal team.' },
  };

  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});


app.listen(PORT, () => {
  console.log('Listening on port ' + PORT);
});
  