const { body, validationResult } = require("express-validator");

const validate = (validations) => {
  return async (req, res, next) => {
    for (let validation of validations) {
      const result = await validation.run(req);
      if (result.errors.length) break;
    }

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    res.status(400).json({ errors: errors.array() });
  };
};

module.exports = {
  validateRegisterForm: validate([
    body("email").isEmail().withMessage("invalid email format"),
  ]),
  validateVerificationForm: validate([
    body("password")
      .isLength({ min: 6 })
      .withMessage("minimum password length is 6 characters"),
  ]),
};
