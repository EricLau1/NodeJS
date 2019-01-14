var express = require('express');
var router = express.Router();

// importando modelos do Postgres
var models = require('../models');

/* GET users listing. */
router.get('/', function(req, res, next) {

  // retornando todos os usuários salvos no postgres
  models.user.findAll()
    .then(function (users) {

      //renderiza a view do mesmo nome passado como parâmetro.
      res.render('users', { title: 'Users', users: users });
  
    });

});

router.post('/', function(req, res){
  
  var user = req.body.user;

  // faz o insert do usuário no postgres
  models.user.create(user).then(() => {
    // fazer um redirect pra users
    res.redirect('users');
  });

}); 

module.exports = router;
