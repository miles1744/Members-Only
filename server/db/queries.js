require("dotenv").config();
const { Client } = require("pg");

console.log("🌱 SEED SCRIPT STARTED");
console.log("🔗 DATABASE_URL:", process.env.DATABASE_URL || "Missing!");

const SQL = `
CREATE TABLE IF NOT EXISTS categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS groceries (
    id SERIAL PRIMARY KEY,
    item VARCHAR(255) NOT NULL,
    price NUMERIC(10, 2) NOT NULL,
    quantity INTEGER NOT NULL,
    categoryid INTEGER REFERENCES categories(id)
);

INSERT INTO categories (name, description) VALUES 
('dairy', 'Milk, cheese, yogurt, and other dairy products'),
('grain', 'Bread, rice, pasta, and cereal products')
ON CONFLICT DO NOTHING;

INSERT INTO groceries (item, price, quantity, categoryid) VALUES
('Eggs', 5.92, 100, 1),
('Milk', 5.49, 100, 1),
('Bread', 3.42, 100, 2)
ON CONFLICT DO NOTHING;
`;

async function main() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  });

  try {
    console.log("📡 Connecting to DB...");
    await client.connect();
    console.log("📥 Running SQL...");
    await client.query(SQL);
    console.log("✅ Done seeding!");
  } catch (err) {
    console.error("❌ Error:", err);
  } finally {
    await client.end();
    console.log("🔌 DB connection closed");
  }
}

main();
