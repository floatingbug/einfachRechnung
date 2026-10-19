const validator = require("validator");

function validateSignUp(req, res, next) {
  const { name, email, password } = req.body;
  const errors = {};


  // Name
  if (!name || validator.isEmpty(name.trim())) {
    errors.name = [
      "Name wird benötigt."
    ];
  }

  // Email
  if (!email || !validator.isEmail(email)) {
    errors.email = [
      "Ungültige E-Mail Adresse."
    ];
  }

  // Password basic length check
  if (!password || !validator.isLength(password, { min: 8 })) {
    errors.password = [
      "Das Password muss mindestens 8 Zeichen lang sein."
    ];
  }

  // Password: uppercase, lowercase, number — NO special char required
  if (!/[A-Z]/.test(password) || !/[a-z]/.test(password) || !/\d/.test(password)) {
    errors.password = [
      ...errors.password,
      "Das Password muss mindestens aus einem Großbuchstabe und Kleinbuchstaben und mindestens einer Zahl bestehen."
    ];
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ inputErrors: errors });
  }

  next();
}

module.exports = validateSignUp;

