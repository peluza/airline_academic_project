const mysql = require("mysql");
const config = require("../controller/config.js");

// Access to DataBases

const connection = mysql.createConnection({
  host: config.host,
  user: config.user_db,
  password: config.password_db,
  database: config.name_data_base,
});

// Check connection
connection.connect((error) => {
  if (error) throw error;
  console.log("Database server running!");
});

module.exports = connection;
