var mysql = require('mysql');
var connection = mysql.createConnection({
  host     : 'mbmchairs-1.clixdlxfurk4.ap-south-1.rds.amazonaws.com',
  port     : '3306',
  user     : 'admin',
  password : 'Mbmchairs',
  database : 'mbmconsoledb',
  insecureAuth : true,
  multipleStatements: true
    // host     : 'localhost',
    // port     : '3306',
    // user     : 'root',
    // password : 'root1234',
    // database : 'mbmconsoledb',
    // insecureAuth : true,
    // multipleStatements: true
});

connection.connect(function(err) {
    if (err) throw err;
});

module.exports = connection;
