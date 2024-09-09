const express = require('express');
const multer = require('multer');
const userController = require('../controllers/userController');

const router = express.Router();
const upload = multer();

router.get('/', userController.getUsers);
router.get('/:id', userController.getUserById);
router.put('/:id', upload.single('photo'), userController.updateUser);
module.exports = router;
