const roleModel = require('../models/roleModel');

const assignRoleFromSignUp = async (userId, roleId) => {
  try {
    const assignedRole = await roleModel.assignRole(userId, roleId);
    if(assignedRole){
      return assignedRole;
    }
  } catch (error) {
    // Handle or log the error
    console.error('Error in assignRoleFromSignUp:', error);
    throw error; // Rethrow the error if you want to handle it further up the call stack
  }
};

const assignUserRole = async (req, res) => {
  try {
    const { userId, roleId } = req.body;
    //console.log(`Controller: ${userId}, ${roleId}`);
    const assignedUserRole = await roleModel.assignRole(userId, roleId);
    res.status(201).json(assignedUserRole);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createRole = async (req, res) => {
  try {
    const { roleName, roleDescription } = req.body;

    const newRole = await roleModel.createRole(roleName, roleDescription);
    res.status(201).json(newRole);
    
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllRoles = async (req, res) => {
  try {
    const roles = await roleModel.getAllRoles();
    res.json(roles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getRole = async (req, res) => {
  try {
    const role = await roleModel.getRoleById(req.params.id);
    if (!role) {
      return res.status(404).json({ message: 'Role not found' });
    }
    res.json(role);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getRoleByUser = async (req, res) => {
  try {
    const role = await roleModel.getRoleByUserId(req.params.id);
    if (!role) {
      return res.status(404).json({ message: 'Role not found' });
    }
    res.json(role);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateRole = async (req, res) => {
  try {
    const { roleName, roleDescription } = req.body;
    const updatedRole = await roleModel.updateRole(req.params.id, roleName, roleDescription);
    if (!updatedRole) {
      return res.status(404).json({ message: 'Role not found' });
    }
    res.json(updatedRole);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteRole = async (req, res) => {
  try {
    const deletedRole = await roleModel.deleteRole(req.params.id);
    if (!deletedRole) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteUserRole = async (req, res) => {
  try {
    const deletedUserRole = await roleModel.deleteUserRole(req.params.id);
    if (!deletedUserRole) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User Role deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createRole,
  getAllRoles,
  getRole,
  getRoleByUser,
  updateRole,
  deleteRole,
  assignUserRole,
  deleteUserRole,
  assignRoleFromSignUp
};