const db = require("../models");

module.exports = {
  async payrollCount(req, res) {
    const userId = req.params.id;
    const year = req.params.year;
    const month = req.params.month;
    try {
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

      const totalDeduction = halfCount * (dailySalary / 2);
      const fullSalary = fullCount * dailySalary + totalDeduction;

      console.log(year, month, "in alelael");
      res.status(200).send({
        employeeDetail: salaryDetail,
        totalSalary: fullSalary,
        totalDeduction: totalDeduction,
      });
    } catch (error) {
      return res.status(500).send({
        message: "aleael",
        error: error.message,
      });
    }
  },
  async getPayrollData(req, res) {
    const userId = req.user.id;
    try {
      const payrollData = await db.Employee_details.findAll({
        where: { user_id: userId },
        atttributes: { exclude: ["createdAt", "updatedAt", "user_id"] },
        include: [
          {
            model: db.Salary,
            atttributes: ["basic_salary"],
          },
        ],
      });

      res.status(200).send({
        message: "payroll data successfully retreived",
        data: payrollData,
      });
    } catch (error) {
      return res.status(500).send({
        message: "fatal error",
        error: error.message,
      });
    }
  },
};
