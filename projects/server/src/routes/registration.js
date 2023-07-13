const { registration: registrationController } = require("../controller");
const middleware = require("../middldeware/auth");
const router = require("express").Router();

router.post("/registration", registrationController.employeeRegistration);

module.exports = router;
