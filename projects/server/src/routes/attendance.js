const { attendance: attendanceController } = require("../controller");
const middleware = require("../middldeware/auth");
const router = require("express").Router();

router.post("/clockin", middleware.verifyToken, attendanceController.clockIn);

module.exports = router
