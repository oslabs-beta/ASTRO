const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');
const { restart } = require('nodemon');
const PORT = 1111;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../dist')));
app.use(cors());
app.use(cookieParser());

const userRouter = require('./routers/userRouter.js');
const awsRouter = require('./routers/aws.js');

// app.get('/', (req, res) => {
//   res.status(200).sendFile(path.join(__dirname, '../src/index.html'));
// })

app.use('/aws', awsRouter);
app.use('/user', userRouter);

app.use('*', (req, res) => {
	res.status(404).json({ err: 'endpoint requested is not found' });
});

app.use((err, req, res, next) => {
	const defaultErr = {
		log: `Express error handler caught unknown middleware error ${err}`,
		status: 500,
		message: {
			err: 'An error occurred. Please contact the Astro team.',
		},
	};

	const errorObj = Object.assign({}, defaultErr, err);
	console.log(errorObj.log);
	return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
	console.log('Listening on port ' + PORT);
});
