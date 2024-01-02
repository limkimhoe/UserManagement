const bcrypt = require('bcryptjs');
const pool = require('../config/db_config');

const createAuthEntry = async (userId, authType, username, passwordHash, oauthId, token) => {
  const result = await pool.query(
    'INSERT INTO um_authentication (user_id, auth_type, username, password_hash, oauth_id, token, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, NOW(), NOW()) RETURNING *;',
    [userId, authType, username, passwordHash, oauthId, token]
  );
  return result.rows[0];
};

const createSession = async (userId, token, expirationTime) => {
  const result = await pool.query(
    'INSERT INTO um_session (user_id, token, expiration_time, created_at) VALUES ($1, $2, $3, NOW()) RETURNING *;',
    [userId, token, expirationTime]
  );
  return result.rows[0];
};

const findUserByAuth = async (username) => {
  const result = await pool.query('SELECT * FROM um_authentication WHERE username = $1;', [username]);
  return result.rows[0];
};

const comparePassword = async (inputPassword, storedPassword) => {
  return bcrypt.compare(inputPassword, storedPassword);
};

module.exports = {
  createAuthEntry,
  createSession,
  findUserByAuth,
  comparePassword
};