const express = require("express");
const mysql2 = require("mysql2");
const { engine } = require("express-handlebars");
const myconnection = require("express-myconnection")
const session = require("express-session");
const bodyParser = require("body-parser")

const loginRoutes = require("./routers/login")

const app = express();
const PORT = process.env.PORT || 5000;
const HOST = process.env.DB_HOST || 'localhost';
const USER = process.env.DB_USER || 'root';
const PASSWORD = process.env.DB_PASSWORD || '';
const DBNAME = process.env.DB_NAME || 'nodelogin';
const DBPORT = process.env.DB_PORT || '3306';

app.set("views", __dirname + "/views");
app.engine(".hbs", engine({
	extname:".hbs",
}));
app.set("view engine", ".hbs")

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(myconnection(mysql2,{
	host : HOST,
	user : USER,
	password : PASSWORD,
	port : DBPORT,
	database : DBNAME
}));

app.use(session({
	secret : "secret",
	resave : true,
	saveUninitialized : true
}))

app.use

app.get("/", (req, res) => {
	if(req.session.loggendin == true){
	res.render("home", {name: req.session.name});
}else{
	res.redirect("/index");
}
});



app.use("/", loginRoutes)


 
app.listen(PORT, ()=>{
	console.log("Servidor escuchando en el puerto", PORT);
})

