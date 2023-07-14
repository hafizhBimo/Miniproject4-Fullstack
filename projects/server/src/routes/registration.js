const { registration: registrationController } = require("../controller");
const middleware = require("../middldeware/auth");
const router = require("express").Router();

router.post(
  "/registration",
  middleware.verifyToken,
  middleware.checkRole,
  registrationController.employeeRegistration
);

router.patch(
  "/verification/:accessToken",
  registrationController.employeeVerification
);

module.exports = router;
