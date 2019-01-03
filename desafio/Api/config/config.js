module.exports = {
	database: "dbtest",
	username: "postgres",
	password: "@root",
	params: {
		dialect: "postgres"
	},
	email: {
		service: "gmail",
		user: "seuemail@gmail.com",
		default: "ericlau.oliveira@gmail.com",
		pass: 'password'
	},
	jwtSecret: "t0p-S3cr3t",
	jwtSession: {
		session: false
	},
};
