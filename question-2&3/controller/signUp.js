const People = require("../model/people");
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'Hiteshisagoodb$oy'; 

const signUp = [
  // Validation middleware
  body('name', 'Name must be at least 3 characters long').isLength({ min: 3 }),
  body('email', 'Please enter a valid email').isEmail(),
  body('password', 'Password must be at least 5 characters long').isLength({ min: 5 }),

  // Request handler
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      let existingpeople = await People.findOne({ email: req.body.email });
      if (existingpeople) {
        return res.status(400).json({ error: "A People with this email already exists" });
      }

      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);

      const people = await People.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });

      const data = {
        People: {
          id: people.id
        }
      };

      const authToken = jwt.sign(data, JWT_SECRET);
      res.json({ authToken });

    } catch (error) {
      console.error(error.message);
      return res.status(500).json({
        message: "Internal Server Error",
        error: error.message,
      });
    }
  }
];

module.exports = signUp;
