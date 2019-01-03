// módulo de inicialização da base de dados com 20 usuários
const createData = require('../data');

module.exports = (app) => {

	var start = true;
	var groups = null;

	app.route('/groups')
		.get((req, res) => {

			if(start) {
				// iniciando a base de dados com 20 usuários
				// todos os dados na tabela serão apagados
				createData.init(app);
				start = false;
			
			} else {
				console.log("\nA base de dados ja foi iniciada!");
			}

			res.json({networking: "await..."});
		});

}