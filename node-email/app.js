const config = require('./config');
const Email = require('./email');

const email = new Email(config.email);

email.writeTo('ericlau.oliveira@gmail.com');
email.send();