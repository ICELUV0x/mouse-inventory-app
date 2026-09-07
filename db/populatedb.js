const { Client } = require("pg");

const SQL = `
CREATE TABLE IF NOT EXISTS mouse_brands (
id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
name VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS mouse_models (
id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
brand_id INTEGER REFERENCES mouse_brands(id),
name VARCHAR(150) NOT NULL,
color VARCHAR(50),
price NUMERIC(7,2) NOT NULL,
weight_g NUMERIC (6,2),
length_mm NUMERIC (5,2),
width_mm NUMERIC (5,2),
height_mm NUMERIC (5,2),
is_wireless BOOLEAN DEFAULT FALSE,
stock_quantity INTEGER DEFAULT 0,
created_at TIMESTAMPTZ DEFAULT NOW()
);
`

async function main() {
    console.log("seeding...");
    const client = new Client({
        connectionString: process.argv[2],
        ssl: { rejectUnauthorized: false }
    });
    await client.connect();
    await client.query(SQL);
    await client.end();
    console.log("done");
}

main();