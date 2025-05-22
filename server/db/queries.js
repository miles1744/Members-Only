const pool = require("./pool");

async function getUserByUsername(username) {
  const { rows } = await pool.query(
    "SELECT * FROM members WHERE username = $1",
    [username]
  );
  return rows[0];
}

async function addUser({ first_name, last_name, username, password, membership_status, admin }) {
  const { rows } = await pool.query(
    `INSERT INTO members
      (first_name, last_name, username, password, membership_status, admin)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING id, first_name, last_name, username, membership_status, admin`,
    [first_name, last_name, username, password, membership_status, admin]
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

async function deleteMessage(id) {
  const { rows } = await pool.query(
    `DELETE FROM messages
     WHERE id = $1
     RETURNING *;`,
    [id]
  );
  return rows[0] || null;
}


async function getMessages() {
  const { rows } = await pool.query(
    `
    SELECT
      messages.id,
      messages.title,
      messages.body,
      messages.created_at,
      members.id           AS author_id,
      members.username     AS author_username,
      members.first_name,
      members.last_name
    FROM messages 
    JOIN members 
      ON members.id = messages.user_id
    ORDER BY messages.created_at DESC
    `
  );
  return rows;
}


module.exports = { 
  getUserByUsername,
  addUser,
  getUserById,
  updateMembershipStatus,
  addMessage,
  getMessages,
  deleteMessage
};
