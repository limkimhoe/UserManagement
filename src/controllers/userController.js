const userModel = require('../models/userModel');
const { assignRoleFromSignUp } = require('./roleController');

const createUserFromSignUp = async (username, email) => {
  try {

    //console.log(`Controller: ${username}, ${email}`);
    const newUser = await userModel.createUser(username, email);
    const assignedUserRole = await assignRoleFromSignUp(newUser.user_id, 3);
    if(assignedUserRole){
      return newUser;
    }
    
  } catch (error) {
    // Handle or log the error
    console.error('Error in createUser:', error);
    throw error; // Rethrow the error if you want to handle it further up the call stack
  }
};

const createUser = async (req, res) => {
  try {
    const { username, email } = req.body;

    //console.log(`Controller: ${username}, ${email}`);
    const newUser = await userModel.createUser(username, email);
    const assignedUserRole = await assignRoleFromSignUp(newUser.user_id, 3);
    if(assignedUserRole){
      res.status(201).json(newUser);
    }
    
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.getAllUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUser = async (req, res) => {
  try {
    const user = await userModel.getUserById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const { username, email } = req.body;
    const updatedUser = await userModel.updateUser(req.params.id, username, email);
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const deletedUser = await userModel.deleteUser(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
  createUserFromSignUp
};