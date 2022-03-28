const pool = require('../db.js');
const userController = {};

userController.createUser = async (req, res, next) => {
	const { firstName, lastName, email, password, arn } = req.body;

	const sqlQuery = `INSERT INTO Users (firstName, lastName, email, password, arn)
                    VALUES ($1, $2, $3, $4, $5)`;

	const values = [firstName, lastName, email, password, arn];

	try {
		const result = await pool.query(sqlQuery, values);
		res.locals.arn = arn;
		return next();
	} catch (e) {
		return next(e);
	}
};

userController.getUser = async (req, res, next) => {
	const { email, password } = req.body;

	const sqlQuery = `Select * FROM Users WHERE email=$1`;

	const values = [email];

	try {
		const result = await pool.query(sqlQuery, values);
		console.log('result from userController.getUser: ', result);

		if (result.rows[0].password !== password) return next('ERROR: incorrect email or password');

		res.locals.arn = result.rows[0].arn;

		return next();

	} catch (e) {
		return next(e);
	}
};

/*
Succesful database query returns the following information : 
	rows: [
			{
				_id: 1,
				firstname: 'Tony',
				lastname: 'Carrasco',
				email: 'email',
				password: 'password',
				arn: 'arn',
				region: 'region'
			}
		],
*/

module.exports = userController;
