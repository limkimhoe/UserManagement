const roleModel = require('../models/roleModel');
const jwt = require('jsonwebtoken');

const roleCheck = (requiredRole) => {
    return async function(req, res, next) {
        const userId = req.user.user_id;
        try {
            console.log(userId)
            const userRoleId = await roleModel.roleCheck(userId);
            console.log(`User role: ${userRoleId}, ${requiredRole}`);
            if (userRoleId <= requiredRole) {
                next();
            } else {
                res.status(403).json({ message: "Access denied" });
            }
        } catch (error) {
            res.status(500).json({ message: "Error checking user role" });
        }
    };
  }
  
module.exports = roleCheck;