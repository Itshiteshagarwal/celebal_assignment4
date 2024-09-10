const People = require("../model/people");
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'Hiteshisagoodb$oy'; 

const login = [
    body('email', 'Please enter a valid email').isEmail(), 
    body('password', 'Password cannot be blank').exists(),

    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        
        const { email, password } = req.body;

        try {
            let people = await People.findOne({ email });
            if (!people) {
                return res.status(400).json({ error: "Invalid credentials" });
            }

            const passwordCompare = await bcrypt.compare(password, people.password);
            if (!passwordCompare) {
                return res.status(400).json({ error: "Invalid credentials" });
            }

            const data = {
                People: {
                    id: people.id
                }
            };
            
            const authToken = jwt.sign(data, JWT_SECRET, {expiresIn: '15m'});
            res.json({ authToken });

        } catch (error) {
            console.error(error.message);
            return res.status(500).json({
                message: "Internal Server Error",
                error: error.message
            });
        }
    }
];

module.exports = login;
