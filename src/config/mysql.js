const mysql = require("mysql2");

const urlDB =
  "mysql://root:qCV0AhCF7NsmMDtmvWNm@containers-us-west-35.railway.app:6105/railway";
// const connection = mysql.createConnection({
//   host: process.env.HOST,
//   user: process.env.DBUSER,
//   password: process.env.DBPASSWORD,
//   database: process.env.DATABASE,
// });

const connection = mysql.createConnection(urlDB);

connection.connect((error) => {
  // if (error) {
  //   throw error;
  // }
  console.log("you are now connected db mysql...");
});

module.exports = connection;
