const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');

router.put('/identity',userController.create);

module.exports = router;
