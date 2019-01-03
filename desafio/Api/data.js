const cargos = ["CEO", "CFO", "CHRO", "CIO", "CKO", "CMO", "COO", "CRM", "CRO", "CTO"];

var randOffice = function() {
	var max = cargos.length;
	var i = Math.floor(Math.random() * max);
	return cargos[i];
}


const getUsers = function () {
	return [
			{
			  "name": "Jane",
			  "email": "jane@email.com",
			  "password": "123",
			  "phone": "(01) 00000-0001",
			  "office": ""
			},
			{
			  "name": "Jhon",
			  "email": "jhon@email.com",
			  "password": "123",
			  "phone": "(02) 00000-0002",
			  "office": ""
			},
			{
			  "name": "Ana",
			  "email": "ana@email.com",
			  "password": "123",
			  "phone": "(03) 00000-0003",
			  "office": ""
			},
			{
			  "name": "Max",
			  "email": "max@email.com",
			  "password": "123",
			  "phone": "(04) 00000-0004",
			  "office": ""
			},
			{
			  "name": "Samantha",
			  "email": "sam@email.com",
			  "password": "123",
			  "phone": "(05) 00000-0005",
			  "office": ""
			},
			{
			  "name": "Peter",
			  "email": "peter@email.com",
			  "password": "123",
			  "phone": "(06) 00000-0006",
			  "office": ""
			},
			{
			  "name": "Lauren",
			  "email": "lauren@email.com",
			  "password": "123",
			  "phone": "(07) 00000-0007",
			  "office": ""
			},
			{
			  "name": "Patrick",
			  "email": "patrick@email.com",
			  "password": "123",
			  "phone": "(08) 00000-0008",
			  "office": "CRM"
			},
			{
			  "name": "Sophie",
			  "email": "sophie@email.com",
			  "password": "123",
			  "phone": "(09) 00000-0009",
			  "office": "COO"
			},
			{
			  "name": "Charlie",
			  "email": "charlie@email.com",
			  "password": "123",
			  "phone": "(10) 00000-0010",
			  "office": "CTO"
			},
			{
			  "name": "Rachel",
			  "email": "rachel@email.com",
			  "password": "123",
			  "phone": "(11) 00000-0011",
			  "office": "CEO"
			},
			{
			  "name": "Joseph",
			  "email": "joseph@email.com",
			  "password": "123",
			  "phone": "(12) 00000-0012",
			  "office": "CIO"
			},
			{
			  "name": "Valentina",
			  "email": "valentina@email.com",
			  "password": "123",
			  "phone": "(13) 00000-0013",
			  "office": "COO"
			},
			{
			  "name": "Bruce Wayne",
			  "email": "brucewayne@email.com",
			  "password": "123",
			  "phone": "(14) 00000-0014",
			  "office": "CFO"
			},
			{
			  "name": "Arya Stark",
			  "email": "arya@email.com",
			  "password": "123",
			  "phone": "(15) 00000-0015",
			  "office": "CEO"
			},
			{
			  "name": "Don Pedro I",
			  "email": "donpedro@email.com",
			  "password": "123",
			  "phone": "(16) 00000-0016",
			  "office": "COO"
			},
			{
			  "name": "Bob Esponja",
			  "email": "bobesponja@email.com",
			  "password": "123",
			  "phone": "(17) 00000-0017",
			  "office": "COO"
			},
			{
			  "name": "Fred",
			  "email": "fred@email.com",
			  "password": "123",
			  "phone": "(18) 00000-0018",
			  "office": "COO"
			},
			{
			  "name": "Darth Vader",
			  "email": "darthvader@email.com",
			  "password": "123",
			  "phone": "(19) 00000-0019",
			  "office": "COO"
			},
			{
			  "name": "Claire Redfield",
			  "email": "claire@email.com",
			  "password": "123",
			  "phone": "(20) 00000-0020",
			  "office": "COO"
			}

	];
} 

const genUsers = function () {
	const users = getUsers();
	users.forEach(user => user.office = randOffice());
	return users;
}

const getThemes = function () {
	return	[
				{
					"description": "python",
					"password": "snake"
				},
				{
					"description": "NodeJs",
					"password": "ryan dahl"
				},
				{
					"description": "PHP",
					"password": "elephant"
				},
				{
					"description": "java",
					"password": "coffee"	
				},
				{
					"description": "scrum",
					"password": "burndownchart"	
				}			
		];	
}

const initUsers = function (modelUsers, sequelize) {

	const Users = modelUsers;	
	const users = genUsers();
	var count = 0;

	Users
		.destroy({ where: {}})
		.then((result) => {
			console.log("\n=============================================================");
			console.log("DELETE TABLE \"USERS\"" );
			console.log(result);
			console.log("=============================================================\n");

			sequelize.query("alter sequence users_id_seq restart with 1")
				.then(() => {

					users.forEach( user => {

						Users
							.create(user)
							.then((result) => {

								console.log("\nINSERT TABLE: " + (++count));	
								if(count == 20) {
									console.log("\n=============================================================");
									console.log(`\n${count} usuários foram criados com sucesso!`);
									console.log("\nVerifique o banco de dados.");
									console.log("\n=============================================================\n\n");

								}
							})
							.catch(error => console.log("ERROR INSERT."));		
					}); // end forEach

				})
				.catch(error => console.log("ERROR INSERT."));
		});
}

const initThemes = function (modelThemes, sequelize) {

	const Themes = modelThemes;
	const themes = getThemes();
	var count = 0;

	Themes
		.destroy({ where: {}})
		.then((result) => {

			console.log("\n=============================================================");
			console.log("DELETE TABLE \"THEMES\"" );
			console.log(result);
			console.log("=============================================================\n");

			// Reiniciando a sequence de primary keys
			sequelize.query("alter sequence themes_id_seq restart with 1")
				.then((rs) => {

					// inserindo os dados 
					themes.forEach( theme => {
						Themes
							.create(theme)
							.then((result) => {
								console.log("\nINSERT TABLE: " + (++count));	
								if(count == 5) {
									console.log("\n=============================================================");
									console.log(`\n${count} temas foram criados com sucesso!`);
									console.log("\nVerifique o banco de dados.");
									console.log("\n=============================================================\n\n");

								}
							})
							.catch(error => console.log("ERROR INSERT."));		

					}); // end forEach
			})
			.catch(error => console.log(error));	

		});

}

const init = async function(app) {

	const sequelize = app.datasource.sequelize;
	
	initUsers(app.datasource.models.users, sequelize);
	initThemes(app.datasource.models.themes, sequelize);
}



module.exports = {
	init: init
};