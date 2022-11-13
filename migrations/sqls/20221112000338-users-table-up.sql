CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY ,
    firstName VARCHAR(100) UNIQUE,
    lastName VARCHAR(100),
    password VARCHAR
);