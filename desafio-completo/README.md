Exercício:

Criar uma base de dados com pelo menos 20 usuários, onde você irá aplicar a
seguinte situação:

- 1) Cada usuário possui um cargo dentro da empresa (CTO, CEO, CFO e
etc);

- 2) Por sua vez, existe interesse desses cargos criarem um networking,
com isso precisamos identificar qual deles fazem parte do mesmo
segmento e “combina-los” (match de interesse) para uma reunião do
mesmo interesse.

- Mas, as pessoas só podem se reunir se forem de cargos diferentes.
Somente o interesse deve ser o mesmo.

- 3) Sabendo quem combinar, você deverá ter uma relação de 4 pessoas
por reunião, ou seja, somente 4 pessoas poderão se reunir e não poderão
repetir com quem já se reuniu

Para executar a API:

Instalar as dependecias:

    npm install

É necessário ter o postgres instalado, e configurar os parametros no arquivo 'config.js'
dentro do diretório [config].

Execute o arquivo 'dataload.js' para iniciar a base de dados com 20 usuários. 

Executar a API:

    npm start


URL disponíveis:

Usuários:

    [GET] e [POST]
    
        http://localhost:3000/users


    [GET], [PUT], [DELETE]

        http://localhost:3000/users/:id


TEMAS (no desafio é dito "interesses de um usuário", eu chamei esses interesses de Temas):

     [GET] e [POST]
    
        http://localhost:3000/themes

            Exemplo de como adicionar um tema por POST:

                {
                    "description": "scrum"
                }


    [GET], [PUT], [DELETE]

        http://localhost:3000/themes/:id
   

GRUPOS:


    [GET]
    
        http://localhost:3000/groups

    [POST]

        http://localhost:3000/groups/:theme


SOLUÇÃO DO DESAFIO.

Utilizando a URL[POST] `http://localhost:3000/groups/:theme`, o usuário informa o tema de interesse em fazer networking.

Exemplo:  `http://localhost:3000/groups/scrum`.

Junto a essa URL, também é enviado o "id" deste usuário que será o corpo da requisição.

Exemplo:

    {
        "id": 1
    }


No back-end, ocorre as verificações, se o usuário em questão poderá ou não ingressar
ao grupo de interesse.

A primeira verificação é se os parametros existem no banco de dados.

A segunda verificação é se o tema já esta no limite de 4 pessoas.

A terceira verificação é se o usuário ja não está em algum grupo ou
se ja não existe um usuário com o mesmo cargo/ofício(office) que
pertence a este mesmo grupo de interesse.

Se todas as opções acima forem falsas o usuário é adicionado ao grupo.

Senão é enviado uma mensagem informando.

