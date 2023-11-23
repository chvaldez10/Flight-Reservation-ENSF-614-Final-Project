import mysql from 'mysql';
import dotenv from 'dotenv';

dotenv.config();

class Database {
  // Singleton implementation
  constructor() {
    if (this.instance) {
      return this.instance;
    }

    // MySQL connection configuration
    this.connection = mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
    });

    // Store the instance
    this.instance = this;
    return this;
  }

  // Query method to execute SQL queries
  query(sql, args) {
    return new Promise((resolve, reject) => {
      this.connection.query(sql, args, (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  }
}

// Create a single instance of the Database class
const instance = new Database();
Object.freeze(instance);

// Export the single instance
export default instance;
