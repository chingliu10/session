var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'jeffBezos56',
  database : 'test'
});
 
module.exports = connection