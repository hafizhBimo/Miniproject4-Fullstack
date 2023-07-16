const db = require("../models");

module.exports = {
  async payrollCount(req, res) {
    const userId = req.body.id;
    const year = req.body.year;
    const month = req.body.month;
    try {
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

      //check double payroll
      const checkPayroll = await db.Payroll.findOne({
        where: {
          [db.Sequelize.Op.and]: [{ user_id: userId }, { date: dates }],
        },
      });
      if (checkPayroll) {
        return res.status(400).send({
          message: "you've already generate payroll for this user",
          data: checkPayroll,
        });
      }
      console.log(dates);
      //get data from attendances
      const payrollData = await db.Attendance.findAll({
        where: {
          [db.Sequelize.Op.and]: [
            { user_id: userId },
            db.Sequelize.where(
              db.sequelize.fn("MONTH", db.sequelize.col("date")),
              month
            ),
            db.Sequelize.where(
              db.sequelize.fn("YEAR", db.sequelize.col("date")),
              year
            ),
          ],
        },
      });
      // find user
      const salaryDetail = await db.Employee_details.findOne({
        where: { user_id: userId },
        include: [
          {
            model: db.Salary,
            atttributes: ["basic_salary"],
          },
        ],
      });

      if (!salaryDetail) {
        return res.status(404).send({
          message: "user not found",
        });
      }

      //counting salaries
      const basicSalary = salaryDetail.Salary.basic_salary;
      const dailySalary = basicSalary / 21;

      let fullCount = 0;
      let halfCount = 0;

      payrollData.forEach((data) => {
        if (data.isValid) {
          fullCount += 1;
        } else {
          halfCount += 1;
        }
      });
      console.log(
        userId,
        month,
        year,
        fullCount,
        halfCount,
        dailySalary,
        "cek"
      );
      const totalDeduction = halfCount * (dailySalary / 2);
      const fullSalary = fullCount * dailySalary + totalDeduction;

      //save to db
      await db.Payroll.create({
        user_id: userId,
        date: dates,
        total_deduction: totalDeduction,
        total_payroll: fullSalary,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      res.status(200).send({
        message: "generate payroll success",
        employeeDetail: salaryDetail,
        totalSalary: fullSalary,
        totalDeduction: totalDeduction,
      });
    } catch (error) {
      return res.status(500).send({
        message: "fatal error",
        error: error.message,
      });
    }
  },
  async getPayrollData(req, res) {
    const userId = req.user.id;
    const pagination = {
      page: Number(req.query.page) || 1,
      perPage: Number(req.query.perPage) || 6,
      date: req.query.date || undefined,
    };
    try {
      let where = { user_id: userId };

      if (pagination.date) {
        where.date = pagination.date;
      }
      const { count, rows } = await db.Payroll.findAndCountAll({
        where,
        atttributes: { exclude: ["createdAt", "updatedAt"] },
        include: [
          {
            model: db.User,
            atttributes: ["email"],
            include: [
              {
                model: db.Employee_details,
                atttributes: ["first_name", "last_name"],
              },
            ],
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

      res.status(200).send({
        message: "payroll data successfully retreived",
        pagination: {
          page: pagination.page,
          perPage: pagination.perPage,
          totalPages: totalPages,
          totalData: count,
        },
        data: rows,
      });
    } catch (error) {
      return res.status(500).send({
        message: "fatal error",
        error: error.message,
      });
    }
  },
};
