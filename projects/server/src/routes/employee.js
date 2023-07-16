const { employee: employeeController } = require("../controller");
const middleware = require("../middldeware/auth");
const router = require("express").Router();
const validateMiddleware = require("../middldeware/validation");

router.post(
  "/registration",
  middleware.verifyToken,
  middleware.checkRole,
  validateMiddleware.validateRegisterForm,
  employeeController.employeeRegistration
);

router.patch(
  "/verification/:accessToken",

  employeeController.employeeVerification
);

router.get("/employee/:accessToken", employeeController.employeeData);
router.get(
  "/allemployee",
  middleware.verifyToken,
  middleware.checkRole,
  employeeController.getAllEmployeeData
);
module.exports = router;
