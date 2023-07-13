const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../models");
const crypto = require("crypto");
const secretKey = process.env.JWT_SECRET_KEY;

module.exports = {
  async employeeRegistration(req, res) {
    try {
      const {
        first_name,
        last_name,
        email,
        birth_date,
        join_date,
        basic_salary,
      } = req.body;

      // generate random verification
      const accessToken = crypto.randomBytes(16).toString("hex");

      //check duplicate email
      const isEmailExist = await db.User.findOne({
        where: {
          email: email,
        },
      });

      if (isEmailExist) {
        return res.status(400).send({
          message: "email has already registered",
        });
      }

      //create new employee
      const userData = await db.User.create({
        email,
        password: "",
        access_token: accessToken,
        role_id: 2,
      });
      const salaryData = await db.Salary.create({
        basic_salary,
      });
      const userId = userData.id;
      const salaryId = salaryData.id;
      const employeeData = await db.Employee_details.create({
        first_name,
        last_name,
        birth_date,
        join_date,
        user_id: userId,
        salary_id: salaryId,
      });
      res.status(200).send({
        message: "new employee successfully created",
        data: {
          first_name,
          last_name,
          birth_date,
          join_date,
          email,
          basic_salary,
        },
      });
    } catch (error) {
      return res.status(500).send({
        message: "fatal error",
        error: error.message,
      });
    }
  },
};
