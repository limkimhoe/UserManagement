const pool = require('../config/db_config');

const createUser = async (username, email, password, authType) => {

    try {
    const result = await pool.query(
      'INSERT INTO um_user (username, email, created_at, updated_at) VALUES ($1, $2, NOW(), NOW()) RETURNING *;',
      [username, email]
    );

    return result.rows[0];
  } catch (error) {
    console.error("Query error:", error);
  }
};

const getAllUsers = async () => {
  const result = await pool.query('SELECT * FROM um_user;');
  return result.rows;
};

const getUserById = async (userId) => {
  const result = await pool.query('SELECT * FROM um_user WHERE user_id = $1;', [userId]);
  return result.rows[0];
};

const updateUser = async (userId, username, email) => {
  const result = await pool.query(
    'UPDATE um_user SET username = $1, email = $2, updated_at = NOW() WHERE user_id = $3 RETURNING *;',
    [username, email, userId]
  );
  return result.rows[0];
};

const deleteUser = async (userId) => {
  const result = await pool.query('DELETE FROM um_user WHERE user_id = $1 RETURNING *;', [userId]);
  return result.rows[0];
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
};