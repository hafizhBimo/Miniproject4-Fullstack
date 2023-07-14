const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../models");
const crypto = require("crypto");
const secretKey = process.env.JWT_SECRET_KEY;
const fs = require("fs");
const handlebars = require("handlebars");
const transporter = require("../helper/transporter");

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
      // render template email
      const link = `${process.env.FE_BASEPATH}verify/${accessToken}`;
      const data = fs.readFileSync(
        `${__dirname}/../templateEmail/email.html`,
        "utf-8"
      );
      const tempCompile = handlebars.compile(data);
      const tempResult = tempCompile({ first_name, link });

      await transporter.sendMail({
        from: "meToYou",
        to: email,
        subject: "thankyou for registering",
        html: tempResult,
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
  async employeeVerification(req, res) {
    const { accessToken } = req.params;
    const { first_name, last_name, birth_date, join_date, password } = req.body;
    try {
      //check accessToken
      const userData = await db.User.findOne({
        where: { access_token: accessToken },
      });
      if (!userData) {
        return res.status(404).send("invalid token");
      }

      //check employee_details
      const employeeData = await db.Employee_details.findOne({
        where: { user_id: userData.id },
      });

      //hash password
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);

      //patch password
    } catch (error) {
      return;
    }
  },
};
