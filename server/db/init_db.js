

const { Client } = require("pg");

const SQL = `   
CREATE TYPE membership_status_enum AS ENUM ('active', 'inactive', 'pending');

CREATE TABLE IF NOT EXISTS members (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    first_name VARCHAR ( 255 ),
    last_name VARCHAR ( 255 ),
    username VARCHAR ( 255 ) UNIQUE NOT NULL,
    password TEXT NOT NULL,
    membership_status membership_status_enum NOT NULL
);

CREATE TABLE messages (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    body TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
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
    await client.query(SQL);
    await client.end();

    console.log("done")
}

main();