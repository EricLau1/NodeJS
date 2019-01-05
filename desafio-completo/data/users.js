const cargosGenerator = require('./cargos');
const namesGenerator = require('./names');
const phonesGenerator = require('./phones');

const randomCar = () => {
    const max = cargosGenerator.length;
    const i = Math.floor(Math.random() * max);
    return cargosGenerator[i].sigla;
}

const usersGenerator = () => {

    var users = [];
    var id = 0;
    namesGenerator.forEach(name => {

        users.push({
            id: ++id,
            name: name,
            email: `${name.toLowerCase()}@email.com`,
            phone: phonesGenerator(),
            password: '123',
            office: randomCar()
        });

    });

    return users;

}

const initUsers = (modelUsers, sequelize) => {

    const users = usersGenerator();

    modelUsers
        .destroy({where: {}})
        .then(async rowCount => {

            console.log(`${rowCount} linhas foram deletadas da tabela \"users\".`);

            const restart = await sequelize.query('alter sequence users_id_seq restart with 1');

            try {

                if(restart) {

                    var counter = 0;

                    users.forEach(async user => {

                        // espera que a promise se resolva e retorne o resultado
                        const result = await modelUsers.create(user);

                        // espera que a promise se resolva e retorne o resultado
                        const data = await result;
                        //console.log(data);

                        counter++;

                        if (counter == 20) {
                            console.log("\n*************************************");
                            console.log(`${counter} usuários gerados com sucesso!`);
                            console.log("*************************************\n");
                            process.exit(0);
                        }

                    });

                }
                
            } catch (e) {

                console.error(e);
            
            }

        });

}

module.exports = {
    initUsers: initUsers
};