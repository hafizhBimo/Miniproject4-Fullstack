const { auth: authController } = require("../controller");
const middleware = require("../middldeware/auth");
const router = require("express").Router();

router.post("/login", authController.login);
router.get("/keepLogin", middleware.verifyToken, authController.keepLogin);

module.exports = router;
