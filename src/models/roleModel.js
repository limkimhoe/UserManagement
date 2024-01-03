const pool = require('../config/db_config');

const createRole = async (roleName, roleDescription) => {

    try {
    const result = await pool.query(
      'INSERT INTO um_user (role_name, role_description, created_at, updated_at) VALUES ($1, $2, NOW(), NOW()) RETURNING *;',
      [roleName, roleDescription]
    );

    return result.rows[0];
  } catch (error) {
    console.error("Query error:", error);
  }
};

const getAllRoles = async () => {
  const result = await pool.query('SELECT * FROM um_role;');
  return result.rows;
};

const getRoleById = async (roleId) => {
  const result = await pool.query('SELECT * FROM um_role WHERE role_id = $1;', [roleId]);
  return result.rows[0];
};

const updateRole = async (roleId, roleName, roleDescription) => {
  const result = await pool.query(
    'UPDATE um_role SET role_name = $1, role_description = $2, updated_at = NOW() WHERE role_id = $3 RETURNING *;',
    [roleName, roleDescription, roleId]
  );
  return result.rows[0];
};

const deleteRole = async (roleId) => {
  const result = await pool.query('DELETE FROM um_role WHERE role_id = $1 RETURNING *;', [roleId]);
  return result.rows[0];
};

const assignRole = async (userId, roleId) => {
  const result = await pool.query("INSERT INTO um_user_role (user_id, role_id) VALUES ($1, $2) RETURNING *;", [userId, roleId]);
  return result.rows[0];
}

module.exports = {
  createRole,
  getAllRoles,
  getRoleById,
  updateRole,
  deleteRole,
  assignRole
};