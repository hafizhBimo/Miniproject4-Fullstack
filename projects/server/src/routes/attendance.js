const { attendance: attendanceController } = require("../controller");
const middleware = require("../middldeware/auth");
const router = require("express").Router();

router.post("/clockin", middleware.verifyToken, attendanceController.clockIn);
router.get(
  "/attendancereport",
  middleware.verifyToken,
  attendanceController.employeeAttendanceReport
);

module.exports = router;
