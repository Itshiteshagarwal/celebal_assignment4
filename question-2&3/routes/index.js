const express = require("express");
const router = express.Router();

const login = require("../controller/login");
const signUp = require('../controller/signUp');

router.post('/login',login)
router.post('/signup',signUp)

module.exports = router;