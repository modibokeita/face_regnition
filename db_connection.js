const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Modibokeita',
  database: 'face_recognition',
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }

  console.log('Connected to MySQL database');

  // SQL query to create a table for users with names and photo paths
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      photo_path VARCHAR(255)
    )
  `;

  // Execute the table creation query
  connection.query(createTableQuery, (queryErr, results) => {
    if (queryErr) {
      console.error('Error creating the table:', queryErr);
    } else {
      console.log('Table created successfully');
    }

    connection.end((endErr) => {
      if (endErr) {
        console.error('Error closing the MySQL connection:', endErr);
      }
    });
  });
});
