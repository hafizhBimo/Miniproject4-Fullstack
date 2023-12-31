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
        attributes: {
          exclude: ["createdAt", "updatedAt", "user_id", "salary_id"],
        },
        include: {
          model: db.User,
          atttributes: ["email"],
        },
      });

      //hash password
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);

      //patch data
      if (first_name) {
        employeeData.first_name = first_name;
      }
      if (last_name) {
        employeeData.last_name = last_name;
      }
      if (birth_date) {
        employeeData.birth_date = birth_date;
      }
      if (join_date) {
        employeeData.join_date = join_date;
      }
      if (password) {
        userData.password = hashPassword;
      }

      //delete access token
      userData.access_token = null;

      //save data
      await userData.save();
      await employeeData.save();

      res.status(200).send({
        message: "verification success",
        data: {
          first_name: employeeData.first_name,
          last_name: employeeData.last_name,
          birth_date: employeeData.birth_date,
          join_date: employeeData.join_date,
          email: userData.email,
        },
      });
    } catch (error) {
      return res.status(500).send({
        message: "fatal error",
        error: error.message,
      });
    }
  },
  async employeeData(req, res) {
    const { accessToken } = req.params;
    try {
      //check accessToken
      const userData = await db.User.findOne({
        where: { access_token: accessToken },
      });
      if (!userData) {
        return res.status(404).send("invalid token");
      }
      //get employee data
      const employeeData = await db.Employee_details.findOne({
        where: { user_id: userData.id },
      });

      res.status(200).send({
        message: "employee data successfully retrieved",
        data: employeeData,
      });
    } catch (error) {
      return res.status(500).send({
        message: "fatal error",
        error: error.message,
      });
    }
  },
  async getAllEmployeeData(req, res) {
    const pagination = {
      page: Number(req.query.page) || 1,
      perPage: Number(req.query.perPage) || 5,
    };
    try {
      let where = {};
      //get all employee
      const { count, rows } = await db.Employee_details.findAndCountAll({
        where,
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
        message: "employee data successfully retreived",
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
