const bcrypt = require('bcryptjs');
const pool = require('../config/db_config');

const createAuthEntry = async (userId, authType, username, passwordHash, oauthId, token) => {
  //console.log(`${userId}, ${authType}, ${username}, ${passwordHash}, ${oauthId}, ${token}`)
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
  const query = `
  SELECT a.*, r.role_name, r.role_id  FROM um_authentication a
  JOIN um_user u ON a.user_id = u.user_id 
  JOIN um_user_role ur ON u.user_id = ur.user_id 
  JOIN um_role r ON ur.role_id = r.role_id 
  WHERE u.username = $1;
    `;
  const result = await pool.query(query, [username]);
  return result.rows[0];
};

const comparePassword = async (inputPassword, storedPassword) => {
  console.log(`Compared password: ${inputPassword}, ${storedPassword}`);
  return bcrypt.compare(inputPassword, storedPassword);
};

const deleteAuthEntry = async (authId) => {
  const result = await pool.query('DELETE FROM um_authentication WHERE auth_id = $1 RETURNING *;', [authId]);
  return result.rows[0];
};

module.exports = {
  createAuthEntry,
  createSession,
  findUserByAuth,
  comparePassword,
  deleteAuthEntry
};
