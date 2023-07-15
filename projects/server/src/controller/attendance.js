const db = require("../models");

module.exports = {
  async clockIn(req, res) {
    const userId = req.user.id;
    try {
      //get user data
      const userData = await db.User.findOne({
        where: { id: userId },
      });
      //check if user exist
      if (!userData) {
        return res.status(404).send({
          message: "invalid token",
        });
      }

      //format date
      const date = new Date();
      const timeNow = date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
      const dateNow = date
        .toLocaleDateString("zh-Hans-CN", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        })
        .replace(/\//g, "-");

      const dates = new Date(dateNow);

      //check clock in
      const checkClockIn = await db.Attendance.findOne({
        where: {
          [db.Sequelize.Op.and]: [{ user_id: userId }, { date: dates }],
        },
      });
      if (checkClockIn) {
        return res.status(400).send({
          message: "you already have tapped in for today",
          data: checkClockIn.clock_in,
        });
      }

      //clock in
      const tapIn = await db.Attendance.create({
        user_id: userId,
        clock_in: timeNow,
        date: dates,
        isValid: false,
        createdAt: date,
        updatedAt: date,
      });

      res.status(200).send({
        message: "clock in success",
        data: tapIn,
      });
    } catch (error) {
      return res.status(400).send({
        message: "fatal error",
        error: error.message,
      });
    }
  },
  async clockOut(req, res) {
    try {
      //get user data
      const userData = await db.User.findOne({
        where: { id: userId },
      });
      //check if user exist
      if (!userData) {
        return res.status(404).send({
          message: "invalid token",
        });
      }
      //clock out
      const date = new Date();

      const timeNow = date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
      const dateNow = date
        .toLocaleDateString("zh-Hans-CN", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        })
        .replace(/\//g, "-");

      const tapOut = await db.Attendance.create({
        user_id: userId,
        clock_in: timeNow,
        date: dates,
        isValid: false,
        createdAt: date,
        updatedAt: date,
      });
      console.log(dates, typeof dates, "ini datenow");
      res.status(200).send({
        message: "clock in success",
        data: tapIn,
      });
      const dates = new Date(dateNow);
    } catch (error) {
      return;
    }
  },
  async employeeAttendanceReport(req, res) {
    const userId = req.user.id;
    try {
      //get attendance data
      const attendaceData = await db.Attendance.findAll({
        where: { user_id: userId },
        attributes: { exclude: ["createdAt", "updatedAt", "isValid"] },
        include: [
          {
            model: db.User,
            attributes: ["email"],
            include: {
              model: db.Employee_details,
              attributes: ["first_name", "last_name"],
            },
          },
        ],
      });
      res.status(200).send({
        message: "data successfully retrieved",
        data: attendaceData,
      });
    } catch (error) {
      return;
    }
  },
};
