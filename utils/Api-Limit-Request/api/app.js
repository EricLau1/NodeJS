const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.set('limit', '5mb');

app.use(bodyParser.urlencoded({
	limit: app.get('limit'),
	parameterLimit: 100000,
	extended: true
}));

app.use(bodyParser.json({
	limit: app.get('limit')
}));

app.use(cors());

app.route('/')
	.get((req, res) => {
		res.json({
			message: "Hello world!"
		});
	})
	.post((req, res) => {	

		console.log(req.body);

		try {
			const b = req.body.data.length;
			const kb = (req.body.data.length / 1024).toFixed(2);
			const mb = ((req.body.data.length / 1024) / 1024).toFixed(2);

			res.json(
				{
					bytes: b,
					kbytes: kb,
					mbytes: mb,
					lengthData: b	
				}
			);

		} catch (e) {
			console.error(e);
		}		
	});


app.listen(3000, () => {
	console.log('Api rodando na porta 3000');
});

