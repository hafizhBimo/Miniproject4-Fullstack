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
          message: "you've already tapped in for today",
          data: checkClockIn.clock_in,
          code: 3,
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
        code: 1,
      });
    } catch (error) {
      return res.status(400).send({
        message: "fatal error",
        error: error.message,
      });
    }
  },
  async clockOut(req, res) {
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
      if (!checkClockIn) {
        return res.status(400).send({
          message: "you haven't tapped in for today",
          data: checkClockIn.clock_in,
          code: 4,
        });
      }

      //check clock out
      if (checkClockIn.isValid) {
        return res.status(400).send({
          message: "you've already tapped out for today",
          data: checkClockIn.clock_out,
          code: 5,
        });
      }

      //clock out
      checkClockIn.clock_out = timeNow;
      checkClockIn.isValid = true;

      //save clock out
      await checkClockIn.save();

      res.status(200).send({
        message: "clock out success",
        data: checkClockIn.clock_out,
        code: 2,
      });
    } catch (error) {
      return res.status(500).send({
        message: "fatal error",
        error: error.message,
      });
    }
  },
  async employeeAttendanceReport(req, res) {
    const userId = req.user.id;
    const pagination = {
      page: Number(req.query.page) || 1,
      perPage: Number(req.query.perPage) || 7,
      date: req.query.date || undefined,
    };
    try {
      let where = { user_id: userId };

      if (pagination.date) {
        where.date = pagination.date;
      }

      //get attendance data
      const { count, rows } = await db.Attendance.findAndCountAll({
        where,
        attributes: { exclude: ["createdAt", "updatedAt", "isValid"] },
        include: [
          {
            model: db.User,
            attributes: ["email"],
            include: {
              model: db.Employee_details,
              attributes: ["first_name", "last_name", "join_date"],
            },
          },
        ],
        limit: pagination.perPage,
        offset: (pagination.page - 1) * pagination.perPage,
      });

      if (pagination.search && count === 0) {
        return res.status(404).send({
          message: "No products found matching the search query.",
        });
      }

      const totalPages = Math.ceil(count / pagination.perPage);
      console.log(count, totalPages);

      res.status(200).send({
        message: "data successfully retrieved",

        pagination: {
          page: pagination.page,
          perPage: pagination.perPage,
          totalPages: totalPages,
          totalData: count,
        },
        data: rows,
      });
    } catch (error) {
      return;
    }
  },
};
