const pool = require("./pool");

async function getUserByUsername(username) {
  const { rows } = await pool.query(
    "SELECT * FROM members WHERE username = $1",
    [username]
  );
  return rows[0];
}

async function addUser({ first_name, last_name, username, password, membership_status }) {
  const { rows } = await pool.query(
    `INSERT INTO members
      (first_name, last_name, username, password, membership_status)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING id, first_name, last_name, username, membership_status`,
    [first_name, last_name, username, password, membership_status]
  );
  return rows[0];
}

async function getUserById(id) {
  const { rows } = await pool.query(
    "SELECT * FROM members WHERE id = $1",
    [id]
  );
  return rows[0];
}

async function getAllClubs() {
  const { rows } = await pool.query(
    `SELECT
       id,
       name,
       description,
       created_at
     FROM clubs
     ORDER BY name`
  );
  return rows;
}

module.exports = { 
  getUserByUsername,
  addUser,
  getUserById,
  getAllClubs };
