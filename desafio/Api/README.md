Módulos utilizados.

npm install express body-parser --save

npm install sequelize pg pg-hstore --save

npm install --save http-status

npm install bcrypt --save

npm install nodemailer --save

npm install --save jasonwebtoken passport passport-jwt

npm install cors --save

Para executar esta api.

npm start

Observações.

Para enviar email de confirmação de cadastro é necessário configurar um email 
válido no arquivo config.js dentro do diretório config.
Ocorre um erro de instalação do módulo "bcrypt" no windows.

Rotas disponíveis.

http://localhost:3000/

	[GET]
		- página index.

http://localhost:3000/token

	[POST]
		- Envia um objeto com email e password para receber o token de autenticação.

		- Exemplo do objeto:

				{
					"email": "ericlau.olveira@gmail.com",
					"password": "123456" 
				}


http://localhost:3000/signup

	[POST]
		- Envia um objeto com (name, email, password, phone, office) e salva no banco de dados.
		- A senha enviada será criptografada usando bcrypt.
		- Envia um email de confirmação de cadastro.

		- Exemplo do objeto:

				{
					"name": "Eric Lau de Oliveira",
					"email": "ericlau.oliveira@gmail.com",
					"password": "123",
					"phone": "(18) 99808-6741",
					"office": "programador"
				}


http://localhost:3000/users

	[GET]
		- retorna um array usuários do banco de dados.
		- é necessário estar autenticado.

http://localhost:3000/users/:id

	[GET]
		- Esta rota precisa de um id como parâmetro.
		- Retorna um usuário salvo no banco pelo id, caso seja encontrado.
		- é necessário estar autenticado.

	[PUT]
		- atualiza os dados do usuário pelo id informado na url.
		- não atualiza o ID em nem a SENHA.
		- é necessário estar autenticado.

		- Exemplo de objeto:

			{
				"name": "Eric updated",
				"email": "updated@gmail.com",
				"phone": "(18) 00000-000",
				"office": "updated"
			}

	[DELETE]
			- exclui um usuário do banco de dados pelo id informado na url.
			- é necessário estar autenticado.

http://localhost:3000/groups

	[GET]
		- apaga toda a base de dados e inicializa novamente com 20 usuários,
		esta operação só é executada no primeiro request.