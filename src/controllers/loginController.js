const bcrypt = require("bcrypt")


function login(req, res) {

if(req.session.loggendin != true){
	res.render("login/index")
}else{
	res.redirect("/");
}

	
}
function signup(req, res) {
	if(req.session.loggendin != true){
	res.render("login/signup")
}else{
	res.redirect("/");
}
}

function storeUser(req, res) {
	const data = req.body;
	req.getConnection((err, conn) => {
		conn.query("SELECT * FROM Usuarios WHERE Correo = ?", [data.correo], (err, userdata) => {
			if (userdata.length > 0) {
				res.render("login/signup", { error: "El correo electrónico ya se encuentra registrado" });
			} else {
				bcrypt.hash(data.clave, 12).then(hash => {
					data.clave = hash;
					req.getConnection((err, conn) => {
						conn.query("INSERT INTO Usuarios SET ?", [data], (err, rows) => {

							req.session.loggendin = true;
							req.session.name = data.nombre;
							res.redirect("/");
						});
					});
				});
			}
		})
	})
}

function auth(req, res) {
	const data = req.body;
	req.getConnection((err, conn) => {
		conn.query("SELECT * FROM Usuarios WHERE Correo = ?", [data.correo], (err, userdata) => {
			

			if (userdata.length > 0) {

				userdata.forEach(element => {
					bcrypt.compare(data.clave, element.Clave, (err, isMatch) => {


						if (!isMatch) {
							res.render("login/index", { error: "Clave Incorrecta" });
						} else {
							req.session.loggendin = true;
							req.session.name = element.Nombre;
							res.redirect("/");

						}
					})
				})
			} else {
				res.render("login/index", { error: "Correo electrónico no registrado" });
			}
		})
	})
}


function logout(req, res){
	if(req.session.loggendin == true){
		req.session.destroy()
	}
	
	res.redirect("/index")

}

module.exports = {
	login,
	signup,
	storeUser,
	auth,
	logout
}