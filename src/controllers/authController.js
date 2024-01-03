const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authModel = require('../models/authModel');
const { createUserFromSignUp } = require('./userController'); 

const signIn = async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log(`Controller: ${username}, ${password}`);
    const userAuth = await authModel.findUserByAuth(username);

    if (!userAuth || !(await authModel.comparePassword(password, userAuth.password_hash))) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const token = jwt.sign(
      { auth_id: userAuth.auth_id, user_id: userAuth.user_id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    //console.log(token);

    const expirationTime = new Date();
    expirationTime.setHours(expirationTime.getHours() + 1);

    await authModel.createSession(userAuth.user_id, token, expirationTime);

    res.json({ token, "user_id": userAuth.user_id });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const signUp = async (req, res) => {
  try {
    const { username, email, password, auth_type, oauth_id} = req.body;
    //console.log(`${username}, ${email}, ${password}, ${auth_type}, ${oauth_id}`);
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await createUserFromSignUp(username, email); 
    //console.log(`${newUser.user_id}`);
    const authEntry = await authModel.createAuthEntry(newUser.user_id, auth_type, username, hashedPassword, oauth_id, "JWTtoken");
    const combinedUserData = { ...newUser, ...authEntry };
    res.status(201).json(combinedUserData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteAuthEntry = async (req, res) => {
  try {
    const deletedAuthEntry = await authModel.deleteAuthEntry(req.params.id);
    if (!deletedAuthEntry) {
      return res.status(404).json({ message: 'authEntry not found' });
    }
    res.json({ message: 'Authentication Entry deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  signIn,
  signUp,
  deleteAuthEntry
};