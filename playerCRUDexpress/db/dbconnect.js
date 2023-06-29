var mysql = require("mysql");

const mysqlconnection = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "root123",
  port: 3306,
  database: "playerCRUD",
});

mysqlconnection.connect((err) => {
  if (err) {
    console.log("error in connection " + JSON.stringify(err));
  } else {
    console.log("connection takatak hai!!!!");
  }
});
module.exports = mysqlconnection;
