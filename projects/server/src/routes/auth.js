const { auth: authController } = require("../controller");
const router = require("express").Router();

router.post("/login", authController.login);

module.exports = router;
