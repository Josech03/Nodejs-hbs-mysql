const express = require("express");
const loginControllers = require("../controllers/LoginController")

const router = express.Router();

router.get("/index", loginControllers.login);
router.post("/index", loginControllers.auth);
router.get("/signup", loginControllers.signup);
router.post("/signup", loginControllers.storeUser);
router.get("/logout", loginControllers.logout)
module.exports = router;