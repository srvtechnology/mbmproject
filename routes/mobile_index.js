var express = require('express');
var router = express.Router();
var moment = require('moment');
var formidable = require("formidable");
var fs = require("fs");
var db = require('../config/database');
var emailer = require('../config/emailers');
var const_data = require('../config/const');
var data;
/**Login api*/
router.post('/consolelogin', function(req,res,next){
   var username=req.body.username;
   var password=req.body.password;
   var userId;
   var userType;
   var cartId;
   var cartCount;
   var thumbnailImg;
   const buf = Buffer.from(password);
   var base64passkey=buf.toString('base64');
   var loginSQL="select a.USER_ID,c.IDENTIFIER,d.CART_ID,d.count AS CARTCOUNT,a.FIELD1 AS THUMBNAILIMG from user a join usrrole b on b.USER_ID=a.USER_ID join role c on c.ROLE_ID=b.ROLE_ID"+
            " left outer join cart d on d.MEMBER_ID=a.USER_ID AND d.STATUS='P' "+
           " where (a.LOGON_ID1='"+username+"' or a.LOGON_ID2='"+username+"' or a.LOGON_ID3='"+username+"') and a.PASSWORD='"+base64passkey+"' and a.USER_TYPE='A' and a.PASSWORDSTATE=1 "+
           " and c.IDENTIFIER IN ('SE','DT','DL')";
           db.query(loginSQL, function(err,data) {
               if (err) throw err;
               if (data.length===0){
               res.json({'isLogin':false,'error':'Invalid username or password'});
               }else{
                 var nameSQL;
                 data.forEach(function(element){
                     userId=element.USER_ID;
                     userType=element.IDENTIFIER;
                     cartId=element.CART_ID;
                     cartCount=element.CARTCOUNT;
                     thumbnailImg=element.THUMBNAILIMG;
                   });
                   nameSQL="select FIRSTNAME,LASTNAME from address where MEMBER_ID="+userId+"";
                   db.query(nameSQL, function(err,result) {
                       if (err) throw err;
                        res.json({'isLogin':true,'userInfo':{result},'userId':userId,'userType':userType,'cartId':cartId,'cartCount':cartCount,'thumbnailImg':thumbnailImg});
                     });
                 }
             });
     });

     /* Profile api. */
     router.get('/profile/userId/:userId/userType/:userType', function(req, res, next) {
      var userId=req.params.userId;
      var userType=req.params.userType;
       if(userType === undefined){
        res.json({'isError':true,'error':'Invalid user','userId':userId,'userType':userType});
       }else{
         if(userType !='HOD' && userType !='DT' && userType !='DL'
             && userType !='SE'){
           res.json({'isError':true,'error':'Invalid user','userId':userId,'userType':userType});
         }else{
           var profileSQL="select a.USER_ID,a.LOGON_ID1,b.FIRSTNAME,b.LASTNAME,b.ADDRESSFOR,b.ADDRESSTYPE,b.ADDRESSLINE1,b.CITY,b.STATE,b.COUNTRY,b.ZIPCODE,"+
           " b.AADHAARID,b.VOTERID,b.PANNO,b.PASSPORTID,b.gstin,b.company,b.DL,b.EMAIL1,b.MOBILE1,b.MOBILE1CODE,b.PHONE1"+
            " from user a join address b on b.MEMBER_ID=a.USER_ID where a.USER_ID="+userId+"";
            db.query(profileSQL, function(err,result) {
                if (err) {
                  throw err;
                  res.json({'isError':true,'error':'Invalid user','userId':userId,'userType':userType});
                }
                res.json({'isError':false,'profileInfo':{result},'userId':userId,'userType':userType});
              });
         }
       }
     });

     /* Products api. */
     router.get('/products/userId/:userId/userType/:userType', function(req, res, next) {
       var userId=req.params.userId;
       var userType=req.params.userType;
       if(userType === undefined){
        res.json({'isError':true,'error':'Invalid user','userId':userId,'userType':userType});
       }else{
         if(userType !='HOD' && userType !='DT' && userType !='DL'
             && userType !='SE'){
           res.json({'isError':true,'error':'Invalid user','userId':userId,'userType':userType});
         }else{
            var prdSQL="select a.PRODUCT_ID,a.NAME,a.DESCRIPTION,a.THUMBNAIL,a.FULLIMAGE,c.INVENTORY,c.LISTPRICE,c.OFFERPRICE,d.Name AS CATNAME from product a join prdcatrel b on b.PRODUCT_ID=a.PRODUCT_ID"+
            " join productconf c on c.PRODUCT_ID=a.PRODUCT_ID left outer join leafcategory d on d.LeafCategoryId=b.CATEGORY_ID WHERE a.PUBLISHED=1";
            db.query(prdSQL, function(err,result) {
                if (err) {
                  throw err;
                  res.json({'isError':true,'error':'Invalid user','userId':userId,'userType':userType});
                }
                res.json({'isError':false,'prdList':{result},'userId':userId,'userType':userType});
              });
           }
       }
     });

     /* Product details api. */
     router.get('/productdtl/:id/userId/:userId/userType/:userType', function(req, res, next) {
       var prdId=req.params.id;
       var userId=req.params.userId;
       var userType=req.params.userType;
       if(userType === undefined){
         res.json({'isError':true,'error':'Invalid user','userId':userId,'userType':userType});
       }else{
         if(userType !='HOD' && userType !='DT' && userType !='DL'
             && userType !='SE'){
           res.json({'isError':true,'error':'Invalid user','userId':userId,'userType':userType});
         }else{
           var prdSQL="select a.PRODUCT_ID,a.NAME,a.DESCRIPTION,a.THUMBNAIL,a.FULLIMAGE,c.INVENTORY,c.LISTPRICE,c.OFFERPRICE,d.Name AS CATNAME from product a join prdcatrel b on b.PRODUCT_ID=a.PRODUCT_ID"+
           " join productconf c on c.PRODUCT_ID=a.PRODUCT_ID left outer join leafcategory d on d.LeafCategoryId=b.CATEGORY_ID "+
           " WHERE a.PUBLISHED=1 and a.PRODUCT_ID="+prdId+"";

            db.query(prdSQL, function(err,result) {
                if (err) {
                  throw err;
                  res.json({'isError':true,'error':'Invalid user','userId':userId,'userType':userType});
                }
                var spareSQL="select * from pspare where PRODUCT_ID="+prdId+" and STATUS=1";
                db.query(spareSQL, function(err,presult) {
                    if (err) {
                      throw err;
                      res.json({'isError':true,'error':'Invalid user','userId':userId,'userType':userType});
                    }
                    res.json({'isError':false,'prdDtl':{result},'spList':{presult},'userId':userId,'userType':userType});

                  });
              });
           }
       }
     });

     /* Sales executive api. */
     router.get('/users_se/userId/:userId/userType/:userType', function(req, res, next) {

       var userId=req.params.userId;
       var userType=req.params.userType;
       var usersSQL="";
       if(userType === undefined){
         res.json({'isError':true,'error':'Invalid user','userId':userId,'userType':userType});
       }else{
         if(userType !='HOD' && userType !='DT' && userType !='DL'
             && userType !='SE'){
           res.json({'isError':true,'error':'Invalid user','userId':userId,'userType':userType});
         }else{
           if(userType =='DT'){
             usersSQL="select a.USER_ID,a.LOGON_ID1,a.STATUS,c.IDENTIFIER,d.FIRSTNAME,d.LASTNAME,d.EMAIL1,d.MOBILE1,d.PHONE1,concat(d.city,',',d.state,',',d.country,',',d.zipcode) as ADDRESS "+
             " from user a join  usrrole b on b.USER_ID=a.USER_ID join role c on c.ROLE_ID=b.ROLE_ID "+
             " join address d on d.MEMBER_ID=a.USER_ID join usrrel e on e.USER_ID_TO=a.USER_ID"+
             " join user f on f.USER_ID=e.USER_ID_FROM join usrrole g on g.USER_ID=f.USER_ID"+
             " join role h on h.ROLE_ID=g.ROLE_ID WHERE c.IDENTIFIER='SE' AND h.IDENTIFIER='DT' AND f.USER_ID="+userId+"";
           }else if(userType =='DL'){
             usersSQL="select a.USER_ID,a.LOGON_ID1,a.STATUS,c.IDENTIFIER,d.FIRSTNAME,d.LASTNAME,d.EMAIL1,d.MOBILE1,d.PHONE1,concat(d.city,',',d.state,',',d.country,',',d.zipcode) as ADDRESS "+
             " from user a join  usrrole b on b.USER_ID=a.USER_ID join role c on c.ROLE_ID=b.ROLE_ID "+
             " join address d on d.MEMBER_ID=a.USER_ID join usrrel e on e.USER_ID_TO=a.USER_ID"+
             " join user f on f.USER_ID=e.USER_ID_FROM join usrrole g on g.USER_ID=f.USER_ID"+
             " join role h on h.ROLE_ID=g.ROLE_ID WHERE c.IDENTIFIER='SE' AND h.IDENTIFIER='DL' AND f.USER_ID="+userId+"";
           }else{
             usersSQL="select a.USER_ID,a.LOGON_ID1,a.STATUS,c.IDENTIFIER,d.FIRSTNAME,d.LASTNAME,d.EMAIL1,d.MOBILE1,d.PHONE1,concat(d.city,',',d.state,',',d.country,',',d.zipcode) as ADDRESS from user a join "+
            " usrrole b on b.USER_ID=a.USER_ID join role c on c.ROLE_ID=b.ROLE_ID join address d on d.MEMBER_ID=a.USER_ID WHERE c.IDENTIFIER='SE'";
           }
                db.query(usersSQL, function(err,result) {
             if (err) {
               throw err;
               res.json({'isError':true,'error':'Invalid user','userId':userId,'userType':userType});
             }
             res.json({'isError':false,'users':{result},'userId':userId,'userType':userType});
           });
         }
       }
     });

     /* Sales executive api. */
     router.get('/users_seByName/name/:name/userId/:userId/userType/:userType', function(req, res, next) {

       var name=req.params.name;
       var userId=req.params.userId;
       var userType=req.params.userType;
       var usersSQL="";
       if(userType === undefined){
         res.json({'isError':true,'error':'Invalid user','userId':userId,'userType':userType});
       }else{
         if(userType !='HOD' && userType !='DT' && userType !='DL'
             && userType !='SE'){
           res.json({'isError':true,'error':'Invalid user','userId':userId,'userType':userType});
         }else{
           if(userType =='DT'){
             usersSQL="select a.USER_ID,a.LOGON_ID1,a.STATUS,c.IDENTIFIER,d.FIRSTNAME,d.LASTNAME,d.EMAIL1,d.MOBILE1,d.PHONE1,concat(d.city,',',d.state,',',d.country,',',d.zipcode) as ADDRESS "+
             " from user a join  usrrole b on b.USER_ID=a.USER_ID join role c on c.ROLE_ID=b.ROLE_ID "+
             " join address d on d.MEMBER_ID=a.USER_ID join usrrel e on e.USER_ID_TO=a.USER_ID"+
             " join user f on f.USER_ID=e.USER_ID_FROM join usrrole g on g.USER_ID=f.USER_ID"+
             " join role h on h.ROLE_ID=g.ROLE_ID WHERE c.IDENTIFIER='SE' AND h.IDENTIFIER='DT' AND f.USER_ID="+userId+""+
             " AND (d.FIRSTNAME like '%"+name+"%' OR d.LASTNAME like '%"+name+"%')";
           }else if(userType =='DL'){
             usersSQL="select a.USER_ID,a.LOGON_ID1,a.STATUS,c.IDENTIFIER,d.FIRSTNAME,d.LASTNAME,d.EMAIL1,d.MOBILE1,d.PHONE1,concat(d.city,',',d.state,',',d.country,',',d.zipcode) as ADDRESS "+
             " from user a join  usrrole b on b.USER_ID=a.USER_ID join role c on c.ROLE_ID=b.ROLE_ID "+
             " join address d on d.MEMBER_ID=a.USER_ID join usrrel e on e.USER_ID_TO=a.USER_ID"+
             " join user f on f.USER_ID=e.USER_ID_FROM join usrrole g on g.USER_ID=f.USER_ID"+
             " join role h on h.ROLE_ID=g.ROLE_ID WHERE c.IDENTIFIER='SE' AND h.IDENTIFIER='DL' AND f.USER_ID="+userId+""+
             " AND (d.FIRSTNAME like '%"+name+"%' OR d.LASTNAME like '%"+name+"%')";
           }else{
             usersSQL="select a.USER_ID,a.LOGON_ID1,a.STATUS,c.IDENTIFIER,d.FIRSTNAME,d.LASTNAME,d.EMAIL1,d.MOBILE1,d.PHONE1,concat(d.city,',',d.state,',',d.country,',',d.zipcode) as ADDRESS from user a join "+
            " usrrole b on b.USER_ID=a.USER_ID join role c on c.ROLE_ID=b.ROLE_ID join address d on d.MEMBER_ID=a.USER_ID WHERE c.IDENTIFIER='SE'"+
            " AND (d.FIRSTNAME like '%"+name+"%' OR d.LASTNAME like '%"+name+"%')";
           }
                db.query(usersSQL, function(err,result) {
             if (err) {
               throw err;
               res.json({'isError':true,'error':'Invalid user','userId':userId,'userType':userType});
             }
             res.json({'isError':false,'users':{result},'userId':userId,'userType':userType});
           });
         }
       }
     });


     /* Dealer api. */
     router.get('/users_dl/userId/:userId/userType/:userType', function(req, res, next) {

       var userId=req.params.userId;
       var userType=req.params.userType;
       var usersSQL="";
       if(userType === undefined){
         res.json({'isError':true,'error':'Invalid user','userId':userId,'userType':userType});
       }else{
         if(userType !='HOD' && userType !='DT' && userType !='DL'
             && userType !='SE'){
           res.json({'isError':true,'error':'Invalid user','userId':userId,'userType':userType});
         }else{
           if(userType =='SE'){
             usersSQL="select a.USER_ID,a.LOGON_ID1,a.STATUS,c.IDENTIFIER,d.FIRSTNAME,d.LASTNAME,d.EMAIL1,d.MOBILE1,d.PHONE1,concat(d.ADDRESSLINE1,',',d.city,',',d.state,',',d.country,',',d.zipcode) as ADDRESS,d.ZIPCODE,d.AADHAARID,d.PANNO,d.gstin,d.DL,d.company "+
             " from user a join usrrole b on b.USER_ID=a.USER_ID join role c on "+
             " c.ROLE_ID=b.ROLE_ID join address d on d.MEMBER_ID=a.USER_ID "+
             " join usrrel e on e.USER_ID_FROM=a.USER_ID join user f on f.USER_ID=e.USER_ID_TO "+
             " join usrrole g on g.USER_ID=f.USER_ID join role h on h.ROLE_ID=g.ROLE_ID "+
             " WHERE c.IDENTIFIER='DL' AND h.IDENTIFIER='SE' AND f.USER_ID="+userId+"";
           }else{
             usersSQL="select a.USER_ID,a.LOGON_ID1,a.STATUS,c.IDENTIFIER,d.FIRSTNAME,d.LASTNAME,d.EMAIL1,d.MOBILE1,d.PHONE1,concat(d.ADDRESSLINE1,',',d.city,',',d.state,',',d.country,',',d.zipcode) as ADDRESS,d.ZIPCODE,d.AADHAARID,d.PANNO,d.gstin,d.DL,d.company from user a join "+
            " usrrole b on b.USER_ID=a.USER_ID join role c on c.ROLE_ID=b.ROLE_ID join address d on d.MEMBER_ID=a.USER_ID WHERE c.IDENTIFIER='DL'";
           }
                db.query(usersSQL, function(err,result) {
             if (err) {
               throw err;
               res.json({'isError':true,'error':'Invalid user','userId':userId,'userType':userType});
             }
             res.json({'isError':false,'users':{result},'userId':userId,'userType':userType});
           });
         }
       }
     });

     /* Dealer api. */
     router.get('/users_dlByName/name/:name/userId/:userId/userType/:userType', function(req, res, next) {

       var userId=req.params.userId;
       var userType=req.params.userType;
       var name=req.params.name;
       var usersSQL="";
       if(userType === undefined){
         res.json({'isError':true,'error':'Invalid user','userId':userId,'userType':userType});
       }else{
         if(userType !='HOD' && userType !='DT' && userType !='DL'
             && userType !='SE'){
           res.json({'isError':true,'error':'Invalid user','userId':userId,'userType':userType});
         }else{
           if(userType =='SE'){
             usersSQL="select a.USER_ID,a.LOGON_ID1,a.STATUS,c.IDENTIFIER,d.FIRSTNAME,d.LASTNAME,d.EMAIL1,d.MOBILE1,d.PHONE1,concat(d.ADDRESSLINE1,',',d.city,',',d.state,',',d.country,',',d.zipcode) as ADDRESS,d.ZIPCODE,d.AADHAARID,d.PANNO,d.gstin,d.DL,d.company "+
             " from user a join usrrole b on b.USER_ID=a.USER_ID join role c on "+
             " c.ROLE_ID=b.ROLE_ID join address d on d.MEMBER_ID=a.USER_ID "+
             " join usrrel e on e.USER_ID_FROM=a.USER_ID join user f on f.USER_ID=e.USER_ID_TO "+
             " join usrrole g on g.USER_ID=f.USER_ID join role h on h.ROLE_ID=g.ROLE_ID "+
             " WHERE c.IDENTIFIER='DL' AND h.IDENTIFIER='SE' AND f.USER_ID="+userId+""+
             " AND (d.FIRSTNAME like '%"+name+"%' OR d.LASTNAME like '%"+name+"%')";
           }else{
             usersSQL="select a.USER_ID,a.LOGON_ID1,a.STATUS,c.IDENTIFIER,d.FIRSTNAME,d.LASTNAME,d.EMAIL1,d.MOBILE1,d.PHONE1,concat(d.ADDRESSLINE1,',',d.city,',',d.state,',',d.country,',',d.zipcode) as ADDRESS,d.ZIPCODE,d.AADHAARID,d.PANNO,d.gstin,d.DL,d.company from user a join "+
            " usrrole b on b.USER_ID=a.USER_ID join role c on c.ROLE_ID=b.ROLE_ID join address d on d.MEMBER_ID=a.USER_ID WHERE c.IDENTIFIER='DL'  AND (d.FIRSTNAME like '%"+name+"%' OR d.LASTNAME like '%"+name+"%')";
           }
                db.query(usersSQL, function(err,result) {
             if (err) {
               throw err;
               res.json({'isError':true,'error':'Invalid user','userId':userId,'userType':userType});
             }
             res.json({'isError':false,'users':{result},'userId':userId,'userType':userType});
           });
         }
       }
     });
     /* Distributor api. */
     router.get('/users_dt/userId/:userId/userType/:userType', function(req, res, next) {

       var userId=req.params.userId;
       var userType=req.params.userType;
       var usersSQL="";
       if(userType === undefined){
         res.json({'isError':true,'error':'Invalid user','userId':userId,'userType':userType});
       }else{
         if(userType !='HOD' && userType !='DT' && userType !='DL'
             && userType !='SE'){
           res.json({'isError':true,'error':'Invalid user','userId':userId,'userType':userType});
         }else{
           if(userType =='SE'){
             usersSQL="select a.USER_ID,a.LOGON_ID1,a.STATUS,c.IDENTIFIER,d.FIRSTNAME,d.LASTNAME,d.EMAIL1,d.MOBILE1,d.PHONE1,concat(d.ADDRESSLINE1,',',d.city,',',d.state,',',d.country,',',d.zipcode) as ADDRESS,d.ZIPCODE,d.AADHAARID,d.PANNO,d.gstin,d.DL,d.company "+
             " from user a join usrrole b on b.USER_ID=a.USER_ID join role c on "+
             " c.ROLE_ID=b.ROLE_ID join address d on d.MEMBER_ID=a.USER_ID "+
             " join usrrel e on e.USER_ID_FROM=a.USER_ID join user f on f.USER_ID=e.USER_ID_TO "+
             " join usrrole g on g.USER_ID=f.USER_ID join role h on h.ROLE_ID=g.ROLE_ID "+
             " WHERE c.IDENTIFIER='DT' AND h.IDENTIFIER='SE' AND f.USER_ID="+userId+"";
           }else{
             usersSQL="select a.USER_ID,a.LOGON_ID1,a.STATUS,c.IDENTIFIER,d.FIRSTNAME,d.LASTNAME,d.EMAIL1,d.MOBILE1,d.PHONE1,concat(d.ADDRESSLINE1,',',d.city,',',d.state,',',d.country,',',d.zipcode) as ADDRESS,d.ZIPCODE,d.AADHAARID,d.PANNO,d.gstin,d.DL,d.company from user a join "+
            " usrrole b on b.USER_ID=a.USER_ID join role c on c.ROLE_ID=b.ROLE_ID join address d on d.MEMBER_ID=a.USER_ID WHERE c.IDENTIFIER='DT'";
           }
                db.query(usersSQL, function(err,result) {
             if (err) {
               throw err;
               res.json({'isError':true,'error':'Invalid user','userId':userId,'userType':userType});
             }
             res.json({'isError':false,'users':{result},'userId':userId,'userType':userType});
           });
         }
       }
     });

     /* Distributor api. */
     router.get('/users_dtByName/name/:name/userId/:userId/userType/:userType', function(req, res, next) {

       var userId=req.params.userId;
       var userType=req.params.userType;
       var name=req.params.name;
       var usersSQL="";
       if(userType === undefined){
         res.json({'isError':true,'error':'Invalid user','userId':userId,'userType':userType});
       }else{
         if(userType !='HOD' && userType !='DT' && userType !='DL'
             && userType !='SE'){
           res.json({'isError':true,'error':'Invalid user','userId':userId,'userType':userType});
         }else{
           if(userType =='SE'){
             usersSQL="select a.USER_ID,a.LOGON_ID1,a.STATUS,c.IDENTIFIER,d.FIRSTNAME,d.LASTNAME,d.EMAIL1,d.MOBILE1,d.PHONE1,concat(d.ADDRESSLINE1,',',d.city,',',d.state,',',d.country,',',d.zipcode) as ADDRESS,d.ZIPCODE,d.AADHAARID,d.PANNO,d.gstin,d.DL,d.company "+
             " from user a join usrrole b on b.USER_ID=a.USER_ID join role c on "+
             " c.ROLE_ID=b.ROLE_ID join address d on d.MEMBER_ID=a.USER_ID "+
             " join usrrel e on e.USER_ID_FROM=a.USER_ID join user f on f.USER_ID=e.USER_ID_TO "+
             " join usrrole g on g.USER_ID=f.USER_ID join role h on h.ROLE_ID=g.ROLE_ID "+
             " WHERE c.IDENTIFIER='DT' AND h.IDENTIFIER='SE' AND f.USER_ID="+userId+""+
             " AND (d.FIRSTNAME like '%"+name+"%' OR d.LASTNAME like '%"+name+"%')";
           }else{
             usersSQL="select a.USER_ID,a.LOGON_ID1,a.STATUS,c.IDENTIFIER,d.FIRSTNAME,d.LASTNAME,d.EMAIL1,d.MOBILE1,d.PHONE1,concat(d.ADDRESSLINE1,',',d.city,',',d.state,',',d.country,',',d.zipcode) as ADDRESS,d.ZIPCODE,d.AADHAARID,d.PANNO,d.gstin,d.DL,d.company from user a join "+
            " usrrole b on b.USER_ID=a.USER_ID join role c on c.ROLE_ID=b.ROLE_ID join address d on d.MEMBER_ID=a.USER_ID WHERE c.IDENTIFIER='DT' AND (d.FIRSTNAME like '%"+name+"%' OR d.LASTNAME like '%"+name+"%')";
           }
                db.query(usersSQL, function(err,result) {
             if (err) {
               throw err;
               res.json({'isError':true,'error':'Invalid user','userId':userId,'userType':userType});
             }
             res.json({'isError':false,'users':{result},'userId':userId,'userType':userType});
           });
         }
       }
     });

     /**Place order*/
     router.post('/addToCart', function(req, res, next) {
       var userId=req.body.userId;
       var userType=req.body.userType;
       var pid=req.body.prdId;
       var qty=req.body.qty;
       var price=req.body.price;
       var spid=req.body.spid;
       var total=price * qty;
       var stotal;
       var totalwithTax=total+(total * 0.175);
       var username;
       var email;
       var mobile;
       var productname;
       var producturl;
       var productpdf;
       var count=0;
       if(userType === undefined){
       res.json({'isError':true,'error':'Invalid user','userId':userId,'userType':userType});
       }else{
         if(userType !='DT' && userType !='DL'
             && userType !='SE'){
        res.json({'isError':true,'error':'Invalid user','userId':userId,'userType':userType});
         }else{

           var usrSQL="select concat(FIRSTNAME,' ',LASTNAME) AS NAME,EMAIL1,MOBILE1 from address where MEMBER_ID="+userId+"";

           db.query(usrSQL, function(err,result1) {
             if (err)
            {
             throw err;
             res.json({'isError':true,'error':'Invalid user','userId':userId,'userType':userType});
            }
             result1.forEach(function(element){
                 username=element.NAME;
                 email=element.EMAIL1;
                 mobile=element.MOBILE1;
               });

           });



           var prdSQL="select NAME,THUMBNAIL from product where product_id="+pid+"";

           db.query(prdSQL, function(err,result2) {
             if (err)
            {
             throw err;
             res.json({'isError':true,'error':'Invalid user','userId':userId,'userType':userType});
            }
             result2.forEach(function(element){
                 productname=element.NAME;
                 producturl=const_data.cdn_image_url+element.THUMBNAIL;
                 productpdf='';
               });

           });
           var sprdSQL="select SUM(PRICE) AS PRICE from pspare where PSPARE_ID in("+spid+")";

           db.query(sprdSQL, function(err,result3) {
             if (err)
            {
             throw err;
             res.json({'isError':true,'error':'Invalid user','userId':userId,'userType':userType});
            }
             result3.forEach(function(element){
                 stotal=element.PRICE;
               });
               var cartCountSQL="select count from cart WHERE MEMBER_ID="+userId+" AND STATUS='P'";

               db.query(cartCountSQL, function(err,resultCartCount) {
                 if (err)
                {
                 throw err;
                 res.json({'isError':true,'error':'Invalid user','userId':userId,'userType':userType});
                }
                 resultCartCount.forEach(function(element){
                     count=element.count;
                   });

               });
               var c_count=1;
               if(count != null || count != undefined){
                 c_count=count+1;
               }
               if(stotal == undefined){
                 stotal=0;
               }

               var ftotal=total+stotal;
               var ftotalwithTax=total+(total * 0.175);
               var cartSQL="insert into cart(member_id,count,status) value("+userId+","+c_count+",'P') ON "+
               " DUPLICATE KEY UPDATE count="+c_count+"";
               var cartdtlSQL="insert into cartdtl(cart_id,member_id,product_id,pspare_id,QTY,STATUS,field1,field2,PSPARE_PRICE,TOTAL) "+
               " value((select CART_ID from cart WHERE MEMBER_ID="+userId+" AND STATUS='P'),"+userId+","+pid+",'"+spid+"',"+qty+",'P','"+total+"',"+
               " '"+stotal+"',(select GROUP_CONCAT(concat(PSPARE_ID,'/',PRICE) SEPARATOR ',') from pspare where PSPARE_ID IN ("+spid+")),'"+ftotal+"')";
             db.query(cartSQL, function(err,result) {
                 if (err)
                {
                 throw err;
                 res.json({'isError':true,'error':'Invalid user','userId':userId,'userType':userType});
                }

                db.query(cartdtlSQL, function(err,result4) {
                  if (err)
                 {
                  throw err;
                  res.json({'isError':true,'error':'Invalid user','userId':userId,'userType':userType});
                 }
                 var updateCartSQL=" UPDATE cart SET TOTAL=(select SUM(TOTAL)"+
                 "+(SUM(TOTAL)*0.175) FROM cartdtl "+
                 " WHERE MEMBER_ID="+userId+" AND STATUS='P'), FIELD1=(select SUM(TOTAL) FROM cartdtl "+
                 " WHERE MEMBER_ID="+userId+" AND STATUS='P'), FIELD2=(select (SUM(TOTAL)*0.175) FROM cartdtl "+
                 " WHERE MEMBER_ID="+userId+" AND STATUS='P') "+
                 " WHERE MEMBER_ID="+userId+" AND STATUS='P'";
                 db.query(updateCartSQL, function(err,result5) {
                   if (err)
                  {
                   throw err;
                   res.json({'isError':true,'error':'Invalid user','userId':userId,'userType':userType});
                  }

                  res.json({'isError':false,'isUpdated':true,'error':'Invalid user'});
                 });

                });
                 let mailOptionsAdmin = {
                 from: const_data.admin_email,
                 to: const_data.info_admin,
                 cc: const_data.info_admin1,
                 subject: 'Enquiry by Mr.'+username,
                 html: `<head>
              <meta charset="utf-8" />
              <meta http-equiv="X-UA-Compatible" content="IE=edge">
              <title>Email-Text Template</title>
              <meta name="viewport" content="width=device-width, initial-scale=1">

             </head>
             <body style="margin:0; padding:0; background: #fff;">
              <table border="0" cellpadding="0" cellspacing="0" style="width:100%;">
                <tr>
                  <td>
                    <img src="http://articocdn.s3.us-east-2.amazonaws.com/image/logo/logo.png" width="80px" alt="Logo">
                    <p style="font-family:'Source Sans Pro', sans-serif;font-size:18px;color:#454545;margin:0px;padding-top:28px; font-weight: 600;">
                    Hi Admin,
                    </p>
                      <p style="font-family:'Source Sans Pro',sans-serif;font-size: 16px;color: #454545;margin:0px;line-height:1.5;padding-top:18px">Mr.`+username+` have placed an enquiry contact him at `+mobile+` and email him at `+email+` </p><br>
                   <ul>
                     <li><p style="font-family:'Source Sans Pro',sans-serif;font-size: 16px;color: #454545;margin:0px;line-height:1.5;padding-top:18px">
                   `+productname+`</p></li>
                    <li><img src="`+producturl+`" alt="product"></li>
                    <li><a href="`+productpdf+`" target="_blank">Click for pdf design</li>
                    <ul>
                  </td>
                </tr>
                <tr>
                  <td style="padding-top:16px;">
                      <p style="margin:0px;font-family:SFProText-Regular,sans-serif;font-size: 16px;color:#454545;line-height: 1.5;">
                      Thanks & Regardss
                      </p>
                      </td>
                      <tr>
                        <td style="padding-top:28px;">
                          <p style="font-family:'Source Sans Pro', sans-serif;font-size:18px;color:#454545; font-weight: 600;">Vipin Kashyap<br>
                            <span style="font-family:'Source Sans Pro', sans-serif;font-size:16px;color:#454545;font-weight:normal;">
                                                                                    Artico Enterprises
                                                                             </span><br>
                                  <span style="font-family:'Source Sans Pro', sans-serif;font-size:16px;color:#454545;font-weight:normal;">
                                                                              +91 9312504492 </span>
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td style="background-color: #ececec;border-radius: 4px;">
                          <p style="margin:0px;font-family:'Source Sans Pro', sans-serif; font-size: 24px;color:#00b18f;text-align: center;padding-top:11px"><a href="http://www.articoprinters.com/"  style="text-decoration: none;color:#00b18f;">www.articoprinters.com</a></p>
                          <p style="margin:0px;font-family:'Source Sans Pro', sans-serif; font-size:16px;color:#454545;text-align:center;padding-top:11px;padding-bottom:12px"><a href="#" style="text-decoration: none;color: #454545;">About Us</a><span style="padding:0 24px 0 24px">|</span><a href="#" style="text-decoration: none;color: #454545;">Conditions</a><span style="padding:0 24px 0 24px">|</span>
                            <a href="#" style="text-decoration: none;color: #454545;">Contact Us</a></p>
                          </td>
                        </tr>
                      </table>
                    </body>
                    </html>`
             };

             let mailOptionsClient = {
             from: const_data.admin_email,
             to: email,
             subject: 'Youre enquiry to www.articoprinters.com',
             html: `<head>
              <meta charset="utf-8" />
              <meta http-equiv="X-UA-Compatible" content="IE=edge">
              <title>Email-Text Template</title>
              <meta name="viewport" content="width=device-width, initial-scale=1">

             </head>
             <body style="margin:0; padding:0; background: #fff;">
              <table border="0" cellpadding="0" cellspacing="0" style="width:100%;">
                <tr>
                  <td>
                    <img src="http://articocdn.s3.us-east-2.amazonaws.com/image/logo/logo.png" width="80px" alt="Logo">
                    <p style="font-family:'Source Sans Pro', sans-serif;font-size:18px;color:#454545;margin:0px;padding-top:28px; font-weight: 600;">
                    Hi `+username+`,
                    </p>
                      <p style="font-family:'Source Sans Pro',sans-serif;font-size: 16px;color: #454545;margin:0px;line-height:1.5;padding-top:18px">You have enquired for the products mentiond below.</p><br>
                      <ul>
                         <li><p style="font-family:'Source Sans Pro',sans-serif;font-size: 16px;color: #454545;margin:0px;line-height:1.5;padding-top:18px">
                       `+productname+`</p></li>
                       <li><img src="`+producturl+`" alt="product"></li>
                       <li><a href="`+productpdf+`" target="_blank">Click for pdf design</li>
                       <ul>
                  </td>
                </tr>
                <tr>
                  <td style="padding-top:16px;">
                      <p style="margin:0px;font-family:SFProText-Regular,sans-serif;font-size: 16px;color:#454545;line-height: 1.5;">
                      Thanks & Regardss
                      </p>
                      </td>
                      <tr>
                        <td style="padding-top:28px;">
                          <p style="font-family:'Source Sans Pro', sans-serif;font-size:18px;color:#454545; font-weight: 600;">Vipin Kashyap<br>
                            <span style="font-family:'Source Sans Pro', sans-serif;font-size:16px;color:#454545;font-weight:normal;">
                                                                                    Artico Enterprises
                                                                             </span><br>
                                  <span style="font-family:'Source Sans Pro', sans-serif;font-size:16px;color:#454545;font-weight:normal;">
                                                                              +91 9312504492 </span>
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td style="background-color: #ececec;border-radius: 4px;">
                          <p style="margin:0px;font-family:'Source Sans Pro', sans-serif; font-size: 24px;color:#00b18f;text-align: center;padding-top:11px"><a href="http://www.articoprinters.com/"  style="text-decoration: none;color:#00b18f;">www.articoprinters.com</a></p>
                          <p style="margin:0px;font-family:'Source Sans Pro', sans-serif; font-size:16px;color:#454545;text-align:center;padding-top:11px;padding-bottom:12px"><a href="#" style="text-decoration: none;color: #454545;">About Us</a><span style="padding:0 24px 0 24px">|</span><a href="#" style="text-decoration: none;color: #454545;">Conditions</a><span style="padding:0 24px 0 24px">|</span>
                            <a href="#" style="text-decoration: none;color: #454545;">Contact Us</a></p>
                          </td>
                        </tr>
                      </table>
                    </body>
                    </html>`
             };

           //  emailer.sendMail(mailOptionsClient, function (error) {
             //    if (error) {
                   //res.render('enquiry',{menu:data,userId:sess.user_id,userType:sess.user_type});
               //    return res.redirect('/');
                 //    console.log('error:', error);
             //    } else {
               //      emailer.sendMail(mailOptionsAdmin, function (error) {
                   //      if (error) {
                           //res.render('enquiry',{menu:data,userId:sess.user_id,userType:sess.user_type});
                   //      return res.redirect('/');
                     //        console.log('error:', error);
                     //    } else {
                       //    return res.redirect('/');
                         //  res.render('enquiry',{menu:data,userId:sess.user_id,userType:sess.user_type});
                       //      console.log('sent');
                     //    }
                 //   });
               //   }
             //  });
               });
           });


         }
       }
     });


     /**Remove cart item*/
     router.get('/deleteCartItem/cartId/:cartId/cartDtlId/:cartDtlId/userId/:userId/userType/:userType', function(req, res, next) {
       var cart_id=req.params.cartId;
       var cartdtl_id=req.params.cartDtlId;
        var userId=req.params.userId;
        var userType=req.params.userType;

       if(userType === undefined){
       res.json({'isError':true,'error':'Invalid user','userId':userId,'userType':userType});
       }else{
         if(userType !='DT' && userType !='DL'
             && userType !='SE'){
         res.json({'isError':true,'error':'Invalid user','userId':userId,'userType':userType});
         }else{
           var cartUpdateSQL="DELETE FROM cartdtl WHERE CARTDTL_ID="+cartdtl_id+"";
         var cartUpdateSQL1 =" UPDATE cart SET TOTAL=(select SUM(TOTAL)"+
         "+(SUM(TOTAL)*0.175) FROM cartdtl WHERE "+
           " CART_ID="+cart_id+" AND STATUS='P'), FIELD1=(select SUM(TOTAL) FROM cartdtl WHERE "+
             " CART_ID="+cart_id+" AND STATUS='P'), FIELD2=(select SUM(TOTAL)*0.175 FROM cartdtl WHERE CART_ID="+cart_id+" AND STATUS='P') "+
           " WHERE CART_ID="+cart_id+" AND STATUS='P'";
         db.query(cartUpdateSQL, function(err,result) {
             if (err)
            {
             throw err;
             res.json({'isError':true,'error':'Invalid user','userId':userId,'userType':userType});
            }
            db.query(cartUpdateSQL1, function(err,result1) {
                if (err)
               {
                throw err;
                res.json({'isError':true,'error':'Invalid user','userId':userId,'userType':userType});
               }
           res.json({'isError':false,'isUpdated':true,'error':'Invalid user'});
          });
       });
       }
       }
       });

       /* dashboard console. */
       router.get('/cart/userId/:userId/userType/:userType', function(req, res, next) {
         var userId=req.params.userId;
         var userType=req.params.userType;
         var isCartEmpty=false;
         var pspare_ids;
         var pspare_dtl;
         if(userType === undefined){
           res.json({'isError':true,'error':'Invalid user','userId':userId,'userType':userType});
         }else{
           if(userType !='HOD' && userType !='A' && userType !='DT' && userType !='DL'
               && userType !='SE'){
             res.json({'isError':true,'error':'Invalid user','userId':userId,'userType':userType});
           }else{
              var cartQL="select c.PRODUCT_ID,c.NAME,c.THUMBNAIL,c.DESCRIPTION,d.INVENTORY,d.OFFERPRICE,d.LISTPRICE,b.QTY,b.PSPARE_ID,b.CART_ID,b.MEMBER_ID,b.TOTAL AS TOTAL,b.CARTDTL_ID"+
              ",(select GROUP_CONCAT(concat(NAME,'/',PRICE) SEPARATOR ',') from pspare where PSPARE_ID IN (b.PSPARE_ID)) AS SPAREDTL,b.FIELD2 AS SPARETOTAL "+
              " from cart a join cartdtl b on b.CART_ID=a.CART_ID join product c on c.PRODUCT_ID=b.PRODUCT_ID "+
              " JOIN productconf d on d.PRODUCT_ID=c.PRODUCT_ID WHERE a.STATUS='P' AND b.STATUS='P' and a.MEMBER_ID="+userId+"";
              db.query(cartQL, function(err,result) {
                  if (err) {
                    throw err;
                    res.json({'isError':true,'error':'Invalid user','userId':userId,'userType':userType});
                  }
                  result.forEach(function(element){
                      pspare_ids=element.PSPARE_ID;
                    });
                    if(pspare_ids ==undefined){
                      pspare_ids=0;
                    }
                  if(result && !result.length){
                    isCartEmpty=true;
                  }
                  var cTotalSQL="select TOTAL,FIELD1,FIELD2,CART_ID from cart WHERE MEMBER_ID="+userId+" AND STATUS='P'";
                  db.query(cTotalSQL, function(err,data) {
                      if (err) {
                        throw err;
                        res.json({'isError':true,'error':'Invalid user','userId':userId,'userType':userType});
                      }
                      var subtotal;
                      var total;
                      var vat;
                      var cartid;
                      data.forEach(function(element){
                          total=element.TOTAL;
                          vat=element.FIELD2;
                          subtotal=element.FIELD1;
                          cartid=element.CART_ID;
                        });
                        var dltSQL="select a.USER_ID,a.LOGON_ID1,a.STATUS,c.IDENTIFIER,d.FIRSTNAME,d.LASTNAME,d.EMAIL1,d.MOBILE1,d.PHONE1"+
                        " from user a join usrrole b on b.USER_ID=a.USER_ID join role c on "+
                        " c.ROLE_ID=b.ROLE_ID join address d on d.MEMBER_ID=a.USER_ID "+
                        " join usrrel e on e.USER_ID_FROM=a.USER_ID join user f on f.USER_ID=e.USER_ID_TO "+
                        " join usrrole g on g.USER_ID=f.USER_ID join role h on h.ROLE_ID=g.ROLE_ID "+
                        " WHERE c.IDENTIFIER IN('DT','DL') AND h.IDENTIFIER='SE' AND f.USER_ID="+userId+"";
                         db.query(dltSQL,function(err,result1) {
                             if (err) {
                               throw err;
                               res.json({'isError':true,'error':'Invalid user','userId':userId,'userType':userType});
                             }
                             var pspareSQL="select GROUP_CONCAT(concat(NAME,'/',PRICE) SEPARATOR ',') AS SPAREDTL from pspare where PSPARE_ID IN ("+pspare_ids+")";
                             db.query(pspareSQL,function(err,result2) {
                                 if (err) {
                                   throw err;
                                   res.json({'isError':true,'error':'Invalid user','userId':userId,'userType':userType});
                                 }
                                 result2.forEach(function(element){
                                     pspare_dtl=element.SPAREDTL;
                                   });
                                 res.json({'cartList':{result},'dldtList':{result1},'pspare_dtl':pspare_dtl,'isError':false,'userId':userId,'userType':userType,'ctotal':total,'csubtotal':subtotal,'cvat':vat,'cartid':cartid});
                               });
                           });

                    });
                });
             }
         }
       });

       /**Place order*/
       router.get('/updateCart/prd/:prdId/qty/:qty/price/:price/cartId/:cartId/cartDtlId/:cartDtlId/userId/:userId/userType/:userType', function(req, res, next) {
         var userId=req.params.userId;
         var userType=req.params.userType;
         var pid=req.params.prdId;
         var qty=req.params.qty;
         var price=req.params.price;
         var cart_id=req.params.cartId;
         var cartdtl_id=req.params.cartDtlId;
         var total=price * qty;

         if(userType === undefined){
         res.json({'isError':true,'error':'Invalid user','userId':userId,'userType':userType});
         }else{
           if(userType !='DT' && userType !='DL'
               && userType !='SE'){
           res.json({'isError':true,'error':'Invalid user','userId':userId,'userType':userType});
           }else{
             var spPriceCart="";
             var cartUpdateSQL="UPDATE cartdtl SET QTY="+qty+", FIELD1='"+total+"',TOTAL=FIELD2+"+total+" WHERE CARTDTL_ID="+cartdtl_id+"";
           var cartUpdateSQL1 =" UPDATE cart SET TOTAL=(select SUM(TOTAL)"+
           "+(SUM(TOTAL)*0.175) FROM cartdtl WHERE "+
             " CART_ID="+cart_id+"), FIELD1=(select SUM(TOTAL) FROM cartdtl WHERE "+
               " CART_ID="+cart_id+"), FIELD2=(select SUM(TOTAL)*0.175 FROM cartdtl WHERE CART_ID="+cart_id+") "+
             " WHERE CART_ID="+cart_id+"";
           db.query(cartUpdateSQL, function(err,result) {
               if (err)
              {
               throw err;
               res.json({'isError':true,'error':'Invalid user','userId':userId,'userType':userType});
              }
              db.query(cartUpdateSQL1, function(err,result1) {
                  if (err)
                 {
                  throw err;
                  res.json({'isError':true,'error':'Invalid user','userId':userId,'userType':userType});
                 }
              res.json({'isError':false,'isUpdated':true,'userId':userId,'userType':userType});
            });
         });
         }
         }
         });

         /**Place order*/
         router.get('/place_order/cartId/:cartId/memberFor/:memberFor/userId/:userId/userType/:userType', function(req, res, next) {
           var userId=req.params.userId;
           var userType=req.params.userType;
           var cartId=req.params.cartId;
           var memberFor=req.params.memberFor;
           var username;
           var pid;
           var email;
           var mobile;
           var productname;
           var producturl;
           var productpdf;

           if(userType === undefined){
           res.json({'isError':true,'error':'Invalid user','userId':userId,'userType':userType});
           }else{
             if(userType !='DT' && userType !='DL'
                 && userType !='SE'){
             res.json({'isError':true,'error':'Invalid user','userId':userId,'userType':userType});
             }else{
               var orderSQL="insert into orders(address_id,member_id,MEMBER_ID_FOR,status,TAX,DISCOUNT,TOTAL,FIELD1,CREATETIME) value("+
               "(select address_id from address where MEMBER_ID="+memberFor+" AND ADDRESSFOR='SB'),"+userId+","+memberFor+",'P', "+
               " (select FIELD2 from cart WHERE CART_ID="+cartId+"),'', "+
               " (select TOTAL from cart WHERE CART_ID="+cartId+"),(select FIELD1 from cart WHERE CART_ID="+cartId+"),CURRENT_TIMESTAMP)";
               db.query(orderSQL, function(err,result) {
                 if (err)
                {
                 throw err;
                 res.json({'isError':true,'error':'Invalid user','userId':userId,'userType':userType});
                }
                var cartdtlSQL="select * from cartdtl where cart_id="+cartId+" AND STATUS='P'";
                db.query(cartdtlSQL, function(err,cartdetails) {
                  if (err)
                 {
                  throw err;
                res.json({'isError':true,'error':'Invalid user','userId':userId,'userType':userType});
                 }
                 cartdetails.forEach(function(element){
                   var orderitemSQL="insert into orderitem (order_id,product_id,address_id,price,"+
                   " quantity,total,status,member_id,MEMBER_ID_FOR,PSPARE_IDS,PSPARE_PRICE,PSPARE_TOTAL_PRICE,STOTAL)"+
                   " value((select order_id from orders order by order_id desc limit 1),"+element.PRODUCT_ID+","+
                   "(select address_id from address where MEMBER_ID="+memberFor+" AND ADDRESSFOR='SB'),'"+element.FIELD1+"',"+
                   " '"+element.QTY+"','"+element.FIELD1+"','P',"+userId+","+memberFor+",'"+element.pspare_id+"','"+element.PSPARE_PRICE+"','"+element.FIELD2+"','"+element.TOTAL+"')"
                  var updateInvSQL="update productconf set INVENTORY=INVENTORY-"+element.QTY+" WHERE PRODUCT_ID="+element.PRODUCT_ID+"";
                   db.query(orderitemSQL, function(err,result1) {
                     if (err)
                    {
                     throw err;
                     res.json({'isError':true,'error':'Invalid user','userId':userId,'userType':userType});
                    }
                    db.query(updateInvSQL, function(err,resultinvupdate) {
                      if (err)
                     {
                      throw err;
                      res.json({'isError':true,'error':'Invalid user','userId':userId,'userType':userType});
                     }
                      });
                     });
                   });
                   var cartEmptySQL="DELETE FROM cartdtl WHERE CART_ID="+cartId+"";
                    db.query(cartEmptySQL, function(err,result2) {
                      if (err)
                     {
                      throw err;
                      res.json({'isError':true,'error':'Invalid user','userId':userId,'userType':userType});
                     }
                     var cartEmptySQL1="DELETE FROM cart WHERE CART_ID="+cartId+"";
                     db.query(cartEmptySQL1, function(err,result3) {
                       if (err)
                      {
                       throw err;
                       res.json({'isError':true,'error':'Invalid user','userId':userId,'userType':userType});
                      }
                      res.json({'isError':false,'isUpdated':true,'userId':userId,'userType':userType});
                     });

                    });
                });

                 let mailOptionsAdmin = {
                 from: const_data.admin_email,
                 to: const_data.info_admin,
                 cc: const_data.info_admin1,
                 subject: 'Enquiry by Mr.'+username,
                 html: `<head>
             	<meta charset="utf-8" />
             	<meta http-equiv="X-UA-Compatible" content="IE=edge">
             	<title>Email-Text Template</title>
             	<meta name="viewport" content="width=device-width, initial-scale=1">

             </head>
             <body style="margin:0; padding:0; background: #fff;">
             	<table border="0" cellpadding="0" cellspacing="0" style="width:100%;">
             		<tr>
             			<td>
             				<img src="http://articocdn.s3.us-east-2.amazonaws.com/image/logo/logo.png" width="80px" alt="Logo">
             				<p style="font-family:'Source Sans Pro', sans-serif;font-size:18px;color:#454545;margin:0px;padding-top:28px; font-weight: 600;">
             				Hi Admin,
             				</p>
             					<p style="font-family:'Source Sans Pro',sans-serif;font-size: 16px;color: #454545;margin:0px;line-height:1.5;padding-top:18px">Mr.`+username+` have placed an enquiry contact him at `+mobile+` and email him at `+email+` </p><br>
                   <ul>
         					   <li><p style="font-family:'Source Sans Pro',sans-serif;font-size: 16px;color: #454545;margin:0px;line-height:1.5;padding-top:18px">
         					 `+productname+`</p></li>
                    <li><img src="`+producturl+`" alt="product"></li>
                    <li><a href="`+productpdf+`" target="_blank">Click for pdf design</li>
                    <ul>
             			</td>
             		</tr>
             		<tr>
             			<td style="padding-top:16px;">
             					<p style="margin:0px;font-family:SFProText-Regular,sans-serif;font-size: 16px;color:#454545;line-height: 1.5;">
             					Thanks & Regardss
             					</p>
             					</td>
             					<tr>
             						<td style="padding-top:28px;">
             							<p style="font-family:'Source Sans Pro', sans-serif;font-size:18px;color:#454545; font-weight: 600;">Vipin Kashyap<br>
             								<span style="font-family:'Source Sans Pro', sans-serif;font-size:16px;color:#454545;font-weight:normal;">
                                                                                    Artico Enterprises
                                                                             </span><br>
             											<span style="font-family:'Source Sans Pro', sans-serif;font-size:16px;color:#454545;font-weight:normal;">
                                                                              +91 9312504492 </span>
             							</p>
             						</td>
             					</tr>
             					<tr>
             						<td style="background-color: #ececec;border-radius: 4px;">
             							<p style="margin:0px;font-family:'Source Sans Pro', sans-serif; font-size: 24px;color:#00b18f;text-align: center;padding-top:11px"><a href="http://www.articoprinters.com/"  style="text-decoration: none;color:#00b18f;">www.articoprinters.com</a></p>
             							<p style="margin:0px;font-family:'Source Sans Pro', sans-serif; font-size:16px;color:#454545;text-align:center;padding-top:11px;padding-bottom:12px"><a href="#" style="text-decoration: none;color: #454545;">About Us</a><span style="padding:0 24px 0 24px">|</span><a href="#" style="text-decoration: none;color: #454545;">Conditions</a><span style="padding:0 24px 0 24px">|</span>
             								<a href="#" style="text-decoration: none;color: #454545;">Contact Us</a></p>
             							</td>
             						</tr>
             					</table>
             				</body>
             				</html>`
             };

             let mailOptionsClient = {
             from: const_data.admin_email,
             to: email,
             subject: 'Youre enquiry to www.articoprinters.com',
             html: `<head>
             	<meta charset="utf-8" />
             	<meta http-equiv="X-UA-Compatible" content="IE=edge">
             	<title>Email-Text Template</title>
             	<meta name="viewport" content="width=device-width, initial-scale=1">

             </head>
             <body style="margin:0; padding:0; background: #fff;">
             	<table border="0" cellpadding="0" cellspacing="0" style="width:100%;">
             		<tr>
             			<td>
             				<img src="http://articocdn.s3.us-east-2.amazonaws.com/image/logo/logo.png" width="80px" alt="Logo">
             				<p style="font-family:'Source Sans Pro', sans-serif;font-size:18px;color:#454545;margin:0px;padding-top:28px; font-weight: 600;">
             				Hi `+username+`,
             				</p>
                      <p style="font-family:'Source Sans Pro',sans-serif;font-size: 16px;color: #454545;margin:0px;line-height:1.5;padding-top:18px">You have enquired for the products mentiond below.</p><br>
                      <ul>
            					   <li><p style="font-family:'Source Sans Pro',sans-serif;font-size: 16px;color: #454545;margin:0px;line-height:1.5;padding-top:18px">
            					 `+productname+`</p></li>
                       <li><img src="`+producturl+`" alt="product"></li>
                       <li><a href="`+productpdf+`" target="_blank">Click for pdf design</li>
                       <ul>
             			</td>
             		</tr>
             		<tr>
             			<td style="padding-top:16px;">
             					<p style="margin:0px;font-family:SFProText-Regular,sans-serif;font-size: 16px;color:#454545;line-height: 1.5;">
             					Thanks & Regardss
             					</p>
             					</td>
             					<tr>
             						<td style="padding-top:28px;">
             							<p style="font-family:'Source Sans Pro', sans-serif;font-size:18px;color:#454545; font-weight: 600;">Vipin Kashyap<br>
             								<span style="font-family:'Source Sans Pro', sans-serif;font-size:16px;color:#454545;font-weight:normal;">
                                                                                    Artico Enterprises
                                                                             </span><br>
             											<span style="font-family:'Source Sans Pro', sans-serif;font-size:16px;color:#454545;font-weight:normal;">
                                                                              +91 9312504492 </span>
             							</p>
             						</td>
             					</tr>
             					<tr>
             						<td style="background-color: #ececec;border-radius: 4px;">
             							<p style="margin:0px;font-family:'Source Sans Pro', sans-serif; font-size: 24px;color:#00b18f;text-align: center;padding-top:11px"><a href="http://www.articoprinters.com/"  style="text-decoration: none;color:#00b18f;">www.articoprinters.com</a></p>
             							<p style="margin:0px;font-family:'Source Sans Pro', sans-serif; font-size:16px;color:#454545;text-align:center;padding-top:11px;padding-bottom:12px"><a href="#" style="text-decoration: none;color: #454545;">About Us</a><span style="padding:0 24px 0 24px">|</span><a href="#" style="text-decoration: none;color: #454545;">Conditions</a><span style="padding:0 24px 0 24px">|</span>
             								<a href="#" style="text-decoration: none;color: #454545;">Contact Us</a></p>
             							</td>
             						</tr>
             					</table>
             				</body>
             				</html>`
             };

           //  emailer.sendMail(mailOptionsClient, function (error) {
             //    if (error) {
                   //res.render('enquiry',{menu:data,userId:sess.user_id,userType:sess.user_type});
               //    return res.redirect('/');
                 //    console.log('error:', error);
             //    } else {
               //      emailer.sendMail(mailOptionsAdmin, function (error) {
                   //      if (error) {
                           //res.render('enquiry',{menu:data,userId:sess.user_id,userType:sess.user_type});
                   //      return res.redirect('/');
                     //        console.log('error:', error);
                     //    } else {
                       //    return res.redirect('/');
                         //  res.render('enquiry',{menu:data,userId:sess.user_id,userType:sess.user_type});
                       //      console.log('sent');
                     //    }
                 //   });
               //   }
             //  });
               });
             }
           }
         });

         /* orders console. */
         router.get('/orders/userId/:userId/userType/:userType', function(req, res, next) {
           var userId=req.params.userId;
           var userType=req.params.userType;
           var orderSQ="";
           if(userType === undefined){
             res.json({'isError':true,'error':'Invalid user','userId':userId,'userType':userType});
           }else{
             if(userType !='HOD' && userType !='A' && userType !='DT' && userType !='DL'
                 && userType !='SE'){
               res.json({'isError':true,'error':'Invalid user','userId':userId,'userType':userType});
             }else{
               if(userType =='DT' || userType =='DL'){
                  orderSQL="select a.order_id,a.status,a.MEMBER_ID,a.MEMBER_ID_FOR,c.FIRSTNAME,c.LASTNAME,c.EMAIL1,c.MOBILE1,c.MOBILE1CODE,c.PHONE1,"+
                 " c.company,c.gstin,c.AADHAARID,c.VOTERID,c.DL,c.PANNO,c.PASSPORTID,c.ADDRESSLINE1,c.ADDRESSFOR,c.ADDRESSTYPE,a.CREATETIME,a.UPDATETIME,a.TOTAL "+
                 " ,c.city,c.state,c.COUNTRY,c.zipcode,d.USER_ID AS CUSER_ID,d.LOGON_ID1 AS CLOGON_ID1,e.FIRSTNAME as CFIRSTNAME,e.LASTNAME as CLASTNAME from orders a "+
                  " join address c on c.address_id=a.address_id and c.member_id=a.member_id_for "+
                  " join user d on d.USER_ID=a.member_id join address e on e.member_id=d.USER_ID "+
                  " where c.member_id="+userId+" order by a.CREATETIME desc ";
               }else if(userType =='SE'){
                 orderSQL="select a.order_id,a.status,a.MEMBER_ID,a.MEMBER_ID_FOR,c.FIRSTNAME,c.LASTNAME,c.EMAIL1,c.MOBILE1,c.MOBILE1CODE,c.PHONE1,"+
                 " c.company,c.gstin,c.AADHAARID,c.VOTERID,c.DL,c.PANNO,c.PASSPORTID,c.ADDRESSLINE1,c.ADDRESSFOR,c.ADDRESSTYPE,a.CREATETIME,a.UPDATETIME,a.TOTAL "+
                 " ,c.city,c.state,c.COUNTRY,c.zipcode,d.USER_ID AS CUSER_ID,d.LOGON_ID1 AS CLOGON_ID1,e.FIRSTNAME as CFIRSTNAME,e.LASTNAME as CLASTNAME from orders a "+
                 " join address c on c.address_id=a.address_id and c.member_id=a.member_id_for "+
                 " join user d on d.USER_ID=a.member_id_for join address e on e.member_id=d.USER_ID "+
                 " where a.member_id="+userId+" order by a.CREATETIME desc ";
               }else{
                 orderSQL="select a.order_id,a.status,a.MEMBER_ID,a.MEMBER_ID_FOR,c.FIRSTNAME,c.LASTNAME,c.EMAIL1,c.MOBILE1,c.MOBILE1CODE,c.PHONE1,"+
                " c.company,c.gstin,c.AADHAARID,c.VOTERID,c.DL,c.PANNO,c.PASSPORTID,c.ADDRESSLINE1,c.ADDRESSFOR,c.ADDRESSTYPE,a.CREATETIME,a.UPDATETIME,a.TOTAL "+
                " ,c.city,c.state,c.COUNTRY,c.zipcode,d.USER_ID AS CUSER_ID,d.LOGON_ID1 AS CLOGON_ID1,e.FIRSTNAME as CFIRSTNAME,e.LASTNAME as CLASTNAME from orders a "+
                 " join address c on c.address_id=a.address_id and c.member_id=a.member_id_for"+
                 " join user d on d.USER_ID=a.member_id join address e on e.member_id=d.USER_ID order by a.CREATETIME desc ";
               }
                db.query(orderSQL, function(err,result) {
                    if (err) {
                      throw err;
                      res.json({'isError':true,'error':'Invalid user','userId':userId,'userType':userType});
                    }
                     res.json({'isError':false,'orders':{result},'userId':userId,'userType':userType});
                  });
             }
           }
         });


         /* orders console. */
         router.get('/ordersById/orderid/:orderid/userId/:userId/userType/:userType', function(req, res, next) {
           var userId=req.params.userId;
           var userType=req.params.userType;
           var orderid=req.params.orderid;
           var orderSQ="";
           if(userType === undefined){
             res.json({'isError':true,'error':'Invalid user','userId':userId,'userType':userType});
           }else{
             if(userType !='HOD' && userType !='A' && userType !='DT' && userType !='DL'
                 && userType !='SE'){
               res.json({'isError':true,'error':'Invalid user','userId':userId,'userType':userType});
             }else{
               if(userType =='DT' || userType =='DL'){
                  orderSQL="select a.order_id,a.status,a.MEMBER_ID,a.MEMBER_ID_FOR,c.FIRSTNAME,c.LASTNAME,c.EMAIL1,c.MOBILE1,c.MOBILE1CODE,c.PHONE1,"+
                 " c.company,c.gstin,c.AADHAARID,c.VOTERID,c.DL,c.PANNO,c.PASSPORTID,c.ADDRESSLINE1,c.ADDRESSFOR,c.ADDRESSTYPE,a.CREATETIME,a.UPDATETIME,a.TOTAL "+
                 " ,c.city,c.state,c.COUNTRY,c.zipcode,d.USER_ID AS CUSER_ID,d.LOGON_ID1 AS CLOGON_ID1,e.FIRSTNAME as CFIRSTNAME,e.LASTNAME as CLASTNAME from orders a "+
                  " join address c on c.address_id=a.address_id and c.member_id=a.member_id_for "+
                  " join user d on d.USER_ID=a.member_id join address e on e.member_id=d.USER_ID "+
                  " where c.member_id="+userId+" AND a.order_id="+orderid+" order by a.CREATETIME desc ";
               }else if(userType =='SE'){
                 orderSQL="select a.order_id,a.status,a.MEMBER_ID,a.MEMBER_ID_FOR,c.FIRSTNAME,c.LASTNAME,c.EMAIL1,c.MOBILE1,c.MOBILE1CODE,c.PHONE1,"+
                 " c.company,c.gstin,c.AADHAARID,c.VOTERID,c.DL,c.PANNO,c.PASSPORTID,c.ADDRESSLINE1,c.ADDRESSFOR,c.ADDRESSTYPE,a.CREATETIME,a.UPDATETIME,a.TOTAL "+
                 " ,c.city,c.state,c.COUNTRY,c.zipcode,d.USER_ID AS CUSER_ID,d.LOGON_ID1 AS CLOGON_ID1,e.FIRSTNAME as CFIRSTNAME,e.LASTNAME as CLASTNAME from orders a "+
                 " join address c on c.address_id=a.address_id and c.member_id=a.member_id_for "+
                 " join user d on d.USER_ID=a.member_id_for join address e on e.member_id=d.USER_ID "+
                 " where a.member_id="+userId+"  AND a.order_id="+orderid+" order by a.CREATETIME desc ";
               }else{
                 orderSQL="select a.order_id,a.status,a.MEMBER_ID,a.MEMBER_ID_FOR,c.FIRSTNAME,c.LASTNAME,c.EMAIL1,c.MOBILE1,c.MOBILE1CODE,c.PHONE1,"+
                " c.company,c.gstin,c.AADHAARID,c.VOTERID,c.DL,c.PANNO,c.PASSPORTID,c.ADDRESSLINE1,c.ADDRESSFOR,c.ADDRESSTYPE,a.CREATETIME,a.UPDATETIME,a.TOTAL "+
                " ,c.city,c.state,c.COUNTRY,c.zipcode,d.USER_ID AS CUSER_ID,d.LOGON_ID1 AS CLOGON_ID1,e.FIRSTNAME as CFIRSTNAME,e.LASTNAME as CLASTNAME from orders a "+
                 " join address c on c.address_id=a.address_id and c.member_id=a.member_id_for"+
                 " join user d on d.USER_ID=a.member_id join address e on e.member_id=d.USER_ID  AND a.order_id="+orderid+" order by a.CREATETIME desc ";
               }
                db.query(orderSQL, function(err,result) {
                    if (err) {
                      throw err;
                      res.json({'isError':true,'error':'Invalid user','userId':userId,'userType':userType});
                    }
                     res.json({'isError':false,'orders':{result},'userId':userId,'userType':userType});
                  });
             }
           }
         });

         /* orders console. */
         router.get('/ordersByStatus/status/:status/userId/:userId/userType/:userType', function(req, res, next) {
           var userId=req.params.userId;
           var userType=req.params.userType;
           var status=req.params.status;
           var orderSQ="";
           if(userType === undefined){
             res.json({'isError':true,'error':'Invalid user','userId':userId,'userType':userType});
           }else{
             if(userType !='HOD' && userType !='A' && userType !='DT' && userType !='DL'
                 && userType !='SE'){
               res.json({'isError':true,'error':'Invalid user','userId':userId,'userType':userType});
             }else{
               if(userType =='DT' || userType =='DL'){
                  orderSQL="select a.order_id,a.status,a.MEMBER_ID,a.MEMBER_ID_FOR,c.FIRSTNAME,c.LASTNAME,c.EMAIL1,c.MOBILE1,c.MOBILE1CODE,c.PHONE1,"+
                 " c.company,c.gstin,c.AADHAARID,c.VOTERID,c.DL,c.PANNO,c.PASSPORTID,c.ADDRESSLINE1,c.ADDRESSFOR,c.ADDRESSTYPE,a.CREATETIME,a.UPDATETIME,a.TOTAL "+
                 " ,c.city,c.state,c.COUNTRY,c.zipcode,d.USER_ID AS CUSER_ID,d.LOGON_ID1 AS CLOGON_ID1,e.FIRSTNAME as CFIRSTNAME,e.LASTNAME as CLASTNAME from orders a "+
                  " join address c on c.address_id=a.address_id and c.member_id=a.member_id_for "+
                  " join user d on d.USER_ID=a.member_id join address e on e.member_id=d.USER_ID "+
                  " where c.member_id="+userId+" AND a.status='"+status+"' order by a.CREATETIME desc ";
               }else if(userType =='SE'){
                 orderSQL="select a.order_id,a.status,a.MEMBER_ID,a.MEMBER_ID_FOR,c.FIRSTNAME,c.LASTNAME,c.EMAIL1,c.MOBILE1,c.MOBILE1CODE,c.PHONE1,"+
                 " c.company,c.gstin,c.AADHAARID,c.VOTERID,c.DL,c.PANNO,c.PASSPORTID,c.ADDRESSLINE1,c.ADDRESSFOR,c.ADDRESSTYPE,a.CREATETIME,a.UPDATETIME,a.TOTAL "+
                 " ,c.city,c.state,c.COUNTRY,c.zipcode,d.USER_ID AS CUSER_ID,d.LOGON_ID1 AS CLOGON_ID1,e.FIRSTNAME as CFIRSTNAME,e.LASTNAME as CLASTNAME from orders a "+
                 " join address c on c.address_id=a.address_id and c.member_id=a.member_id_for "+
                 " join user d on d.USER_ID=a.member_id_for join address e on e.member_id=d.USER_ID "+
                 " where a.member_id="+userId+"  AND a.status='"+status+"' order by a.CREATETIME desc ";
               }else{
                 orderSQL="select a.order_id,a.status,a.MEMBER_ID,a.MEMBER_ID_FOR,c.FIRSTNAME,c.LASTNAME,c.EMAIL1,c.MOBILE1,c.MOBILE1CODE,c.PHONE1,"+
                " c.company,c.gstin,c.AADHAARID,c.VOTERID,c.DL,c.PANNO,c.PASSPORTID,c.ADDRESSLINE1,c.ADDRESSFOR,c.ADDRESSTYPE,a.CREATETIME,a.UPDATETIME,a.TOTAL "+
                " ,c.city,c.state,c.COUNTRY,c.zipcode,d.USER_ID AS CUSER_ID,d.LOGON_ID1 AS CLOGON_ID1,e.FIRSTNAME as CFIRSTNAME,e.LASTNAME as CLASTNAME from orders a "+
                 " join address c on c.address_id=a.address_id and c.member_id=a.member_id_for"+
                 " join user d on d.USER_ID=a.member_id join address e on e.member_id=d.USER_ID  AND a.status='"+status+"' order by a.CREATETIME desc ";
               }
                db.query(orderSQL, function(err,result) {
                    if (err) {
                      throw err;
                      res.json({'isError':true,'error':'Invalid user','userId':userId,'userType':userType});
                    }
                     res.json({'isError':false,'orders':{result},'userId':userId,'userType':userType});
                  });
             }
           }
         });

         /* dashboard console. */
         router.get('/orderdtl/:id/userId/:userId/userType/:userType', function(req, res, next) {

           var ordId=req.params.id;
           var userId=req.params.userId;
           var userType=req.params.userType;
           if(userType === undefined){
             res.json({'isError':true,'error':'Invalid user','userId':userId,'userType':userType});
           }else{
             if(userType !='HOD' && userType !='A' && userType !='DT' && userType !='DL'
                 && userType !='SE'){
              res.json({'isError':true,'error':'Invalid user','userId':userId,'userType':userType});
             }else{
                var cartQL="";
                if(userType == 'DL' || userType == 'DT'){
                 cartQL="select c.PRODUCT_ID,c.NAME,c.THUMBNAIL,c.DESCRIPTION,d.INVENTORY,d.OFFERPRICE,d.LISTPRICE,b.QUANTITY,b.ADDRESS_ID,b.STOTAL AS TOTAL,b.STATUS,b.ORDERITEM_ID,b.ORDER_ID"+
                 ",(select GROUP_CONCAT(concat(NAME,'/',PRICE) SEPARATOR ',') from pspare where PSPARE_ID IN (b.PSPARE_IDS)) AS SPAREDTL,b.PSPARE_TOTAL_PRICE AS SPARETOTAL"+
                 " from orders a join orderitem b on b.ORDER_ID=a.ORDER_ID join product c on c.PRODUCT_ID=b.PRODUCT_ID "+
                 " JOIN productconf d on d.PRODUCT_ID=c.PRODUCT_ID WHERE a.ORDER_ID="+ordId+"";

                }else{
                  cartQL="select c.PRODUCT_ID,c.NAME,c.THUMBNAIL,c.DESCRIPTION,d.INVENTORY,d.OFFERPRICE,d.LISTPRICE,b.QUANTITY,b.ADDRESS_ID,b.STOTAL AS TOTAL,b.STATUS,b.ORDERITEM_ID,b.ORDER_ID"+
                  ",(select GROUP_CONCAT(concat(NAME,'/',PRICE) SEPARATOR ',') from pspare where PSPARE_ID IN (b.PSPARE_IDS)) AS SPAREDTL,b.PSPARE_TOTAL_PRICE AS SPARETOTAL"+
                  " from orders a join orderitem b on b.ORDER_ID=a.ORDER_ID join product c on c.PRODUCT_ID=b.PRODUCT_ID "+
                  " JOIN productconf d on d.PRODUCT_ID=c.PRODUCT_ID WHERE a.ORDER_ID="+ordId+"";
                }
                db.query(cartQL, function(err,result) {
                    if (err) {
                      throw err;
                      res.json({'isError':true,'error':'Invalid user','userId':userId,'userType':userType});
                    }
                    var cTotalSQL="select ORDER_ID,TOTAL,FIELD1,TAX,DISCOUNT,STATUS,QUANTITY,ADDRESS_ID,PRICE from orders WHERE MEMBER_ID="+userId+"";
                    db.query(cTotalSQL, function(err,data) {
                        if (err) {
                          throw err;
                          res.json({'isError':true,'error':'Invalid user','userId':userId,'userType':userType});
                        }
                        var subtotal;
                        var total;
                        var vat;
                        var discount;
                        var status;
                        var quantity;
                        var addressId;
                        data.forEach(function(element){
                            total=element.TOTAL;
                            vat=element.TAX;
                            subtotal=element.FIELD1;
                             discount=element.DISCOUNT;
                              status=element.STATUS;
                               quantity=element.QUANTITY;
                               addressId=element.ADDRESS_ID;
                          });
                         res.json({'isError':false,'orderList':{result},'userId':userId,'userType':userType,
                           'ctotal':total,'csubtotal':subtotal,'cvat':vat,'cdiscount':discount,'cstatus':status,'cquantity':quantity,'caddressId':addressId});
                      });
                  });
               }
           }
         });


         /* dashboard console. */
         router.get('/profile/userId/:userId/userType/:userType', function(req, res, next) {
           var userId=req.params.userId;
           var userType=req.params.userType;
           if(userType === undefined){
           res.json({'isError':true,'error':'Invalid user','userId':userId,'userType':userType});
           }else{
             if(userType !='HOD' && userType !='A' && userType !='DT' && userType !='DL'
                 && userType !='SE'){
               res.json({'isError':true,'error':'Invalid user','userId':userId,'userType':userType});
             }else{
               var profileSQL="select a.USER_ID,a.FIELD1,a.LOGON_ID1,b.FIRSTNAME,b.LASTNAME,b.ADDRESSFOR,b.ADDRESSTYPE,b.ADDRESSLINE1,b.CITY,b.STATE,b.COUNTRY,b.ZIPCODE,"+
               " b.AADHAARID,b.VOTERID,b.PANNO,b.PASSPORTID,b.gstin,b.company,b.DL,b.EMAIL1,b.MOBILE1,b.MOBILE1CODE,b.PHONE1,a.FIELD1 AS THUMBNAILIMG"+
                " from user a join address b on b.MEMBER_ID=a.USER_ID where a.USER_ID="+userId+"";
                db.query(profileSQL, function(err,result) {
                    if (err) {
                      throw err;
                      res.json({'isError':true,'error':'Invalid user','userId':userId,'userType':userType});
                    }
                    res.json({'isError':false,'profile':{result},'error':'Invalid user','userId':userId,'userType':userType});
                  });
             }
           }
         });


         /* dashboard console. */
         router.get('/cart_count/userId/:userId/userType/:userType', function(req, res, next) {
           var userId=req.params.userId;
           var userType=req.params.userType;
           if(userType === undefined){
           res.json({'isError':true,'error':'Invalid user','userId':userId,'userType':userType});
           }else{
             if(userType !='HOD' && userType !='A' && userType !='DT' && userType !='DL'
                 && userType !='SE'){
               res.json({'isError':true,'error':'Invalid user','userId':userId,'userType':userType});
             }else{
               var profileSQL="select COUNT(CARTDTL_ID) AS CARTCOUNT,CART_ID from cartdtl WHERE CART_ID IN (select CART_ID from cart where MEMBER_ID="+userId+")";
                db.query(profileSQL, function(err,result) {
                    if (err) {
                      throw err;
                      res.json({'isError':true,'error':'Invalid user','userId':userId,'userType':userType});
                    }
                    res.json({'isError':false,'profile':{result},'error':'Invalid user','userId':userId,'userType':userType});
                  });
             }
           }
         });


         router.post('/profile_register_update', function(req,res,next){
           var pimage;

           var formData = new formidable.IncomingForm();
           formData.parse(req, function (error, fields, files) {
               var newPath = "./public/images/users/" + files.image.name;
               var oldPath=files.image.path;
               var imageName=files.image.name;
               // Read the file
              fs.readFile(oldPath, function (err, data) {
                  if (err) throw err;
                  console.log('File read!');
                  // Write the file
                  fs.writeFile(newPath, data, function (err) {
                      if (err) throw err;
                      console.log('File written!');
                  });

                  // Delete the file
                  fs.unlink(oldPath, function (err) {
                      if (err) throw err;
                      console.log('File deleted!');
                  });
              });
               pimage=imageName;
           var userId=fields.userId;
           var userType=fields.userType;
           var fname=fields.fname;
           var lname=fields.lname;
           var gstin=fields.gstin;
           var pan=fields.panno;
           var mobile=fields.mobile1;
           var email=fields.email1;
           var address1=fields.address1;
           var country=fields.country;
           var state=fields.state;
           var city=fields.city;
           var zipcode=fields.zipcode;
           var companyname=fields.compnay;
           var phone=fields.phone1;
           var  userSQL="update address set FIRSTNAME='"+fname+"',LASTNAME='"+lname+"',ADDRESSLINE1='"+address1+"',CITY='"+city+"',"+
           " STATE='"+state+"',COUNTRY='"+country+"',ZIPCODE='"+zipcode+"',EMAIL1='"+email+"',PHONE1='"+phone+"',MOBILE1='"+mobile+"'"+
           ",PANNO='"+pan+"',company='"+companyname+"',gstin='"+gstin+"' where MEMBER_ID="+userId+"";
           db.query(userSQL,function(err,result) {
               if (err) {
                 throw err;
                 res.json({'isError':true,'error':'Invalid user','userId':userId,'userType':userType});
               }
               else{
                 var profileImgSQL="UPDATE user set FIELD1='"+pimage+"' WHERE USER_ID="+userId+"";
                 db.query(profileImgSQL, function(err,result) {
                     if (err) {
                       throw err;
                       res.json({'isError':true,'error':'Invalid user','userId':userId,'userType':userType});
                     }
                     res.json({'isError':false,'isUpdated':true,'userId':userId,'userType':userType});
                   });
               }
             });
         });
         });


         //get enquiry list sales executive
         router.get('/getenquiry/userId/:userId/userType/:userType', function(req, res, next){
          var userId=req.params.userId;
          var userType=req.params.userType;
          var profileSQL="select * from enquiry";
          db.query(profileSQL, function(err,result) {
              if (err) {
                throw err;
                res.json({'isError':true,'error':'Invalid user','userId':userId,'userType':userType});
              }
              res.json({'isError':false,'profile':{result},'error':'Invalid user','userId':userId,'userType':userType});
            });
         });


         // post enquiry details
         router.post('/postenquiry/userId/:userId/userType/:userType', function(req,res,next){
          var userId=req.params.userId;
          var userType=req.params.userType;
        
          var formData = new formidable.IncomingForm();
            formData.parse(req, function (error, fields, files) {
            var imageName1 = fields.imageName1;
            var imageName2 =  fields.imageName2;
            var imageName3 = fields.imageName3;
            var imageName4 = fields.imageName4;
            var imageName5 = fields.imageName5;
            var prdQty_1=fields.qty_1;
            var prdQty_2=fields.qty_2;
            var prdQty_3=fields.qty_3;
            var prdQty_4=fields.qty_4;
            var prdQty_5=fields.qty_5;
            var prdPrice_1=fields.price_1;
            var prdPrice_2=fields.price_2;
            var prdPrice_3=fields.price_3;
            var prdPrice_4=fields.price_4;
            var prdPrice_5=fields.price_5;
            var fname=fields.fname;
            var lname=fields.lname;
            var gstin=fields.gstin;
            var pan=fields.panno;
            var role=fields.role;
            var from=fields.from;
            var mobile=fields.mobile1;
            var email=fields.email1;
            var logonid="";
            var password="";
            var address1=fields.address1;
            var country=fields.country;
            var state=fields.state;
            var city=fields.city;
            var zipcode=fields.zipcode;
            var companyname=fields.compnay;
            var phone=fields.phone1;
            var catalogImage=fields.catalogImage;
            var isNew=fields.isNew;
            var enqType=fields.enqType;
            var createdate= fields.createdOn;
            console.log(createdate);
            var followUpDate=fields.followUpDate;
            var exeComment=fields.exeComment;
            const buf = Buffer.from(password);
            var base64passkey=buf.toString('base64');


            var address_id = 0;
            var insertContactDetailsQuery = "insert into address(firstname,lastname,addressline1,city,state,country,zipcode,email1,mobile1,mobile1code,panno,company,gstin,phone1,ADDRESSTYPE,ADDRESSFOR) "+
            " values('"+fname+"','"+lname+"','"+address1+"','"+city+"','"+state+"','"+country+"','"+zipcode+"','"+email+"','"+mobile+"','+91','"+pan+"','"+companyname+"','"+gstin+"','"+phone+"','O','SB');";
              db.query(insertContactDetailsQuery,function(err,result) {
                if (err) throw err;
                  address_id = result.insertId;
                  console.log(result.insertId);
                  console.log(address_id);
                  var insertEnquiryDetailsQuery = "insert into enquiry(USER_ID,STATUS,CREATEDATE,NAME,TYPE,QTY,QTY_2,QTY_3,QTY_4,QTY_5,PRICE,PRICE_2,PRICE_3,PRICE_4,PRICE_5,IMAGE1,IMAGE2,IMAGE3,IMAGE4,IMAGE5,IMAGE6,COMMENT,ISNEW,NEXTDATE,ADDRESS_ID)"+
                  "value('"+userId+"','P','"+createdate+"','Enquiry',"+
                  "'"+enqType+"','"+prdQty_1+"','"+prdQty_2+"','"+prdQty_3+"','"+prdQty_4+"','"+prdQty_5+"','"+prdPrice_1+"','"+prdPrice_2+"','"+prdPrice_3+"','"+prdPrice_4+"','"+prdPrice_5+"','"+catalogImage+"','"+imageName1+"','"+imageName2+"','"+imageName3+"','"+imageName4+"','"+imageName5+"','"+exeComment+"','N','"+followUpDate+"','"+address_id+"');";

                  db.query(insertEnquiryDetailsQuery,function(err,result) {
                      if (err) {
                        throw err;
                      }
                      else{
                        res.json({'isError':false,'Enquiry':{result},'error':'Invalid user','userId':userId,'userType':userType});
                      }
                    });
                });
        });
      });


      //post user product enquiry api
      router.post('/postuserproductenquiry/userId/:userId/userType/:userType', function(req,res,next){
        var userId=req.params.userId;
        var userType=req.params.userType;
      
        var formData = new formidable.IncomingForm();
          formData.parse(req, function (error, fields, files) {
            if(files.inputImage1 !== ""){
              var newPath1 = "./public/images/enquiry/" + files.inputImage1.name;
              var oldPath1=files.inputImage1.path;
              var imageName1=files.inputImage1.name;
            }else{
              var imageName1="";
            }
            
            if(files.inputImage2){
              var newPath2 = "./public/images/enquiry/" + files.inputImage2.name;
              var oldPath2=files.inputImage2.path;
              var imageName2=files.inputImage2.name;
            }else{
              var imageName2="";
            }

            if(files.inputImage3){
              var newPath3 = "./public/images/enquiry/" + files.inputImage3.name;
              var oldPath3=files.inputImage3.path;
              var imageName3=files.inputImage3.name;
            }else{
              var imageName3="";
            }

            if(files.inputImage4){
              var newPath4= "./public/images/enquiry/" + files.inputImage4.name;
            var oldPath4=files.inputImage4.path;
            var imageName4=files.inputImage4.name;
            }else{
              var imageName4="";
            }

            if(files.inputImage5){
              var newPath5 = "./public/images/enquiry/" + files.inputImage5.name;
            var oldPath5=files.inputImage5.path;
            var imageName5=files.inputImage5.name;
            }else{
              var imageName5="";
            }
            
            
            
            console.log(imageName1 =="");
            // Read the file
            if(imageName1 !=""){
              fs.readFile(oldPath1, function (err, data) {
                  if (err) throw err;
                  console.log('File read!1');
                  // Write the file
                  fs.writeFile(newPath1, data, function (err) {
                      if (err) throw err;
                      console.log('File written!1');
                  });
      
                  // Delete the file
                  fs.unlink(oldPath1, function (err) {
                      if (err) throw err;
                      console.log('File deleted!1');
                  });
              });
            }
      
          if(imageName2 !=""){
           fs.readFile(oldPath2, function (err, data) {
               if (err) throw err;
               console.log('File read!2');
               // Write the file
               fs.writeFile(newPath2, data, function (err) {
                   if (err) throw err;
                   console.log('File written!2');
               });
      
               // Delete the file
               fs.unlink(oldPath2, function (err) {
                   if (err) throw err;
                   console.log('File deleted!2');
               });
           });
         }
         if(imageName3 !=""){
           fs.readFile(oldPath3, function (err, data) {
               if (err) throw err;
               console.log('File read!3');
               // Write the file
               fs.writeFile(newPath3, data, function (err) {
                   if (err) throw err;
                   console.log('File written!3');
               });
      
               // Delete the file
               fs.unlink(oldPath3, function (err) {
                   if (err) throw err;
                   console.log('File deleted!3');
               });
           });
         }
         if(imageName4 !=""){
           fs.readFile(oldPath4, function (err, data) {
               if (err) throw err;
               console.log('File read!4');
               // Write the file
               fs.writeFile(newPath4, data, function (err) {
                   if (err) throw err;
                   console.log('File written!4');
               });
      
               // Delete the file
               fs.unlink(oldPath4, function (err) {
                   if (err) throw err;
                   console.log('File deleted!4');
               });
           });
         }
         if(imageName5 !=""){
           fs.readFile(oldPath5, function (err, data) {
               if (err) throw err;
               console.log('File read!5');
               // Write the file
               fs.writeFile(newPath5, data, function (err) {
                   if (err) throw err;
                   console.log('File written!5');
               });
      
               // Delete the file
               fs.unlink(oldPath5, function (err) {
                   if (err) throw err;
                   console.log('File deleted!5');
               });
           });
         }
          var prdQty_1=fields.qty_1;
          var prdQty_2=fields.qty_2;
          var prdQty_3=fields.qty_3;
          var prdQty_4=fields.qty_4;
          var prdQty_5=fields.qty_5;
          var prdPrice_1=fields.price_1;
          var prdPrice_2=fields.price_2;
          var prdPrice_3=fields.price_3;
          var prdPrice_4=fields.price_4;
          var prdPrice_5=fields.price_5;
          var fname=fields.fname;
          var lname=fields.lname;
          var gstin=fields.gstin;
          var pan=fields.panno;
          var role=fields.role;
          var from=fields.from;
          var mobile=fields.mobile1;
          var email=fields.email1;
          var logonid="";
          var password="";
          var address1=fields.address1;
          var country=fields.country;
          var state=fields.state;
          var city=fields.city;
          var zipcode=fields.zipcode;
          var companyname=fields.compnay;
          var phone=fields.phone1;
          var catalogImage=fields.catalogImage;
          var isNew=fields.isNew;
          var enqType=fields.enqType;
          var createdate= fields.createdOn;
          console.log(createdate);
          var followUpDate=fields.followUpDate;
          var exeComment=fields.exeComment;
          const buf = Buffer.from(password);
          var base64passkey=buf.toString('base64');


          var address_id = 0;
          var insertContactDetailsQuery = "insert into address(firstname,lastname,addressline1,city,state,country,zipcode,email1,mobile1,mobile1code,panno,company,gstin,phone1,ADDRESSTYPE,ADDRESSFOR) "+
          " values('"+fname+"','"+lname+"','"+address1+"','"+city+"','"+state+"','"+country+"','"+zipcode+"','"+email+"','"+mobile+"','+91','"+pan+"','"+companyname+"','"+gstin+"','"+phone+"','O','SB');";
            db.query(insertContactDetailsQuery,function(err,result) {
              if (err) throw err;
                address_id = result.insertId;
                console.log(result.insertId);
                console.log(address_id);
                var insertEnquiryDetailsQuery = "insert into enquiry(USER_ID,STATUS,CREATEDATE,NAME,TYPE,QTY,QTY_2,QTY_3,QTY_4,QTY_5,PRICE,PRICE_2,PRICE_3,PRICE_4,PRICE_5,IMAGE1,IMAGE2,IMAGE3,IMAGE4,IMAGE5,IMAGE6,COMMENT,ISNEW,NEXTDATE,ADDRESS_ID)"+
                "value('"+userId+"','P','"+createdate+"','Enquiry',"+
                "'"+enqType+"','"+prdQty_1+"','"+prdQty_2+"','"+prdQty_3+"','"+prdQty_4+"','"+prdQty_5+"','"+prdPrice_1+"','"+prdPrice_2+"','"+prdPrice_3+"','"+prdPrice_4+"','"+prdPrice_5+"','"+catalogImage+"','"+imageName1+"','"+imageName2+"','"+imageName3+"','"+imageName4+"','"+imageName5+"','"+exeComment+"','N','"+followUpDate+"','"+address_id+"');";

                db.query(insertEnquiryDetailsQuery,function(err,result) {
                    if (err) {
                      throw err;
                    }
                    else{
                      res.json({'isError':false,'Enquiry':{result},'error':'Invalid user','userId':userId,'userType':userType});
                    }
                  });
              });
      });
    });






        //get followup list sales executive
        router.get('/followup/userId/:userId/userType/:userType', function(req, res, next){
          var userId=req.params.userId;
          var userType=req.params.userType;
          var query="select t1.ENQUIRY_ID, t1.TYPE, t1.STATUS, t1.NEXTDATE, t1.COMMENT,t2.FIRSTNAME, t2.LASTNAME, t2.ADDRESSLINE1,"+
          " t2.MOBILE1 from enquiry t1, address t2 where t1.USER_ID = t2.member_id; ";
          db.query(query, function(err,result) {
              if (err) {
                throw err;
                res.json({'isError':true,'error':'Invalid user','userId':userId,'userType':userType});
              }
              res.json({'isError':false,'profile':{result},'error':'Invalid user','userId':userId,'userType':userType});
            });
         });


         /* get Enquiry Details */
        router.get('/getenquirydetails/enquiry/:enquiry', function(req, res, next){
          var ENQUIRY_ID = req.params.enquiry;
          var query="select t1.ENQUIRY_ID, t1.TYPE, t1.STATUS, t1.NEXTDATE, t1.COMMENT,"+
          "t1.QTY, t1.PRICE, t1.COMMENT, t1.NEXTDATE, t1.ISNEW, t1.IMAGE1, t1.IMAGE2, t1.IMAGE3, t1.IMAGE4, t1.IMAGE5, "+
          "t2.FIRSTNAME, t2.LASTNAME, t2.ADDRESSLINE1,"+
          " t2.MOBILE1 from enquiry t1, address t2 where t1.ADDRESS_ID = t2.ADDRESS_ID AND t1.ENQUIRY_ID ='"+ENQUIRY_ID+"'";
          db.query(query, function(err,result) {
            if (err) {
              throw err;
              res.json({'isError':true});
            }
            res.json({'isError':false,'Enquiry':{result}});
          });

        });
        
         /* GET state data. */
        router.get('/getstate/country/:country', function(req, res, next) {
          var country=req.params.country;
        var getState="select identifier,displayname from jurst where type='STAT' and country='"+country+"'";
          db.query(getState,function(err,result) {
              if (err) throw err;
              res.json({'data':result});
            });
        });

        /* GET city data. */
        router.get('/getcity/state/:state', function(req, res, next) {
          var state=req.params.state;
        var getCity="select identifier,displayname from jurst where type='CITY' and state='"+state+"'";
          db.query(getCity, function(err,result) {
              if (err) throw err;
              res.json({'data':result});
            });
        });



        //Mapping 
        /* GET USERS UNDER SE */
        router.get('/getmapping/userId/:userId', function(req, res, next) {
          var userId = req.params.userId;
          var query = "select t3.* from address t3, user t2, usrrel t1 where t1.USER_ID_TO = t2.USER_ID AND t1.USER_ID_FROM = t3.MEMBER_ID AND t2.USER_ID = '"+userId+"'";
          db.query(query, function(err,result) {
            if (err) throw err;
            res.json({'data':result});
          });
        });


        //Complaint api get
        router.get('/getcomplains/userId/:userId', function(req, res, next) {
          var userId = req.params.userId;
          var query = "SELECT * FROM complaints WHERE user_id = '"+userId+"'";
          db.query(query, function(err,result) {
            if (err) throw err;
            res.json({'data':result});
          });
        });

        //complaints api post
        router.post('/complaints', function(req, res, next) {
          var userId=req.body.userId;
          //var userType=req.body.userType;
          var status='P';
          var order_qty_complain = req.body.order_qty_complain;
          var order_qa_complain = req.body.order_qa_complain;
          var order_delivery_complain = req.body.order_delivery_complain;
          var feedback = req.body.feedback;
          var CREATEDATE = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
          var UPDATETIME = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');

          var sqlstmt = "INSERT INTO complaints (order_id,order_qty_complain,order_qa_complain, order_delivery_complain, CREATETIME, UPDATETIME, feedback, STATUS, user_id) VALUES?";

              var values = [
                [order_id,order_qty_complain, order_qa_complain, order_delivery_complain, CREATEDATE, UPDATETIME, feedback, status, userId]
              ]
              db.query(sqlstmt, [values], function(err,result) {
                if (err) {
                  throw err;
                  res.json({'isError':true});
                }
                res.json({'isError':false,'Complaint':{result}});
                });
            });
        
        


        

module.exports = router;
