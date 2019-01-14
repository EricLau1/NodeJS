const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcrypt");

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const salt = bcrypt.genSaltSync();

var users = [
	{
		id: 1,
		name: "Jane Doe",
    password: bcrypt.hashSync('123', salt)
	},
	{
		id: 2,
		name: "Jhon Doe",
    password: bcrypt.hashSync('123', salt)
	}
];

app.route("/")
	.get((req, res) => {
		res.json(users);
	});


app.route("/:id")
  .get((req, res) => {
  
    var user = users.filter((u) => u.id == req.params.id);

   res.json(user);

  });

app.listen(3000, () => {
	console.log("Server is running...");
});
