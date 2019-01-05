class GroupsController {

    constructor(models, sequelize) {

        this.Users = models.users;
        this.Themes = models.themes;
        this.Groups = models.groups;
        this.sequelize = sequelize;
    }


    async getAll() {

        const sql = `select groups.id as group_id, themes.description as subject,  themes.id as theme_id, 
                     users.name as user, users.id as user_id, users.office as cargo
                     from groups 
                     inner join themes on themes.id = groups.theme
                     inner join users on users.id = groups.user;
                    `

        const data = await this.sequelize.query(sql);

        const result = await data;

        return result[0] || [];
    }

    async create(data, params) {

        // verifica se o tema ou o usuario existem
        const found = await this.findValidate(data, params);

        var result = "verifique se o usuário ou o tema existem!";

        if(found.user && found.theme) {

            // verifica se este tema ja foi adicionado 4 vezes
            const rowsCount = await this.verifyLimitTheme(found.theme);

            console.log(`\n${found.theme.description} já possui ${rowsCount[0][0].rows} usuários.\n`);

            // pega a quantidade de linhas
            if(rowsCount[0][0].rows == 4) {

                return `O grupo sobre: ${found.theme.description} já possui 4 pessoas.`;

            }
            

            // verifica se o usuário ja existe no banco de dados,
            // verifica se ja existe um usuário relacionado ao mesmo tema e com o mesmo cargo.
            result = await this.networkingValidate(found.user, found.theme);

            if(result[0][0]) {

               return {
                    "message": `erro ao entrar no grupo de ${found.theme.description}`,
                    "verify": [
                        "Este usuário ja pertence a um grupo?",
                        `O grupo de ${found.theme.description}, tem um usuário com o cargo: ${result[0][0].office}?`,
                    ]
                };

                //return result[0][0];

            }

            // caso passe por todas as regras acima, o usuário é adicionado ao grupo
            const response = await this.Groups.create({
                user: found.user.id,
                theme: found.theme.id
            });

            result = await response;

        } 

        return result;

    }

    async findValidate(data, params) {

        const theme = await this.Themes.findOne({where: { description: params.theme }});
        const user = await this.Users.findOne({where: data});

        const response = {
            theme,
            user
        };

        return response;
    }

    async networkingValidate(user, theme) {


        const sql = `select themes.id as theme_id, themes.description, users.id as user_id, users.name, users.office
                     from groups 
                     inner join users on users.id = groups.user
                     inner join themes on themes.id = groups.theme
                     where groups.user = ${user.id} or 
                     ( users.office = '${user.office}' and themes.description = '${theme.description}' )
                    ` ;

        const response = await this.sequelize.query(sql);

        return response;

    }

    async verifyLimitTheme(theme) {

        const sql = `select count(*) as rows from groups 
                     inner join themes on themes.id = groups.theme
                     where themes.description = '${theme.description}'
                    `

        const rowsCount = await this.sequelize.query(sql);

        return rowsCount;

    }


}

module.exports = GroupsController;


