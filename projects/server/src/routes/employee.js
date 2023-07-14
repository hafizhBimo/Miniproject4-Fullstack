const { employee: employeeController } = require("../controller");
const middleware = require("../middldeware/auth");
const router = require("express").Router();

router.post(
  "/registration",
  middleware.verifyToken,
  middleware.checkRole,
  employeeController.employeeRegistration
);

router.patch(
  "/verification/:accessToken",
  employeeController.employeeVerification
);

module.exports = router;
