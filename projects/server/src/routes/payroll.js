const { payroll: payrollController } = require("../controller");
const middleware = require("../middldeware/auth");
const router = require("express").Router();

router.get(
  "/payroll/:id/:year/:month",
  middleware.verifyToken,
  middleware.checkRole,
  payrollController.payrollCount
);
router.get(
  "/payrollData",
  middleware.verifyToken,
  payrollController.getPayrollData
);

module.exports = router;
