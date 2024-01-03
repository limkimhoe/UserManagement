const express = require('express');
const userController = require('../controllers/userController');
const roleCheck = require('../middleware/roleCheck');
const authenticateToken = require('../middleware/authenticate'); // Import the middleware
const router = express.Router();

router.post('/', userController.createUser);
router.get('/', authenticateToken, roleCheck(2), userController.getAllUsers);
router.get('/:id', userController.getUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;