# Backend Boilerplate

## Description

This is a boilerplate for a backend application utilizing Node.js, Express, TypeScript, Mongoose, and MongoDB. It's designed to provide a foundation for building robust and scalable backend systems. The boilerplate includes user authentication, error handling, and environment variable management.

## Features

- **Express**: Fast, unopinionated, minimalist web framework for Node.js.
- **TypeScript**: Adds optional types to JavaScript that support tools for large-scale JavaScript applications.
- **Mongoose**: Elegant MongoDB object modeling for Node.js.
- **MongoDB**: A NoSQL database for modern application development.
- **Dotenv**: Loads environment variables from a .env file into process.env.
- **TS Node Dev**: Compiles your TypeScript code and restarts the server on changes.

## Getting Started

### Dependencies

- Node.js
- Mongo DB
- Bcryptjs
- Dotenv
- Express
- Jsonwebtoken
- Mongoose

### Installation

```bash
git clone https://github.com/almanoduerme/api-auth-boilerplate.git
cd api-auth-boilerplate
pnpm install
```

### Configuration

#### Create a `.env` file in the root directory of the project

```bash
touch .env
```

#### Add the following environment variables to `.env`

```env
# Port to run the server on
PORT=3000

# Mongo Database connection string
MONGO_DATABASE_URL=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>?retryWrites=true&w=majority

# Secret key for JWT
JWT_SECRET=secret
```

Replace `your-database` with the name of your MongoDB database and `your-password` with your MongoDB password.

### Usage

#### Start the server in development mode

```bash
pnpm run dev
```

#### The server will be running at `http://localhost:3000`

### Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue for any improvements or bug fixes.

### License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).
