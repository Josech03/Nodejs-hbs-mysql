const express = require("express");
const router = express.Router();
const loginControllers = require("../controllers/LoginController");

router.get("/index", loginControllers.login);
router.post("/index", loginControllers.auth);
router.get("/signup", loginControllers.signup);
router.post("/signup", loginControllers.storeUser);
router.get("/logout", loginControllers.logout);

module.exports = router;