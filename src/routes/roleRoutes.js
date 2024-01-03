const express = require('express');
const roleController = require('../controllers/roleController');
const roleCheck = require('../middleware/roleCheck');
const authenticateToken = require('../middleware/authenticate'); // Import the middleware
const router = express.Router();

router.post('/', roleController.createRole);
router.get('/', authenticateToken, roleCheck(2), roleController.getAllRoles);
router.get('/:id', roleController.getRole);
router.get('/getRoleByUser/:id', roleController.getRoleByUser);
router.put('/:id', roleController.updateRole);
router.delete('/:id', roleController.deleteRole);
router.post('/userRole',roleController.assignUserRole);
router.delete('/userRole/:id', roleController.deleteUserRole);

module.exports = router;