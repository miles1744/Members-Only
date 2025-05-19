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

async function updateMembershipStatus(id, status) {
  const { rows } = await pool.query(
    `UPDATE members
        SET membership_status = $2
      WHERE id = $1
      RETURNING id, first_name, last_name, username, membership_status`,
    [id, status]
  );
  return rows[0];
}

async function addMessage({ user_id, title, body }) {
  const { rows } = await pool.query(
    `INSERT INTO messages (user_id, title, body)
     VALUES ($1, $2, $3)
     RETURNING id, user_id, title, body, created_at`,
    [user_id, title, body]
  );
  return rows[0];
}

module.exports = { 
  getUserByUsername,
  addUser,
  getUserById,
  updateMembershipStatus,
  addMessage
};
