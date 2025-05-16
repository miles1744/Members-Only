require("dotenv").config();
const { Client } = require("pg");




const CREATE_TABLES_SQL = `   
CREATE TABLE IF NOT EXISTS members (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  first_name VARCHAR(255),
  last_name VARCHAR(255),
  username VARCHAR(255) UNIQUE NOT NULL,
  password TEXT NOT NULL,
);

CREATE TABLE IF NOT EXISTS messages (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES members(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  body TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2) New clubs table
CREATE TABLE IF NOT EXISTS clubs (
  id SERIAL PRIMARY KEY,         -- unique club identifier
  name VARCHAR(255) UNIQUE NOT NULL,  -- e.g. “Chess Club”, “Bookworms”
  description TEXT,              -- optional longer description
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS member_clubs (
  member_id INTEGER NOT NULL
    REFERENCES members(id)
    ON DELETE CASCADE,
  club_id   INTEGER NOT NULL
    REFERENCES clubs(id)
    ON DELETE CASCADE,
  joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (member_id, club_id)  -- prevent duplicate joins
);

`;

async function main() {

    console.log("seeding...")

    const client = new Client({
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        database: process.env.DB_NAME,
    });

    await client.connect();
    await client.query(ENUM_SQL);
    await client.query(CREATE_TABLES_SQL);
    await client.end();

    console.log("done")
}

main();