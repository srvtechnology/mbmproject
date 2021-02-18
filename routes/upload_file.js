var express = require('express');
var router = express.Router();
var db = require('../config/database');
var data;

(function () {
  db.query('select topcategoryid,identifier,name,field1,field2 from topcategory  where ?',{status: '1'}, function(err,result) {
      if (err) throw err;
      data=result;
    });
})();


module.exports = router;
