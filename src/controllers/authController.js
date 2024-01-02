const jwt = require('jsonwebtoken');
const authModel = require('../models/authModel');

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const userAuth = await authModel.findUserByAuth(username);

    if (!userAuth || !(await authModel.comparePassword(password, userAuth.password_hash))) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const token = jwt.sign(
      { auth_id: userAuth.auth_id, user_id: userAuth.user_id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    const expirationTime = new Date();
    expirationTime.setHours(expirationTime.getHours() + 1);

    await authModel.createSession(userAuth.user_id, token, expirationTime);

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  loginUser
};