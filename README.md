# Basic Node with user api & CRUD

• CRUD endpoints for the following database schema(“Account”).
• User login endpoint with email and password authentication.
• List of accounts endpoint with result limitation through request.

## Prerequisites

Before running this project, ensure you have installed:

- Node.js (version 16.x or higher)
- PostgreSQL

## Getting Started

To get started with this project, follow these steps:

• Setup db with database postgres

• Run schema => {

    CREATE TABLE user_details (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(16),
    password VARCHAR(60) NOT NULL,
    birthday VARCHAR(200),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_modified TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
}


• To run the code 
• npm i
• npm run start
