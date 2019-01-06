var router = require('./router');

var phonesGenerator = require('./phones');

var app = router(3412);

var produtos = [
    { id: 1, descricao: 'laranja', quantidade: 100, preco: 0.99 },
    { id: 2, descricao: 'maçã', quantidade: 50, preco: 1.99 },
    { id: 3, descricao: 'banana', quantidade: 300, preco: 0.49 }
];

var usuarios = [
    { id: 1, nome: 'Jane Doe', telefone: phonesGenerator(), data: new Date(), produto: produtos[0] },
    { id: 2, nome: 'Jon Doe', telefone: phonesGenerator(), data: new Date(), produto: produtos[1] },
    { id: 3, nome: 'Ana Doe', telefone: phonesGenerator(), data: new Date(), produto: produtos[2] },
]

var newProduto = function (data) {

    return {
        id: produtos.length + 1,
        descricao: data.descricao,
        quantidade: data.quantidade,
        preco: data.preco
    }

};

app.interceptor(function (req, res, next) {
    console.log(next);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.interceptor(function (req, res, next) {
    console.log(next);
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    next();    
});

app.get('/produtos', function (req, res) {
    res.write(JSON.stringify(produtos));
    res.end();
});

app.get('/usuarios', function (req, res) {
    res.write(JSON.stringify(usuarios));
    res.end();
});

app.post('/produtos', function (req, res) {

    var data = req.body;
    // converte de json para objeto
    data = JSON.parse(data);
    produtos.push( newProduto(data) );
    // converte objeto para json
    res.write(JSON.stringify(data));
    res.end();
});

app.options('/produtos', function (req, res) {
    res.end();
});