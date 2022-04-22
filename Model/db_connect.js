const Pool = require("pg").Pool;

// For testing locally

// const pool = new Pool({
//     user: 'postgres',
//     password: 'postgres',
//     host: 'localhost',
//     port: 5432,
//     database: 'octosenda'
// });

// Using the heroku App

const pool = new Pool({ // create connection to database
    connectionString: process.env.DATABASE_URL,	// use DATABASE_URL environment variable from Heroku app 
    ssl: {
      rejectUnauthorized: false // don't check for SSL cert
    }
  });

module.exports = pool;