var express = require('express');
var router = express.Router();
var db = require('../config/database');

//console login
     router.post('/consoleloginreq', function(req,res,next){
         var sess=req.session;
        var username=req.body.username;
        var password=req.body.password;
        const buf = Buffer.from(password);
        var base64passkey=buf.toString('base64');
        var loginSQL="select a.USER_ID,a.FIELD1,c.IDENTIFIER,d.CART_ID,d.count from user a join usrrole b on b.USER_ID=a.USER_ID join role c on c.ROLE_ID=b.ROLE_ID"+
                 " left outer join cart d on d.MEMBER_ID=a.USER_ID AND d.STATUS='P' "+
                " where (a.LOGON_ID1='"+username+"' or a.LOGON_ID2='"+username+"' or a.LOGON_ID3='"+username+"') and a.PASSWORD='"+base64passkey+"' and a.USER_TYPE='A' and a.PASSWORDSTATE=1 "+
                " and c.IDENTIFIER IN ('HOD','A','SE','DT','DL')";
                db.query(loginSQL, function(err,data) {
                    if (err) throw err;
                    if (data.length===0){
                    return res.redirect('/login');
                    }else{
                      data.forEach(function(element){
                          sess.user_id=element.USER_ID;
                          sess.user_type=element.IDENTIFIER;
                          sess.cart_id=element.CART_ID;
                          sess.cart_count=element.count;
                          sess.user_img=element.FIELD1;
                        });
                        var nameSQL="select concat(FIRSTNAME,' ',LASTNAME) as name from address where MEMBER_ID="+sess.user_id+"";
                        db.query(nameSQL, function(err,result) {
                            if (err) throw err;
                            result.forEach(function(element){
                                sess.username=element.name;
                              });

                              if(sess.user_type !=='SE'){
                                return res.redirect('/');
                              }else if(sess.user_type =='SE'){
                                return res.redirect('/login_se');
                              }
                          });
                      }
                  });
          });
module.exports = router;
