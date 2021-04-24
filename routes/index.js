var express = require('express');
var moment = require('moment');
var formidable = require("formidable");
var fs = require("fs");
var router = express.Router();
var db = require('../config/database');
var emailer = require('../config/emailers');
var const_data = require('../config/const');
const { route } = require('./login');
const session = require('express-session');
const readXlsxFile = require("read-excel-file/node");
//var { getAllActiveSessions } = require('../redis');
var data;
const format1 = "YYYY-MM-DD HH:mm:ss";
(function () {
  db.query('select topcategoryid,identifier,name,field1,field2 from topcategory  where ?',{status: '1'}, function(err,result) {
      if (err) throw err;
      data=result;
    });
})();
/* dashboard console. */
router.get('/', function(req, res, next) {
  var sess=req.session;
  console.log(sess);
  if(sess === undefined){
    return res.redirect('/login');
  }else{
    if(sess.user_type !='HOD' && sess.user_type !='A' && sess.user_type !='DT' && sess.user_type !='DL'
        && sess.user_type !='SE'){
      return res.redirect('/login');
    }else{
      if(sess.user_type =='HOD' || sess.user_type =='A'){
        var TotalOrderSQL="select COUNT(*) AS ORDERCOUNT,(CASE WHEN SUM(TOTAL) IS NULL THEN 0 ELSE SUM(TOTAL) END) AS ORDERTOTAL from orders";
        var PendingOrderSQL="select COUNT(*) AS ORDERCOUNT,(CASE WHEN SUM(TOTAL) IS NULL THEN 0 ELSE SUM(TOTAL) END) AS ORDERTOTAL from orders WHERE STATUS='P'";
        var ApprovedOrderSQL="select COUNT(*) AS ORDERCOUNT,(CASE WHEN SUM(TOTAL) IS NULL THEN 0 ELSE SUM(TOTAL) END) AS ORDERTOTAL from orders WHERE STATUS='A'";
        var InprogressOrderSQL="select COUNT(*) AS ORDERCOUNT,(CASE WHEN SUM(TOTAL) IS NULL THEN 0 ELSE SUM(TOTAL) END) AS ORDERTOTAL from orders WHERE STATUS='I'";
        var ShippedOrderSQL="select COUNT(*) AS ORDERCOUNT,(CASE WHEN SUM(TOTAL) IS NULL THEN 0 ELSE SUM(TOTAL) END) AS ORDERTOTAL from orders WHERE STATUS='S'";
        var DeliveredOrderSQL="select COUNT(*) AS ORDERCOUNT,(CASE WHEN SUM(TOTAL) IS NULL THEN 0 ELSE SUM(TOTAL) END) AS ORDERTOTAL from orders WHERE STATUS='D'";

      }else if(sess.user_type =='SE')
      {
        var TotalOrderSQL="select COUNT(a.ORDER_ID) AS ORDERCOUNT,(CASE WHEN SUM(a.TOTAL) IS NULL THEN 0 ELSE SUM(a.TOTAL) END) AS ORDERTOTAL from orders a "+
                      " join address c on c.address_id=a.address_id and c.member_id=a.member_id_for"+
                      " join user d on d.USER_ID=a.member_id_for join address e on e.member_id=d.USER_ID "+
                      " where a.member_id="+sess.user_id+"";
        var PendingOrderSQL="select COUNT(a.ORDER_ID) AS ORDERCOUNT,(CASE WHEN SUM(a.TOTAL) IS NULL THEN 0 ELSE SUM(a.TOTAL) END) AS ORDERTOTAL from orders a "+
                      " join address c on c.address_id=a.address_id and c.member_id=a.member_id_for"+
                      " join user d on d.USER_ID=a.member_id_for join address e on e.member_id=d.USER_ID "+
                      " where a.member_id="+sess.user_id+" and a.STATUS='P'";
        var ApprovedOrderSQL="select COUNT(a.ORDER_ID) AS ORDERCOUNT,(CASE WHEN SUM(a.TOTAL) IS NULL THEN 0 ELSE SUM(a.TOTAL) END) AS ORDERTOTAL from orders a "+
                      " join address c on c.address_id=a.address_id and c.member_id=a.member_id_for"+
                      " join user d on d.USER_ID=a.member_id_for join address e on e.member_id=d.USER_ID "+
                      " where a.member_id="+sess.user_id+" and a.STATUS='A'";
        var InprogressOrderSQL="select COUNT(a.ORDER_ID) AS ORDERCOUNT,(CASE WHEN SUM(a.TOTAL) IS NULL THEN 0 ELSE SUM(a.TOTAL) END) AS ORDERTOTAL from orders a "+
                      " join address c on c.address_id=a.address_id and c.member_id=a.member_id_for"+
                      " join user d on d.USER_ID=a.member_id_for join address e on e.member_id=d.USER_ID "+
                      " where a.member_id="+sess.user_id+" and a.STATUS='I'";
        var ShippedOrderSQL="select COUNT(a.ORDER_ID) AS ORDERCOUNT,(CASE WHEN SUM(a.TOTAL) IS NULL THEN 0 ELSE SUM(a.TOTAL) END) AS ORDERTOTAL from orders a "+
                      " join address c on c.address_id=a.address_id and c.member_id=a.member_id_for"+
                      " join user d on d.USER_ID=a.member_id_for join address e on e.member_id=d.USER_ID "+
                      " where a.member_id="+sess.user_id+" and a.STATUS='S'";
        var DeliveredOrderSQL="select COUNT(a.ORDER_ID) AS ORDERCOUNT,(CASE WHEN SUM(a.TOTAL) IS NULL THEN 0 ELSE SUM(a.TOTAL) END) AS ORDERTOTAL from orders a "+
                      " join address c on c.address_id=a.address_id and c.member_id=a.member_id_for"+
                      " join user d on d.USER_ID=a.member_id_for join address e on e.member_id=d.USER_ID "+
                      " where a.member_id="+sess.user_id+" and a.STATUS='D'";

      }else if(sess.user_type =='DT' || sess.user_type =='DL'){
        var TotalOrderSQL="select COUNT(a.ORDER_ID) AS ORDERCOUNT,(CASE WHEN SUM(a.TOTAL) IS NULL THEN 0 ELSE SUM(a.TOTAL) END) AS ORDERTOTAL from orders a "+
        " join address c on c.address_id=a.address_id and c.member_id=a.member_id_for "+
        " join user d on d.USER_ID=a.member_id join address e on e.member_id=d.USER_ID "+
        " where c.member_id="+sess.user_id+"";
        var PendingOrderSQL="select COUNT(a.ORDER_ID) AS ORDERCOUNT,(CASE WHEN SUM(a.TOTAL) IS NULL THEN 0 ELSE SUM(a.TOTAL) END) AS ORDERTOTAL from orders a "+
        " join address c on c.address_id=a.address_id and c.member_id=a.member_id_for "+
        " join user d on d.USER_ID=a.member_id join address e on e.member_id=d.USER_ID "+
        " where c.member_id="+sess.user_id+" AND a.STATUS='P'";
        var ApprovedOrderSQL="select COUNT(a.ORDER_ID) AS ORDERCOUNT,(CASE WHEN SUM(a.TOTAL) IS NULL THEN 0 ELSE SUM(a.TOTAL) END) AS ORDERTOTAL from orders a "+
        " join address c on c.address_id=a.address_id and c.member_id=a.member_id_for "+
        " join user d on d.USER_ID=a.member_id join address e on e.member_id=d.USER_ID "+
        " where c.member_id="+sess.user_id+" AND a.STATUS='A'";
        var InprogressOrderSQL="select COUNT(a.ORDER_ID) AS ORDERCOUNT,(CASE WHEN SUM(a.TOTAL) IS NULL THEN 0 ELSE SUM(a.TOTAL) END) AS ORDERTOTAL from orders a "+
        " join address c on c.address_id=a.address_id and c.member_id=a.member_id_for "+
        " join user d on d.USER_ID=a.member_id join address e on e.member_id=d.USER_ID "+
        " where c.member_id="+sess.user_id+" AND a.STATUS='I'";
        var ShippedOrderSQL="select COUNT(a.ORDER_ID) AS ORDERCOUNT,(CASE WHEN SUM(a.TOTAL) IS NULL THEN 0 ELSE SUM(a.TOTAL) END) AS ORDERTOTAL from orders a "+
        " join address c on c.address_id=a.address_id and c.member_id=a.member_id_for "+
        " join user d on d.USER_ID=a.member_id join address e on e.member_id=d.USER_ID "+
        " where c.member_id="+sess.user_id+" AND a.STATUS='S'";
        var DeliveredOrderSQL="select COUNT(a.ORDER_ID) AS ORDERCOUNT,(CASE WHEN SUM(a.TOTAL) IS NULL THEN 0 ELSE SUM(a.TOTAL) END) AS ORDERTOTAL from orders a "+
        " join address c on c.address_id=a.address_id and c.member_id=a.member_id_for "+
        " join user d on d.USER_ID=a.member_id join address e on e.member_id=d.USER_ID "+
        " where c.member_id="+sess.user_id+" AND a.STATUS='D'";

      }
      var SESQL="select COUNT(*) AS USERCOUNT from user a join usrrole b on b.USER_ID=a.USER_ID "+
      " join role c on c.ROLE_ID=b.ROLE_ID WHERE c.IDENTIFIER='SE'";
      var DTSQL="select COUNT(*) AS USERCOUNT from user a join usrrole b on b.USER_ID=a.USER_ID "+
      " join role c on c.ROLE_ID=b.ROLE_ID WHERE c.IDENTIFIER='DT'";
      var DLSQL="select COUNT(*) AS USERCOUNT from user a join usrrole b on b.USER_ID=a.USER_ID "+
      " join role c on c.ROLE_ID=b.ROLE_ID WHERE c.IDENTIFIER='DL'";
      var PRDSQL="select COUNT(*) AS PRODUCTCOUNT from product";
      var CATSQL="select COUNT(*) AS CATEGORYCOUNT from leafcategory";
      var GETPERFORMANCE = "select SALES_TARGET, SALES_ACHIEVED from sales_target where user_id="+sess.user_id+" AND SALES_TARGET_STATUS = 0";
      db.query(TotalOrderSQL, function(err,result1) {
          if (err) {
            throw err;
            return res.redirect('/login');
          }
          db.query(PendingOrderSQL, function(err,result2) {
              if (err) {
                throw err;
                return res.redirect('/login');
              }
              db.query(ApprovedOrderSQL, function(err,result3) {
                  if (err) {
                    throw err;
                    return res.redirect('/login');
                  }
                  db.query(InprogressOrderSQL, function(err,result4) {
                      if (err) {
                        throw err;
                        return res.redirect('/login');
                      }
                      db.query(ShippedOrderSQL, function(err,result5) {
                          if (err) {
                            throw err;
                            return res.redirect('/login');
                          }
                          db.query(DeliveredOrderSQL, function(err,result6) {
                              if (err) {
                                throw err;
                                return res.redirect('/login');
                              }
                              db.query(SESQL, function(err,result7) {
                                  if (err) {
                                    throw err;
                                    return res.redirect('/login');
                                  }
                                  db.query(DTSQL, function(err,result8) {
                                      if (err) {
                                        throw err;
                                        return res.redirect('/login');
                                      }
                                      db.query(DLSQL, function(err,result9) {
                                          if (err) {
                                            throw err;
                                            return res.redirect('/login');
                                          }
                                          db.query(PRDSQL, function(err,result10) {
                                              if (err) {
                                                throw err;
                                                return res.redirect('/login');
                                              }
                                              db.query(CATSQL, function(err,result11) {
                                                  if (err) {
                                                    throw err;
                                                    return res.redirect('/login');
                                                  }
                                                    db.query(GETPERFORMANCE, function(err, result12) {
                                                      if (err) {
                                                        throw err;
                                                        return res.redirect('/login');
                                                      }
                                                      res.render('_dashboard',{username:sess.username,userId:sess.user_id,userType:sess.user_type,userImg:sess.user_img,
                                                        torder:result1,porder:result2,aorder:result3,iorder:result4,sorder:result5,dorder:result6,seuser:result7,dtuser:result8,dluser:result9,product:result10,category:result11,performance:result12});
                                                    });
                                                  });
                                              });
                                          });
                                      });
                                  });
                              });
                          });
                      });
                  });
              });

        });

      }
  }
});

/* dashboard console. */
router.get('/categories', function(req, res, next) {
  var sess=req.session;
  if(sess === undefined){
    return res.redirect('/login');
  }else{
    if(sess.user_type !='HOD' && sess.user_type !='A' && sess.user_type !='DT' && sess.user_type !='DL'
        && sess.user_type !='SE'){
      return res.redirect('/login');
    }else{
       var catSQL="select a.LeafCategoryId,a.Identifier,a.Name AS catname,c.Name AS subcatname,b.Name AS topcatname,a.Status"
       +" from leafcategory a left outer join topcategory b on b.TopCategoryId=a.TopCategoryId  and b.Status='1'"+
       " left outer join leafcategory c on c.LeafCategoryId=a.ParentCategoryId and  c.Status='1' WHERE a.Status='1' limit 10";
       db.query(catSQL, function(err,result) {
           if (err) {
             throw err;
             return res.redirect('/login');
           }
            res.render('_category',{catList:result,userId:sess.user_id,userType:sess.user_type,username:sess.username,userImg:sess.user_img});
         });
      }
  }
});

/* dashboard console. */
router.post('/categoriesByName', function(req, res, next) {
  var sess=req.session;
  var name=req.body.name;
  if(sess === undefined){
    return res.redirect('/login');
  }else{
    if(sess.user_type !='HOD' && sess.user_type !='A' && sess.user_type !='DT' && sess.user_type !='DL'
        && sess.user_type !='SE'){
      return res.redirect('/login');
    }else{
       var catSQL="select a.LeafCategoryId,a.Identifier,a.Name AS catname,c.Name AS subcatname,b.Name AS topcatname,a.Status"
       +" from leafcategory a left outer join topcategory b on b.TopCategoryId=a.TopCategoryId  and b.Status='1'"+
       " left outer join leafcategory c on c.LeafCategoryId=a.ParentCategoryId and  c.Status='1' WHERE a.Status='1' and "+
       " Name like '%"+name+"%' or a.Identifier like '%"+name+"%' limit 10";
       db.query(catSQL, function(err,result) {
           if (err) {
             throw err;
             return res.redirect('/login');
           }
            res.render('_category',{catList:result,userId:sess.user_id,userType:sess.user_type,username:sess.username,userImg:sess.user_img});
         });
      }
  }
});

/* dashboard console. */
router.get('/categories/pageNo/:pageNo', function(req, res, next) {
  var sess=req.session;
  var pageNo=req.params.pageNo;
  var pagesize=10;
  var startPage=(pagesize*pageNo)+1;
  var endPage=pagesize;
  if(sess === undefined){
    return res.redirect('/login');
  }else{
    if(sess.user_type !='HOD' && sess.user_type !='A' && sess.user_type !='DT' && sess.user_type !='DL'
        && sess.user_type !='SE'){
      return res.redirect('/login');
    }else{
       var catSQL="select a.LeafCategoryId,a.Identifier,a.Name AS catname,c.Name AS subcatname,b.Name AS topcatname,a.Status"
       +" from leafcategory a left outer join topcategory b on b.TopCategoryId=a.TopCategoryId  and b.Status='1'"+
       " left outer join leafcategory c on c.LeafCategoryId=a.ParentCategoryId and  c.Status='1' WHERE a.Status='1'"+
       " limit "+startPage+","+endPage+"";
       db.query(catSQL, function(err,result) {
           if (err) {
             throw err;
             return res.redirect('/login');
           }
            res.render('_category',{catList:result,userId:sess.user_id,userType:sess.user_type,username:sess.username,userImg:sess.user_img});
         });
      }
  }
});

/* dashboard console. */
router.get('/categorybyId/Id/:id', function(req, res, next) {
  var sess=req.session;
  var id=req.params.id;
  if(sess === undefined){
    return res.redirect('/login');
  }else{
    if(sess.user_type !='HOD' && sess.user_type !='A' && sess.user_type !='DT' && sess.user_type !='DL'
        && sess.user_type !='SE'){
      return res.redirect('/login');
    }else{
       var catSQL="select a.LeafCategoryId,a.Identifier,a.Description,a.Name AS catname,c.Name AS subcatname,b.Name AS topcatname,a.Status"
       +" from leafcategory a left outer join topcategory b on b.TopCategoryId=a.TopCategoryId  and b.Status='1'"+
       " left outer join leafcategory c on c.LeafCategoryId=a.ParentCategoryId and  c.Status='1' WHERE a.Status='1' and a.Identifier='"+id+"'";
       db.query(catSQL, function(err,result) {
           if (err) {
             throw err;
             return res.redirect('/login');
           }
           var topCatSQL="select * from topcategory where Status='1'";
           var subCatSQL="select * from leafcategory where Status='1'";
           db.query(topCatSQL, function(err,result1) {
               if (err) {
                 throw err;
                 return res.redirect('/login');
               }
               db.query(subCatSQL, function(err,result2) {
                   if (err) {
                     throw err;
                     return res.redirect('/login');
                   }
                    res.render('_category_crud_edit',{catList:result,topcat:result1,subcat:result2,userId:sess.user_id,userType:sess.user_type,username:sess.username,userImg:sess.user_img});
                 });
             });

         });
      }
  }
});

/* dashboard console. */
router.get('/products', function(req, res, next) {
  var sess=req.session;
  if(sess === undefined){
    return res.redirect('/login');
  }else{
    if(sess.user_type !='HOD' && sess.user_type !='A' && sess.user_type !='DT' && sess.user_type !='DL'
        && sess.user_type !='SE'){
      return res.redirect('/login');
    }else{
       var prdSQL="select a.PRODUCT_ID,a.NAME,a.DESCRIPTION,a.THUMBNAIL,a.FULLIMAGE,c.INVENTORY,c.LISTPRICE,c.OFFERPRICE,d.Name AS CATNAME from product a join prdcatrel b on b.PRODUCT_ID=a.PRODUCT_ID"+
       " join productconf c on c.PRODUCT_ID=a.PRODUCT_ID left outer join leafcategory d on d.LeafCategoryId=b.CATEGORY_ID WHERE a.PUBLISHED=1 limit 10";
       db.query(prdSQL, function(err,result) {
           if (err) {
             throw err;
             return res.redirect('/login');
           }
            res.render('_product',{prdList:result,userId:sess.user_id,userType:sess.user_type,username:sess.username,userImg:sess.user_img});
         });
      }
  }
});

/* dashboard console. */
router.get('/products/pageNo/:pageNo', function(req, res, next) {
  var sess=req.session;
  var pageNo=req.params.pageNo;
 var pagesize=10;
 var startPage=(pagesize*pageNo)+1;
 var endPage=pagesize;
  if(sess === undefined){
    return res.redirect('/login');
  }else{
    if(sess.user_type !='HOD' && sess.user_type !='A' && sess.user_type !='DT' && sess.user_type !='DL'
        && sess.user_type !='SE'){
      return res.redirect('/login');
    }else{
       var prdSQL="select a.PRODUCT_ID,a.NAME,a.DESCRIPTION,a.THUMBNAIL,a.FULLIMAGE,c.INVENTORY,c.LISTPRICE,c.OFFERPRICE,d.Name AS CATNAME from product a join prdcatrel b on b.PRODUCT_ID=a.PRODUCT_ID"+
       " join productconf c on c.PRODUCT_ID=a.PRODUCT_ID left outer join leafcategory d on d.LeafCategoryId=b.CATEGORY_ID WHERE a.PUBLISHED=1 limit "+startPage+","+endPage+"";
       db.query(prdSQL, function(err,result) {
           if (err) {
             throw err;
             return res.redirect('/login');
           }
            res.render('_product',{prdList:result,userId:sess.user_id,userType:sess.user_type,username:sess.username,userImg:sess.user_img});
         });
      }
  }
});

/* dashboard console. */
router.post('/productsByName', function(req, res, next) {
  var sess=req.session;
  var name=req.body.name;
  if(sess === undefined){
    return res.redirect('/login');
  }else{
    if(sess.user_type !='HOD' && sess.user_type !='A' && sess.user_type !='DT' && sess.user_type !='DL'
        && sess.user_type !='SE'){
      return res.redirect('/login');
    }else{
       var prdSQL="select a.PRODUCT_ID,a.NAME,a.DESCRIPTION,a.THUMBNAIL,a.FULLIMAGE,c.INVENTORY,c.LISTPRICE,c.OFFERPRICE,d.Name AS CATNAME from product a join prdcatrel b on b.PRODUCT_ID=a.PRODUCT_ID"+
       " join productconf c on c.PRODUCT_ID=a.PRODUCT_ID left outer join leafcategory d on d.LeafCategoryId=b.CATEGORY_ID WHERE a.PUBLISHED=1 and a.NAME LIKE '%"+name+"%' limit 10";
       db.query(prdSQL, function(err,result) {
           if (err) {
             throw err;
             return res.redirect('/login');
           }
            res.render('_product',{prdList:result,userId:sess.user_id,userType:sess.user_type,username:sess.username,userImg:sess.user_img});
         });
      }
  }
});

/* dashboard console. */
router.get('/cart', function(req, res, next) {
  var sess=req.session;
  var isCartEmpty=false;
  var pspare_ids;
  var pspare_dtl;
  if(sess === undefined){
    return res.redirect('/login');
  }else{
    if(sess.user_type !='HOD' && sess.user_type !='A' && sess.user_type !='DT' && sess.user_type !='DL'
        && sess.user_type !='SE'){
      return res.redirect('/login');
    }else{
       var cartQL="select c.PRODUCT_ID,c.NAME,c.THUMBNAIL,c.DESCRIPTION,d.INVENTORY,d.OFFERPRICE,d.LISTPRICE,b.QTY,b.PSPARE_ID,b.CART_ID,b.MEMBER_ID,b.TOTAL AS TOTAL,b.CARTDTL_ID"+
       ",(select GROUP_CONCAT(concat(NAME,'/',PRICE) SEPARATOR ',') from pspare where PSPARE_ID IN (b.PSPARE_ID)) AS SPAREDTL,b.FIELD2 AS SPARETOTAL "+
       " from cart a join cartdtl b on b.CART_ID=a.CART_ID join product c on c.PRODUCT_ID=b.PRODUCT_ID "+
       " JOIN productconf d on d.PRODUCT_ID=c.PRODUCT_ID WHERE a.STATUS='P' AND b.STATUS='P' and a.MEMBER_ID="+sess.user_id+"";
       db.query(cartQL, function(err,result) {
           if (err) {
             throw err;
             return res.redirect('/login');
           }
           result.forEach(function(data){
               pspare_ids=data.PSPARE_ID;
             });
             if(pspare_ids ==undefined){
               pspare_ids=0;
             }
           if(result && !result.length){
             isCartEmpty=true;
           }
           var cTotalSQL="select TOTAL,FIELD1,FIELD2,CART_ID from cart WHERE MEMBER_ID="+sess.user_id+" AND STATUS='P'";
           db.query(cTotalSQL, function(err,data) {
               if (err) {
                 throw err;
                 return res.redirect('/login');
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
                 " WHERE c.IDENTIFIER IN('DT','DL') AND h.IDENTIFIER='SE' AND f.USER_ID="+sess.user_id+"";
                  db.query(dltSQL,function(err,result1) {
                      if (err) {
                        throw err;
                        return res.redirect('/login');
                      }
                   var pspareSQL="select GROUP_CONCAT(concat(NAME,'/',PRICE) SEPARATOR ',') AS SPAREDTL from pspare where PSPARE_ID IN ("+pspare_ids+")";
                      db.query(pspareSQL,function(err,result2) {
                          if (err) {
                            throw err;
                            return res.redirect('/login');
                          }
                          result2.forEach(function(element){
                              pspare_dtl=element.SPAREDTL;
                            });

                          res.render('_order_view',{isCartEmpty:isCartEmpty,cartList:result,pspare_dtl:pspare_dtl,dldtList:result1,userId:sess.user_id,userType:sess.user_type,ctotal:total,csubtotal:subtotal,cvat:vat,cartid:cartid,username:sess.username,userImg:sess.user_img});
                        });
                    });

             });
         });
      }
  }
});


/* perforamce */
router.get('/sale_target', function(req, res, next) {
  var sess=req.session;

  var GETPERFORMANCE = "SELECT * FROM sales_target";
  var dltSQL="select a.USER_ID,a.LOGON_ID1,d.FIRSTNAME,d.LASTNAME from user a join usrrole b on b.USER_ID=a.USER_ID"+
         " join role c on c.ROLE_ID=b.ROLE_ID join address d on d.MEMBER_ID=a.USER_ID "+
         " WHERE a.STATUS='1' and c.IDENTIFIER IN ('DT','DL')";
  var seSQL="select a.USER_ID,a.LOGON_ID1,d.FIRSTNAME,d.LASTNAME from user a join usrrole b on b.USER_ID=a.USER_ID"+
         " join role c on c.ROLE_ID=b.ROLE_ID join address d on d.MEMBER_ID=a.USER_ID "+
         " WHERE a.STATUS='1' and c.IDENTIFIER IN ('SE')";
  if(sess === undefined){
    return res.redirect('/login');
  }else{
    if(sess.user_type === 'A'){
      db.query(GETPERFORMANCE, function(err, result) {
        if (err) {
          throw err;
          return res.redirect('/login');
        }
        db.query(dltSQL, function(err, result2) {
          if (err) {
            throw err;
            return res.redirect('/login');
          }
          db.query(seSQL, function(err, result3) {
            if (err) {
              throw err;
              return res.redirect('/login');
            }
            res.render('_sales_target',{ dldtList:result2,seList:result3,salestargets:result,userId:sess.user_id,userType:sess.user_type,username:sess.username,userImg:sess.user_img});
          });
        });
      });
    }else{
      return res.redirect('/login');
    } 
  }
});



router.post('/get_sales_target', function(req, res, next) {
  var sess=req.session;
  var sales_month=req.body.sales_month;
  var sales_year = req.body.sales_year;

  if(sales_month != "00" && sales_year != "00"){
    var GETPERFORMANCE = "SELECT * FROM sales_target WHERE MONTH(CREATETIME) ="+sales_month+" AND YEAR(CREATETIME)="+sales_year+"";
    var dltSQL="select a.USER_ID,a.LOGON_ID1,d.FIRSTNAME,d.LASTNAME from user a join usrrole b on b.USER_ID=a.USER_ID"+
          " join role c on c.ROLE_ID=b.ROLE_ID join address d on d.MEMBER_ID=a.USER_ID "+
          " WHERE a.STATUS='1' and c.IDENTIFIER IN ('DT','DL')";
    var seSQL="select a.USER_ID,a.LOGON_ID1,d.FIRSTNAME,d.LASTNAME from user a join usrrole b on b.USER_ID=a.USER_ID"+
          " join role c on c.ROLE_ID=b.ROLE_ID join address d on d.MEMBER_ID=a.USER_ID "+
          " WHERE a.STATUS='1' and c.IDENTIFIER IN ('SE')";
    if(sess === undefined){
      return res.redirect('/login');
    }else{
      if(sess.user_type === 'A'){
        db.query(GETPERFORMANCE, function(err, result) {
          if (err) {
            throw err;
            return res.redirect('/login');
          }
          db.query(dltSQL, function(err, result2) {
            if (err) {
              throw err;
              return res.redirect('/login');
            }
            db.query(seSQL, function(err, result3) {
              if (err) {
                throw err;
                return res.redirect('/login');
              }
              res.render('_sales_target',{ dldtList:result2,seList:result3,salestargets:result,userId:sess.user_id,userType:sess.user_type,username:sess.username,userImg:sess.user_img});
            });
          });
        });
      }else{
        return res.redirect('/login');
      } 
    }
  }else{
    var GETPERFORMANCE = "SELECT * FROM sales_target";
    var dltSQL="select a.USER_ID,a.LOGON_ID1,d.FIRSTNAME,d.LASTNAME from user a join usrrole b on b.USER_ID=a.USER_ID"+
          " join role c on c.ROLE_ID=b.ROLE_ID join address d on d.MEMBER_ID=a.USER_ID "+
          " WHERE a.STATUS='1' and c.IDENTIFIER IN ('DT','DL')";
    var seSQL="select a.USER_ID,a.LOGON_ID1,d.FIRSTNAME,d.LASTNAME from user a join usrrole b on b.USER_ID=a.USER_ID"+
          " join role c on c.ROLE_ID=b.ROLE_ID join address d on d.MEMBER_ID=a.USER_ID "+
          " WHERE a.STATUS='1' and c.IDENTIFIER IN ('SE')";
    if(sess === undefined){
      return res.redirect('/login');
    }else{
      if(sess.user_type === 'A'){
        db.query(GETPERFORMANCE, function(err, result) {
          if (err) {
            throw err;
            return res.redirect('/login');
          }
          db.query(dltSQL, function(err, result2) {
            if (err) {
              throw err;
              return res.redirect('/login');
            }
            db.query(seSQL, function(err, result3) {
              if (err) {
                throw err;
                return res.redirect('/login');
              }
              res.render('_sales_target',{ dldtList:result2,seList:result3,salestargets:result,userId:sess.user_id,userType:sess.user_type,username:sess.username,userImg:sess.user_img});
            });
          });
        });
      }else{
        return res.redirect('/login');
      } 
    }
  }
});

router.post('/update_sales_target', function(req, res, next) {
  var sess = req.session;
  var targetid=req.body.salesTargetId;

  var updates_sales_target = "update sales_target set SALES_TARGET_STATUS = 1, UPDATETIME = CURRENT_TIMESTAMP where id ="+targetid+"";
  if(sess === undefined){
    return res.redirect('/login');
  }else{
    if(sess.user_type === 'A'){
      db.query(updates_sales_target, function(err, result) {
        if (err) {
          throw err;
          return res.redirect('/login');
        }
        return res.redirect('/sale_target');
      });
    }else{
      return res.redirect('/login');
    } 
  }
});


router.post('/add_sales_target', function(req, res, next) {
  var sess = req.session;
  var dldtid=req.body.dldt;
  var seid = req.body.se;
  var sales_target_amount = req.body.sales_target_amount;
  var user_id = 0;
  console.log("in insertion of sales target ---------------");
  console.log('dldt id');
  console.log(dldtid);
  console.log('se id');
  console.log(seid);
  console.log('sales target amount');
  console.log(sales_target_amount);
  if(sess === undefined){
    return res.redirect('/login');
  }else{
  if(seid != undefined){
    user_id = seid;
    var ApprovedOrderSQL="select COUNT(a.ORDER_ID) AS ORDERCOUNT,(CASE WHEN SUM(a.TOTAL) IS NULL THEN 0 ELSE SUM(a.TOTAL) END) AS ORDERTOTAL from orders a "+
        " join address c on c.address_id=a.address_id and c.member_id=a.member_id_for"+
        " join user d on d.USER_ID=a.member_id_for join address e on e.member_id=d.USER_ID "+
        " where a.member_id="+seid+" and a.STATUS='A'";
  }else{
    user_id = dldtid;
    var ApprovedOrderSQL="select COUNT(a.ORDER_ID) AS ORDERCOUNT,(CASE WHEN SUM(a.TOTAL) IS NULL THEN 0 ELSE SUM(a.TOTAL) END) AS ORDERTOTAL from orders a "+
    " join address c on c.address_id=a.address_id and c.member_id=a.member_id_for "+
    " join user d on d.USER_ID=a.member_id join address e on e.member_id=d.USER_ID "+
    " where c.member_id="+dldtid+" AND a.STATUS='A'";
  }


  db.query(ApprovedOrderSQL, function(err, result) {
    if (err) {
      throw err;
      return res.redirect('/login');
    }
    result.forEach(function(data){
      ordertotal=data.ORDERTOTAL;
      console.log(ordertotal);
      var get_user_logon_id = "select LOGON_ID1 from user where USER_ID="+user_id+"";
      db.query(get_user_logon_id, function(err, users) {
        users.forEach(function(user){
          var login_id  = user.LOGON_ID1;
          add_sales_target = "insert into sales_target (user_id, USER_LOGIN_ID,SALES_TARGET,SALES_ACHIEVED,SALES_TARGET_STATUS,CREATETIME, UPDATETIME) values ('"+user_id+"','"+login_id+"','"+sales_target_amount+"','"+ordertotal+"', 0,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)";
          db.query(add_sales_target, function(err, result) {
            if (err) {
              throw err;
              return res.redirect('/login');
            }
            return res.redirect('/sale_target');
          });
        })
      });
     
    });
  });

}
 

  

});
/* dashboard console. */
router.get('/orderdtl/:id', function(req, res, next) {
  var sess=req.session;
  var ordId=req.params.id;
  var pspare_ids;
  var pspare_dtl;
  if(sess === undefined){
    return res.redirect('/login');
  }else{
    if(sess.user_type !='HOD' && sess.user_type !='A' && sess.user_type !='DT' && sess.user_type !='DL'
        && sess.user_type !='SE'){
      return res.redirect('/login');
    }else{
       var cartQL="";
       if(sess.user_type == 'DL' || sess.user_type == 'DT'){
        cartQL="select c.PRODUCT_ID,c.NAME,c.THUMBNAIL,c.DESCRIPTION,d.INVENTORY,d.OFFERPRICE,d.LISTPRICE,b.QUANTITY,b.ADDRESS_ID,b.STOTAL AS TOTAL,b.STATUS,b.ORDERITEM_ID,b.ORDER_ID,b.PSPARE_IDS"+
        ",(select GROUP_CONCAT(concat(NAME,'/',PRICE) SEPARATOR ',') from pspare where PSPARE_ID IN (b.PSPARE_IDS)) AS SPAREDTL,b.PSPARE_TOTAL_PRICE AS SPARETOTAL"+
        " from orders a join orderitem b on b.ORDER_ID=a.ORDER_ID join product c on c.PRODUCT_ID=b.PRODUCT_ID "+
        " JOIN productconf d on d.PRODUCT_ID=c.PRODUCT_ID WHERE a.ORDER_ID="+ordId+"";

       }else{
         cartQL="select a.MEMBER_ID, a.MEMBER_ID_FOR ,c.PRODUCT_ID,c.NAME,c.THUMBNAIL,c.DESCRIPTION,d.INVENTORY,d.OFFERPRICE,d.LISTPRICE,b.QUANTITY,b.ADDRESS_ID,b.STOTAL AS TOTAL,b.STATUS,b.ORDERITEM_ID,b.ORDER_ID,b.PSPARE_IDS"+
         ",(select GROUP_CONCAT(concat(NAME,'/',PRICE) SEPARATOR ',') from pspare where PSPARE_ID IN (b.PSPARE_IDS)) AS SPAREDTL,b.PSPARE_TOTAL_PRICE AS SPARETOTAL"+
         " from orders a join orderitem b on b.ORDER_ID=a.ORDER_ID join product c on c.PRODUCT_ID=b.PRODUCT_ID "+
         " JOIN productconf d on d.PRODUCT_ID=c.PRODUCT_ID WHERE a.ORDER_ID="+ordId+"";
       }
       db.query(cartQL, function(err,result) {
           if (err) {
             throw err;
             return res.redirect('/login');
           }
           result.forEach(function(data){
               pspare_ids=data.PSPARE_IDS;
             });
             if(pspare_ids ==undefined){
               pspare_ids=0;
             }
           var cTotalSQL="select ORDER_ID,TOTAL,FIELD1,TAX,DISCOUNT,STATUS,QUANTITY,ADDRESS_ID,PRICE from orders WHERE ORDER_ID="+ordId+"";
           db.query(cTotalSQL, function(err,data) {
               if (err) {
                 throw err;
                 return res.redirect('/login');
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

                 var pspareSQL="select GROUP_CONCAT(concat(NAME,'/',PRICE) SEPARATOR ',') AS SPAREDTL from pspare where PSPARE_ID IN ("+pspare_ids+")";
                    db.query(pspareSQL,function(err,result2) {
                        if (err) {
                          throw err;
                          return res.redirect('/login');
                        }
                        result2.forEach(function(element){
                            pspare_dtl=element.SPAREDTL;
                          });

                          res.render('_order_dtl',{orderList:result,pspare_dtl:pspare_dtl,userId:sess.user_id,userType:sess.user_type,
                            ctotal:total,csubtotal:subtotal,cvat:vat,cdiscount:discount,cstatus:status,cquantity:quantity,caddressId:addressId,username:sess.username,userImg:sess.user_img});
                      });
                });
         });
      }
  }
});
/* dashboard console. */
router.get('/productdtl/:id', function(req, res, next) {
  var sess=req.session;
  var prdId=req.params.id;
  if(sess === undefined){
    return res.redirect('/login');
  }else{
    if(sess.user_type !='HOD' && sess.user_type !='A' && sess.user_type !='DT' && sess.user_type !='DL'
        && sess.user_type !='SE'){
      return res.redirect('/login');
    }else{
      var prdSQL="select a.PRODUCT_ID,a.NAME,a.DESCRIPTION,a.THUMBNAIL,a.FULLIMAGE,c.INVENTORY,c.LISTPRICE,c.OFFERPRICE,d.Name AS CATNAME from product a join prdcatrel b on b.PRODUCT_ID=a.PRODUCT_ID"+
      " join productconf c on c.PRODUCT_ID=a.PRODUCT_ID left outer join leafcategory d on d.LeafCategoryId=b.CATEGORY_ID "+
      " WHERE a.PUBLISHED=1 and a.PRODUCT_ID="+prdId+"";

       db.query(prdSQL, function(err,result) {
           if (err) {
             throw err;
             return res.redirect('/login');
           }
           var spareSQL="select * from pspare where PRODUCT_ID="+prdId+" and STATUS=1";
           db.query(spareSQL, function(err,presult) {
               if (err) {
                 throw err;
                 return res.redirect('/login');
               }
                res.render('_product_dtl',{prdList:result,spList:presult,userId:sess.user_id,userType:sess.user_type,username:sess.username,userImg:sess.user_img});
             });
         });
      }
  }
});

/* dashboard console. */
router.get('/productedit/:id', function(req, res, next) {
  var sess=req.session;
  var prdId=req.params.id;
  if(sess === undefined){
    return res.redirect('/login');
  }else{
    if(sess.user_type !='HOD' && sess.user_type !='A' && sess.user_type !='DT' && sess.user_type !='DL'
        && sess.user_type !='SE'){
      return res.redirect('/login');
    }else{
      var prdSQL="select a.PRODUCT_ID,a.NAME,a.DESCRIPTION,a.THUMBNAIL,a.FULLIMAGE,c.INVENTORY,c.LISTPRICE,c.OFFERPRICE,d.Name AS CATNAME from product a join prdcatrel b on b.PRODUCT_ID=a.PRODUCT_ID"+
      " join productconf c on c.PRODUCT_ID=a.PRODUCT_ID left outer join leafcategory d on d.LeafCategoryId=b.CATEGORY_ID "+
      " WHERE a.PUBLISHED=1 and a.PRODUCT_ID="+prdId+"";

       db.query(prdSQL, function(err,result) {
           if (err) {
             throw err;
             return res.redirect('/login');
           }
           var spareSQL="select * from pspare where PRODUCT_ID="+prdId+" and STATUS=1";
           db.query(spareSQL, function(err,presult) {
               if (err) {
                 throw err;
                 return res.redirect('/login');
               }
                res.render('_product_crud_edit',{prdList:result,spList:presult,userId:sess.user_id,userType:sess.user_type,username:sess.username,userImg:sess.user_img});
             });
         });
      }
  }
});

/* dashboard console. */
router.get('/profile', function(req, res, next) {
  var sess=req.session;
  if(sess === undefined){
  return res.redirect('/login');
  }else{
    if(sess.user_type !='HOD' && sess.user_type !='A' && sess.user_type !='DT' && sess.user_type !='DL'
        && sess.user_type !='SE'){
      return res.redirect('/login');
    }else{
      var profileSQL="select a.USER_ID,a.FIELD1,a.LOGON_ID1,b.FIRSTNAME,b.LASTNAME,b.ADDRESSFOR,b.ADDRESSTYPE,b.ADDRESSLINE1,b.CITY,b.STATE,b.COUNTRY,b.ZIPCODE,"+
      " b.AADHAARID,b.VOTERID,b.PANNO,b.PASSPORTID,b.gstin,b.company,b.DL,b.EMAIL1,b.MOBILE1,b.MOBILE1CODE,b.PHONE1"+
       " from user a join address b on b.MEMBER_ID=a.USER_ID where a.USER_ID="+sess.user_id+"";
       db.query(profileSQL, function(err,result) {
           if (err) {
             throw err;
             return res.redirect('/login');
           }
            res.render('_profile',{profile:result,userId:sess.user_id,userType:sess.user_type,username:sess.username,userImg:sess.user_img});
         });
    }
  }
});



/* dashboard console. */
router.get('/create_dl', function(req, res, next) {
  var sess=req.session;
  if(sess === undefined){
  return res.redirect('/login');
  }else{
    if(sess.user_type !='HOD' && sess.user_type !='A' && sess.user_type !='DT' && sess.user_type !='DL'
        && sess.user_type !='SE'){
      return res.redirect('/login');
    }else{
      res.render('_dl_crud',{userId:sess.user_id,userType:sess.user_type,username:sess.username,userImg:sess.user_img});
    }
  }
});

/* dashboard console. */
router.get('/edit_dl/id/:id', function(req, res, next) {
  var sess=req.session;
  var id=req.params.id;
  if(sess === undefined){
  return res.redirect('/login');
  }else{
    if(sess.user_type !='HOD' && sess.user_type !='A' && sess.user_type !='DT' && sess.user_type !='DL'
        && sess.user_type !='SE'){
      return res.redirect('/login');
    }else{

      var profileSQL="select a.USER_ID,a.LOGON_ID1,b.FIRSTNAME,b.LASTNAME,b.ADDRESSFOR,b.ADDRESSTYPE,b.ADDRESSLINE1,b.CITY,b.STATE,b.COUNTRY,b.ZIPCODE,"+
      " b.AADHAARID,b.VOTERID,b.PANNO,b.PASSPORTID,b.gstin,b.company,b.DL,b.EMAIL1,b.MOBILE1,b.MOBILE1CODE,b.PHONE1"+
       " from user a join address b on b.MEMBER_ID=a.USER_ID where a.USER_ID="+id+"";
       db.query(profileSQL, function(err,result) {
           if (err) {
             throw err;
             return res.redirect('/login');
           }
            res.render('_dl_crud_edit',{users:result,userId:sess.user_id,userType:sess.user_type,username:sess.username,userImg:sess.user_img});
         });
    }
  }
});

/* dashboard console. */
router.get('/create_dt', function(req, res, next) {
  var sess=req.session;
  if(sess === undefined){
  return res.redirect('/login');
  }else{
    if(sess.user_type !='HOD' && sess.user_type !='A' && sess.user_type !='DT' && sess.user_type !='DL'
        && sess.user_type !='SE'){
      return res.redirect('/login');
    }else{
        res.render('_dt_crud',{userId:sess.user_id,userType:sess.user_type,username:sess.username,userImg:sess.user_img});
    }
  }
});

/* dashboard console. */
router.get('/edit_dt/id/:id', function(req, res, next) {
  var sess=req.session;
  var id=req.params.id;
  if(sess === undefined){
  return res.redirect('/login');
  }else{
    if(sess.user_type !='HOD' && sess.user_type !='A' && sess.user_type !='DT' && sess.user_type !='DL'
        && sess.user_type !='SE'){
      return res.redirect('/login');
    }else{
      var profileSQL="select a.USER_ID,a.LOGON_ID1,b.FIRSTNAME,b.LASTNAME,b.ADDRESSFOR,b.ADDRESSTYPE,b.ADDRESSLINE1,b.CITY,b.STATE,b.COUNTRY,b.ZIPCODE,"+
      " b.AADHAARID,b.VOTERID,b.PANNO,b.PASSPORTID,b.gstin,b.company,b.DL,b.EMAIL1,b.MOBILE1,b.MOBILE1CODE,b.PHONE1"+
       " from user a join address b on b.MEMBER_ID=a.USER_ID where a.USER_ID="+id+"";
       db.query(profileSQL, function(err,result) {
           if (err) {
             throw err;
             return res.redirect('/login');
           }
            res.render('_dt_crud_edit',{users:result,userId:sess.user_id,userType:sess.user_type,username:sess.username,userImg:sess.user_img});
         });
    }
  }
});

/* dashboard console. */
router.get('/create_se', function(req, res, next) {
  var sess=req.session;
  if(sess === undefined){
  return res.redirect('/login');
  }else{
    if(sess.user_type !='HOD' && sess.user_type !='A' && sess.user_type !='DT' && sess.user_type !='DL'
        && sess.user_type !='SE'){
      return res.redirect('/login');
    }else{
      res.render('_se_crud',{userId:sess.user_id,userType:sess.user_type,username:sess.username,userImg:sess.user_img});
    }
  }
});

/* dashboard console. */
router.get('/edit_se/id/:id', function(req, res, next) {
  var sess=req.session;
  var id=req.params.id;
  if(sess === undefined){
  return res.redirect('/login');
  }else{
    if(sess.user_type !='HOD' && sess.user_type !='A' && sess.user_type !='DT' && sess.user_type !='DL'
        && sess.user_type !='SE'){
      return res.redirect('/login');
    }else{
      var profileSQL="select a.USER_ID,a.LOGON_ID1,b.FIRSTNAME,b.LASTNAME,b.ADDRESSFOR,b.ADDRESSTYPE,b.ADDRESSLINE1,b.CITY,b.STATE,b.COUNTRY,b.ZIPCODE,"+
      " b.AADHAARID,b.VOTERID,b.PANNO,b.PASSPORTID,b.gstin,b.company,b.DL,b.EMAIL1,b.MOBILE1,b.MOBILE1CODE,b.PHONE1"+
       " from user a join address b on b.MEMBER_ID=a.USER_ID where a.USER_ID="+id+"";
       db.query(profileSQL, function(err,result) {
           if (err) {
             throw err;
             return res.redirect('/login');
           }
            res.render('_se_crud_edit',{users:result,userId:sess.user_id,userType:sess.user_type,username:sess.username,userImg:sess.user_img});
         });
    }
  }
});

/* dashboard console. */
router.get('/delete_user/id/:id', function(req, res, next) {
  var sess=req.session;
  var id=req.params.id;
  if(sess === undefined){
  return res.redirect('/login');
  }else{
    if(sess.user_type !='HOD' && sess.user_type !='A' && sess.user_type !='DT' && sess.user_type !='DL'
        && sess.user_type !='SE'){
      return res.redirect('/login');
    }else{
      var delete_user_sql="delete from usrrel where USER_ID_FROM="+id+" or USER_ID_TO="+id+";"+
      "delete from usrrole WHERE USER_ID="+id+";delete from address where "+
      " MEMBER_ID="+id+";delete from user where USER_ID="+id+";";
      db.query(delete_user_sql, function(err,result) {
          if (err) {
            throw err;
            return res.redirect('/login');
          }
           res.redirect('/dashboard');
        });

    }
  }
});
/* orders console. */
router.get('/orders', function(req, res, next) {
  var sess=req.session;
  var orderSQ="";
  if(sess === undefined){
    return res.redirect('/login');
  }else{
    if(sess.user_type !='HOD' && sess.user_type !='A' && sess.user_type !='DT' && sess.user_type !='DL'
        && sess.user_type !='SE'){
      return res.redirect('/login');
    }else{
      if(sess.user_type =='DT' || sess.user_type =='DL'){
         orderSQL="select a.order_id,a.status,a.MEMBER_ID,a.MEMBER_ID_FOR,c.FIRSTNAME,c.LASTNAME,c.EMAIL1,c.MOBILE1,c.MOBILE1CODE,c.PHONE1,"+
        " c.company,c.gstin,c.AADHAARID,c.VOTERID,c.DL,c.PANNO,c.PASSPORTID,c.ADDRESSLINE1,c.ADDRESSFOR,c.ADDRESSTYPE,a.CREATETIME,a.UPDATETIME,a.TOTAL "+
        " ,c.city,c.state,c.COUNTRY,c.zipcode,d.USER_ID AS CUSER_ID,d.LOGON_ID1 AS CLOGON_ID1,e.FIRSTNAME as CFIRSTNAME,e.LASTNAME as CLASTNAME from orders a "+
         " join address c on c.address_id=a.address_id and c.member_id=a.member_id_for "+
         " join user d on d.USER_ID=a.member_id join address e on e.member_id=d.USER_ID "+
         " where c.member_id="+sess.user_id+" order by a.CREATETIME desc";
      }else if(sess.user_type =='SE'){
        orderSQL="select a.order_id,a.status,a.MEMBER_ID,a.MEMBER_ID_FOR,c.FIRSTNAME,c.LASTNAME,c.EMAIL1,c.MOBILE1,c.MOBILE1CODE,c.PHONE1,"+
        " c.company,c.gstin,c.AADHAARID,c.VOTERID,c.DL,c.PANNO,c.PASSPORTID,c.ADDRESSLINE1,c.ADDRESSFOR,c.ADDRESSTYPE,a.CREATETIME,a.UPDATETIME,a.TOTAL "+
        " ,c.city,c.state,c.COUNTRY,c.zipcode,d.USER_ID AS CUSER_ID,d.LOGON_ID1 AS CLOGON_ID1,e.FIRSTNAME as CFIRSTNAME,e.LASTNAME as CLASTNAME from orders a "+
        " join address c on c.address_id=a.address_id and c.member_id=a.member_id_for "+
        " join user d on d.USER_ID=a.member_id_for join address e on e.member_id=d.USER_ID "+
        " where a.member_id="+sess.user_id+" order by a.CREATETIME desc";
      }else{
        orderSQL="select a.order_id,a.status,a.MEMBER_ID,a.MEMBER_ID_FOR,c.FIRSTNAME,c.LASTNAME,c.EMAIL1,c.MOBILE1,c.MOBILE1CODE,c.PHONE1,"+
       " c.company,c.gstin,c.AADHAARID,c.VOTERID,c.DL,c.PANNO,c.PASSPORTID,c.ADDRESSLINE1,c.ADDRESSFOR,c.ADDRESSTYPE,a.CREATETIME,a.UPDATETIME,a.TOTAL "+
       " ,c.city,c.state,c.COUNTRY,c.zipcode,d.USER_ID AS CUSER_ID,d.LOGON_ID1 AS CLOGON_ID1,e.FIRSTNAME as CFIRSTNAME,e.LASTNAME as CLASTNAME from orders a "+
        " join address c on c.address_id=a.address_id and c.member_id=a.member_id_for"+
        " join user d on d.USER_ID=a.member_id join address e on e.member_id=d.USER_ID order by a.CREATETIME desc";
      }
       db.query(orderSQL, function(err,result) {
           if (err) {
             throw err;
             return res.redirect('/login');
           }
            res.render('_orders',{orders:result,userId:sess.user_id,userType:sess.user_type,moment:moment,username:sess.username,userImg:sess.user_img});
         });
    }
  }
});

/* orders console. */
router.get('/ordersByStatus/:status', function(req, res, next) {
  var sess=req.session;
  var orderSQ="";
  var status=req.params.status;
  if(sess === undefined){
    return res.redirect('/login');
  }else{
    if(sess.user_type !='HOD' && sess.user_type !='A' && sess.user_type !='DT' && sess.user_type !='DL'
        && sess.user_type !='SE'){
      return res.redirect('/login');
    }else{
      if(status==0){
        if(sess.user_type =='DT' || sess.user_type =='DL'){
           orderSQL="select a.order_id,a.status,a.MEMBER_ID,a.MEMBER_ID_FOR,c.FIRSTNAME,c.LASTNAME,c.EMAIL1,c.MOBILE1,c.MOBILE1CODE,c.PHONE1,"+
          " c.company,c.gstin,c.AADHAARID,c.VOTERID,c.DL,c.PANNO,c.PASSPORTID,c.ADDRESSLINE1,c.ADDRESSFOR,c.ADDRESSTYPE,a.CREATETIME,a.UPDATETIME,a.TOTAL "+
          " ,c.city,c.state,c.COUNTRY,c.zipcode,d.USER_ID AS CUSER_ID,d.LOGON_ID1 AS CLOGON_ID1,e.FIRSTNAME as CFIRSTNAME,e.LASTNAME as CLASTNAME from orders a "+
           " join address c on c.address_id=a.address_id and c.member_id=a.member_id_for "+
           " join user d on d.USER_ID=a.member_id join address e on e.member_id=d.USER_ID "+
           " where c.member_id="+sess.user_id+" order by a.CREATETIME desc limit 10";
        }else if(sess.user_type =='SE'){
          orderSQL="select a.order_id,a.status,a.MEMBER_ID,a.MEMBER_ID_FOR,c.FIRSTNAME,c.LASTNAME,c.EMAIL1,c.MOBILE1,c.MOBILE1CODE,c.PHONE1,"+
          " c.company,c.gstin,c.AADHAARID,c.VOTERID,c.DL,c.PANNO,c.PASSPORTID,c.ADDRESSLINE1,c.ADDRESSFOR,c.ADDRESSTYPE,a.CREATETIME,a.UPDATETIME,a.TOTAL "+
          " ,c.city,c.state,c.COUNTRY,c.zipcode,d.USER_ID AS CUSER_ID,d.LOGON_ID1 AS CLOGON_ID1,e.FIRSTNAME as CFIRSTNAME,e.LASTNAME as CLASTNAME from orders a "+
          " join address c on c.address_id=a.address_id and c.member_id=a.member_id_for "+
          " join user d on d.USER_ID=a.member_id_for join address e on e.member_id=d.USER_ID "+
          " where a.member_id="+sess.user_id+" order by a.CREATETIME desc limit 10";
        }else{
          orderSQL="select a.order_id,a.status,a.MEMBER_ID,a.MEMBER_ID_FOR,c.FIRSTNAME,c.LASTNAME,c.EMAIL1,c.MOBILE1,c.MOBILE1CODE,c.PHONE1,"+
         " c.company,c.gstin,c.AADHAARID,c.VOTERID,c.DL,c.PANNO,c.PASSPORTID,c.ADDRESSLINE1,c.ADDRESSFOR,c.ADDRESSTYPE,a.CREATETIME,a.UPDATETIME,a.TOTAL "+
         " ,c.city,c.state,c.COUNTRY,c.zipcode,d.USER_ID AS CUSER_ID,d.LOGON_ID1 AS CLOGON_ID1,e.FIRSTNAME as CFIRSTNAME,e.LASTNAME as CLASTNAME from orders a "+
          " join address c on c.address_id=a.address_id and c.member_id=a.member_id_for"+
          " join user d on d.USER_ID=a.member_id join address e on e.member_id=d.USER_ID order by a.CREATETIME desc limit 10";
        }
      }else{
        if(sess.user_type =='DT' || sess.user_type =='DL'){
           orderSQL="select a.order_id,a.status,a.MEMBER_ID,a.MEMBER_ID_FOR,c.FIRSTNAME,c.LASTNAME,c.EMAIL1,c.MOBILE1,c.MOBILE1CODE,c.PHONE1,"+
          " c.company,c.gstin,c.AADHAARID,c.VOTERID,c.DL,c.PANNO,c.PASSPORTID,c.ADDRESSLINE1,c.ADDRESSFOR,c.ADDRESSTYPE,a.CREATETIME,a.UPDATETIME,a.TOTAL "+
          " ,c.city,c.state,c.COUNTRY,c.zipcode,d.USER_ID AS CUSER_ID,d.LOGON_ID1 AS CLOGON_ID1,e.FIRSTNAME as CFIRSTNAME,e.LASTNAME as CLASTNAME from orders a "+
           " join address c on c.address_id=a.address_id and c.member_id=a.member_id_for "+
           " join user d on d.USER_ID=a.member_id join address e on e.member_id=d.USER_ID "+
           " where c.member_id="+sess.user_id+" and a.status='"+status+"' order by a.CREATETIME desc limit 10";
        }else if(sess.user_type =='SE'){
          orderSQL="select a.order_id,a.status,a.MEMBER_ID,a.MEMBER_ID_FOR,c.FIRSTNAME,c.LASTNAME,c.EMAIL1,c.MOBILE1,c.MOBILE1CODE,c.PHONE1,"+
          " c.company,c.gstin,c.AADHAARID,c.VOTERID,c.DL,c.PANNO,c.PASSPORTID,c.ADDRESSLINE1,c.ADDRESSFOR,c.ADDRESSTYPE,a.CREATETIME,a.UPDATETIME,a.TOTAL "+
          " ,c.city,c.state,c.COUNTRY,c.zipcode,d.USER_ID AS CUSER_ID,d.LOGON_ID1 AS CLOGON_ID1,e.FIRSTNAME as CFIRSTNAME,e.LASTNAME as CLASTNAME from orders a "+
          " join address c on c.address_id=a.address_id and c.member_id=a.member_id_for "+
          " join user d on d.USER_ID=a.member_id_for join address e on e.member_id=d.USER_ID "+
          " where a.member_id="+sess.user_id+" and a.status='"+status+"' order by a.CREATETIME desc limit 10";
        }else{
          orderSQL="select a.order_id,a.status,a.MEMBER_ID,a.MEMBER_ID_FOR,c.FIRSTNAME,c.LASTNAME,c.EMAIL1,c.MOBILE1,c.MOBILE1CODE,c.PHONE1,"+
         " c.company,c.gstin,c.AADHAARID,c.VOTERID,c.DL,c.PANNO,c.PASSPORTID,c.ADDRESSLINE1,c.ADDRESSFOR,c.ADDRESSTYPE,a.CREATETIME,a.UPDATETIME,a.TOTAL "+
         " ,c.city,c.state,c.COUNTRY,c.zipcode,d.USER_ID AS CUSER_ID,d.LOGON_ID1 AS CLOGON_ID1,e.FIRSTNAME as CFIRSTNAME,e.LASTNAME as CLASTNAME from orders a "+
          " join address c on c.address_id=a.address_id and c.member_id=a.member_id_for"+
          " join user d on d.USER_ID=a.member_id join address e on e.member_id=d.USER_ID  where a.status='"+status+"' order by a.CREATETIME desc limit 10";
        }
      }

      /* orders console. */
      router.post('/ordersFilter', function(req, res, next) {
        var sess=req.session;
        var startDate=req.body.startDate;
        var endDate=req.body.endDate;
        var startDate1=moment(startDate).format(format1);
        var endDate1=moment(endDate).format(format1);
        var orderSQ="";
        if(sess === undefined){
          return res.redirect('/login');
        }else{
          if(sess.user_type !='HOD' && sess.user_type !='A' && sess.user_type !='DT' && sess.user_type !='DL'
              && sess.user_type !='SE'){
            return res.redirect('/login');
          }else{
            if(sess.user_type =='DT' || sess.user_type =='DL'){
               orderSQL="select a.order_id,a.status,a.MEMBER_ID,a.MEMBER_ID_FOR,c.FIRSTNAME,c.LASTNAME,c.EMAIL1,c.MOBILE1,c.MOBILE1CODE,c.PHONE1,"+
              " c.company,c.gstin,c.AADHAARID,c.VOTERID,c.DL,c.PANNO,c.PASSPORTID,c.ADDRESSLINE1,c.ADDRESSFOR,c.ADDRESSTYPE,a.CREATETIME,a.UPDATETIME,a.TOTAL "+
              " ,c.city,c.state,c.COUNTRY,c.zipcode,d.USER_ID AS CUSER_ID,d.LOGON_ID1 AS CLOGON_ID1,e.FIRSTNAME as CFIRSTNAME,e.LASTNAME as CLASTNAME from orders a "+
               " join address c on c.address_id=a.address_id and c.member_id=a.member_id_for "+
               " join user d on d.USER_ID=a.member_id join address e on e.member_id=d.USER_ID "+
               " where c.member_id="+sess.user_id+" WHERE a.CREATETIME BETWEEN '"+startDate1+"' AND '"+endDate1+"' order by a.CREATETIME desc limit 10";
            }else if(sess.user_type =='SE'){
              orderSQL="select a.order_id,a.status,a.MEMBER_ID,a.MEMBER_ID_FOR,c.FIRSTNAME,c.LASTNAME,c.EMAIL1,c.MOBILE1,c.MOBILE1CODE,c.PHONE1,"+
              " c.company,c.gstin,c.AADHAARID,c.VOTERID,c.DL,c.PANNO,c.PASSPORTID,c.ADDRESSLINE1,c.ADDRESSFOR,c.ADDRESSTYPE,a.CREATETIME,a.UPDATETIME,a.TOTAL "+
              " ,c.city,c.state,c.COUNTRY,c.zipcode,d.USER_ID AS CUSER_ID,d.LOGON_ID1 AS CLOGON_ID1,e.FIRSTNAME as CFIRSTNAME,e.LASTNAME as CLASTNAME from orders a "+
              " join address c on c.address_id=a.address_id and c.member_id=a.member_id_for "+
              " join user d on d.USER_ID=a.member_id_for join address e on e.member_id=d.USER_ID "+
              " where a.member_id="+sess.user_id+" WHERE a.CREATETIME BETWEEN '"+startDate1+"' AND '"+endDate1+"' order by a.CREATETIME desc limit 10";
            }else{
              orderSQL="select a.order_id,a.status,a.MEMBER_ID,a.MEMBER_ID_FOR,c.FIRSTNAME,c.LASTNAME,c.EMAIL1,c.MOBILE1,c.MOBILE1CODE,c.PHONE1,"+
             " c.company,c.gstin,c.AADHAARID,c.VOTERID,c.DL,c.PANNO,c.PASSPORTID,c.ADDRESSLINE1,c.ADDRESSFOR,c.ADDRESSTYPE,a.CREATETIME,a.UPDATETIME,a.TOTAL "+
             " ,c.city,c.state,c.COUNTRY,c.zipcode,d.USER_ID AS CUSER_ID,d.LOGON_ID1 AS CLOGON_ID1,e.FIRSTNAME as CFIRSTNAME,e.LASTNAME as CLASTNAME from orders a "+
              " join address c on c.address_id=a.address_id and c.member_id=a.member_id_for"+
              " join user d on d.USER_ID=a.member_id join address e on e.member_id=d.USER_ID WHERE a.CREATETIME BETWEEN '"+startDate1+"' AND '"+endDate1+"' order by a.CREATETIME desc limit 10";
            }
             db.query(orderSQL, function(err,result) {
                 if (err) {
                   throw err;
                   return res.redirect('/login');
                 }
                  res.render('_orders',{orders:result,userId:sess.user_id,userType:sess.user_type,moment:moment,username:sess.username,userImg:sess.user_img});
               });
          }
        }
      });

       db.query(orderSQL, function(err,result) {
           if (err) {
             throw err;
             return res.redirect('/login');
           }
            res.render('_orders',{orders:result,userId:sess.user_id,userType:sess.user_type,moment:moment,username:sess.username,userImg:sess.user_img});
         });
    }
  }
});


/* orders console. */
router.get('/orders', function(req, res, next) {
  var sess=req.session;
  var orderSQ="";
  if(sess === undefined){
    return res.redirect('/login');
  }else{
    if(sess.user_type !='HOD' && sess.user_type !='A' && sess.user_type !='DT' && sess.user_type !='DL'
        && sess.user_type !='SE'){
      return res.redirect('/login');
    }else{
      if(sess.user_type =='DT' || sess.user_type =='DL'){
         orderSQL="select a.order_id,a.status,a.MEMBER_ID,a.MEMBER_ID_FOR,c.FIRSTNAME,c.LASTNAME,c.EMAIL1,c.MOBILE1,c.MOBILE1CODE,c.PHONE1,"+
        " c.company,c.gstin,c.AADHAARID,c.VOTERID,c.DL,c.PANNO,c.PASSPORTID,c.ADDRESSLINE1,c.ADDRESSFOR,c.ADDRESSTYPE,a.CREATETIME,a.UPDATETIME,a.TOTAL "+
        " ,c.city,c.state,c.COUNTRY,c.zipcode,d.USER_ID AS CUSER_ID,d.LOGON_ID1 AS CLOGON_ID1,e.FIRSTNAME as CFIRSTNAME,e.LASTNAME as CLASTNAME from orders a "+
         " join address c on c.address_id=a.address_id and c.member_id=a.member_id_for "+
         " join user d on d.USER_ID=a.member_id join address e on e.member_id=d.USER_ID "+
         " where c.member_id="+sess.user_id+" order by a.CREATETIME desc limit 10";
      }else if(sess.user_type =='SE'){
        orderSQL="select a.order_id,a.status,a.MEMBER_ID,a.MEMBER_ID_FOR,c.FIRSTNAME,c.LASTNAME,c.EMAIL1,c.MOBILE1,c.MOBILE1CODE,c.PHONE1,"+
        " c.company,c.gstin,c.AADHAARID,c.VOTERID,c.DL,c.PANNO,c.PASSPORTID,c.ADDRESSLINE1,c.ADDRESSFOR,c.ADDRESSTYPE,a.CREATETIME,a.UPDATETIME,a.TOTAL "+
        " ,c.city,c.state,c.COUNTRY,c.zipcode,d.USER_ID AS CUSER_ID,d.LOGON_ID1 AS CLOGON_ID1,e.FIRSTNAME as CFIRSTNAME,e.LASTNAME as CLASTNAME from orders a "+
        " join address c on c.address_id=a.address_id and c.member_id=a.member_id_for "+
        " join user d on d.USER_ID=a.member_id_for join address e on e.member_id=d.USER_ID "+
        " where a.member_id="+sess.user_id+" order by a.CREATETIME desc limit 10";
      }else{
        orderSQL="select a.order_id,a.status,a.MEMBER_ID,a.MEMBER_ID_FOR,c.FIRSTNAME,c.LASTNAME,c.EMAIL1,c.MOBILE1,c.MOBILE1CODE,c.PHONE1,"+
       " c.company,c.gstin,c.AADHAARID,c.VOTERID,c.DL,c.PANNO,c.PASSPORTID,c.ADDRESSLINE1,c.ADDRESSFOR,c.ADDRESSTYPE,a.CREATETIME,a.UPDATETIME,a.TOTAL "+
       " ,c.city,c.state,c.COUNTRY,c.zipcode,d.USER_ID AS CUSER_ID,d.LOGON_ID1 AS CLOGON_ID1,e.FIRSTNAME as CFIRSTNAME,e.LASTNAME as CLASTNAME from orders a "+
        " join address c on c.address_id=a.address_id and c.member_id=a.member_id_for"+
        " join user d on d.USER_ID=a.member_id join address e on e.member_id=d.USER_ID order by a.CREATETIME desc limit 10";
      }
       db.query(orderSQL, function(err,result) {
           if (err) {
             throw err;
             return res.redirect('/login');
           }
            res.render('_orders',{orders:result,userId:sess.user_id,userType:sess.user_type,moment:moment,username:sess.username,userImg:sess.user_img});
         });
    }
  }
});

/* payment status */
router.get('/order_payment_status', function(req, res, next) {
  var sess=req.session;
  var orderSQ="";
  if(sess === undefined){
    return res.redirect('/login');
  }else{
    if(sess.user_type !='HOD' && sess.user_type !='A' && sess.user_type !='DT' && sess.user_type !='DL'
        && sess.user_type !='SE'){
      return res.redirect('/login');
    }else{
      if(sess.user_type =='DT' || sess.user_type =='DL'){
         orderSQL="select a.order_id,a.status,a.MEMBER_ID,a.MEMBER_ID_FOR,a.PAYMENT_DUE_DAYS_COUNT,a.PAYMENT_CLEARANCE_STATUS,a.UPDATETIME, c.FIRSTNAME,c.LASTNAME,c.EMAIL1,c.MOBILE1,c.MOBILE1CODE,c.PHONE1,"+
        " c.company,c.gstin,c.AADHAARID,c.VOTERID,c.DL,c.PANNO,c.PASSPORTID,c.ADDRESSLINE1,c.ADDRESSFOR,c.ADDRESSTYPE,a.CREATETIME,a.UPDATETIME,a.TOTAL "+
        " ,c.city,c.state,c.COUNTRY,c.zipcode,d.USER_ID AS CUSER_ID,d.LOGON_ID1 AS CLOGON_ID1,e.FIRSTNAME as CFIRSTNAME,e.LASTNAME as CLASTNAME from orders a "+
         " join address c on c.address_id=a.address_id and c.member_id=a.member_id_for "+
         " join user d on d.USER_ID=a.member_id join address e on e.member_id=d.USER_ID "+
         " where c.member_id="+sess.user_id+" and a.STATUS = 'D' order by a.CREATETIME desc";
      }else if(sess.user_type =='SE'){
        orderSQL="select a.order_id,a.status,a.MEMBER_ID,a.MEMBER_ID_FOR,a.PAYMENT_DUE_DAYS_COUNT,a.PAYMENT_CLEARANCE_STATUS,a.UPDATETIME,c.FIRSTNAME,c.LASTNAME,c.EMAIL1,c.MOBILE1,c.MOBILE1CODE,c.PHONE1,"+
        " c.company,c.gstin,c.AADHAARID,c.VOTERID,c.DL,c.PANNO,c.PASSPORTID,c.ADDRESSLINE1,c.ADDRESSFOR,c.ADDRESSTYPE,a.CREATETIME,a.UPDATETIME,a.TOTAL "+
        " ,c.city,c.state,c.COUNTRY,c.zipcode,d.USER_ID AS CUSER_ID,d.LOGON_ID1 AS CLOGON_ID1,e.FIRSTNAME as CFIRSTNAME,e.LASTNAME as CLASTNAME from orders a "+
        " join address c on c.address_id=a.address_id and c.member_id=a.member_id_for "+
        " join user d on d.USER_ID=a.member_id_for join address e on e.member_id=d.USER_ID "+
        " where a.member_id="+sess.user_id+" and a.STATUS = 'D' order by a.CREATETIME desc";
      }else{
        orderSQL="select a.order_id,a.status,a.MEMBER_ID,a.MEMBER_ID_FOR, a.PAYMENT_DUE_DAYS_COUNT,a.PAYMENT_CLEARANCE_STATUS,a.UPDATETIME,c.FIRSTNAME,c.LASTNAME,c.EMAIL1,c.MOBILE1,c.MOBILE1CODE,c.PHONE1,"+
       " c.company,c.gstin,c.AADHAARID,c.VOTERID,c.DL,c.PANNO,c.PASSPORTID,c.ADDRESSLINE1,c.ADDRESSFOR,c.ADDRESSTYPE,a.CREATETIME,a.UPDATETIME,a.TOTAL "+
       " ,c.city,c.state,c.COUNTRY,c.zipcode,d.USER_ID AS CUSER_ID,d.LOGON_ID1 AS CLOGON_ID1,e.FIRSTNAME as CFIRSTNAME,e.LASTNAME as CLASTNAME from orders a "+
        " join address c on c.address_id=a.address_id and c.member_id=a.member_id_for"+
        " join user d on d.USER_ID=a.member_id join address e on e.member_id=d.USER_ID where a.STATUS = 'D' order by a.CREATETIME desc";
      }
       db.query(orderSQL, function(err,result) {
           if (err) {
             throw err;
             return res.redirect('/login');
           }
            res.render('_order_payment_status',{orders:result,userId:sess.user_id,userType:sess.user_type,moment:moment,username:sess.username,userImg:sess.user_img});
         });
    }
  }
});

router.post('/update_payment_order_status', function(req, res, next) {
  var sess = req.session;
  var orderId=req.body.orderId;
  var status=req.body.status;
  var order_payment_status = 0;
  if(status === 'P'){
    order_payment_status = 1;
  }

  if(sess === undefined){
    return res.redirect('/login');
  }else{
  var updateOrderSQL="update orders set PAYMENT_CLEARANCE_STATUS='"+order_payment_status+"',UPDATETIME=CURRENT_TIMESTAMP where order_id="+orderId+"";
  db.query(updateOrderSQL, function(err,result) {
    if (err) {
      throw err;
      return res.redirect('/login');
    }
    res.redirect('/order_payment_status');
  });
}
});

/* orders console. */
router.get('/orders/pageNo/:pageNo', function(req, res, next) {
  var sess=req.session;
  var pageNo=req.params.pageNo;
  var pagesize=10;
  var startPage=(pagesize*pageNo)+1;
  var endPage=pagesize;
  var orderSQ="";
  if(sess === undefined){
    return res.redirect('/login');
  }else{
    if(sess.user_type !='HOD' && sess.user_type !='A' && sess.user_type !='DT' && sess.user_type !='DL'
        && sess.user_type !='SE'){
      return res.redirect('/login');
    }else{
      if(sess.user_type =='DT' || sess.user_type =='DL'){
         orderSQL="select a.order_id,a.status,a.MEMBER_ID,a.MEMBER_ID_FOR,c.FIRSTNAME,c.LASTNAME,c.EMAIL1,c.MOBILE1,c.MOBILE1CODE,c.PHONE1,"+
        " c.company,c.gstin,c.AADHAARID,c.VOTERID,c.DL,c.PANNO,c.PASSPORTID,c.ADDRESSLINE1,c.ADDRESSFOR,c.ADDRESSTYPE,a.CREATETIME,a.UPDATETIME,a.TOTAL "+
        " ,c.city,c.state,c.COUNTRY,c.zipcode,d.USER_ID AS CUSER_ID,d.LOGON_ID1 AS CLOGON_ID1,e.FIRSTNAME as CFIRSTNAME,e.LASTNAME as CLASTNAME from orders a "+
         " join address c on c.address_id=a.address_id and c.member_id=a.member_id_for "+
         " join user d on d.USER_ID=a.member_id join address e on e.member_id=d.USER_ID "+
         " where c.member_id="+sess.user_id+" order by a.CREATETIME desc limit "+startPage+","+endPage+"";
      }else if(sess.user_type =='SE'){
        orderSQL="select a.order_id,a.status,a.MEMBER_ID,a.MEMBER_ID_FOR,c.FIRSTNAME,c.LASTNAME,c.EMAIL1,c.MOBILE1,c.MOBILE1CODE,c.PHONE1,"+
        " c.company,c.gstin,c.AADHAARID,c.VOTERID,c.DL,c.PANNO,c.PASSPORTID,c.ADDRESSLINE1,c.ADDRESSFOR,c.ADDRESSTYPE,a.CREATETIME,a.UPDATETIME,a.TOTAL "+
        " ,c.city,c.state,c.COUNTRY,c.zipcode,d.USER_ID AS CUSER_ID,d.LOGON_ID1 AS CLOGON_ID1,e.FIRSTNAME as CFIRSTNAME,e.LASTNAME as CLASTNAME from orders a "+
        " join address c on c.address_id=a.address_id and c.member_id=a.member_id_for "+
        " join user d on d.USER_ID=a.member_id_for join address e on e.member_id=d.USER_ID "+
        " where a.member_id="+sess.user_id+" order by a.CREATETIME desc limit "+startPage+","+endPage+"";
      }else{
        orderSQL="select a.order_id,a.status,a.MEMBER_ID,a.MEMBER_ID_FOR,c.FIRSTNAME,c.LASTNAME,c.EMAIL1,c.MOBILE1,c.MOBILE1CODE,c.PHONE1,"+
       " c.company,c.gstin,c.AADHAARID,c.VOTERID,c.DL,c.PANNO,c.PASSPORTID,c.ADDRESSLINE1,c.ADDRESSFOR,c.ADDRESSTYPE,a.CREATETIME,a.UPDATETIME,a.TOTAL "+
       " ,c.city,c.state,c.COUNTRY,c.zipcode,d.USER_ID AS CUSER_ID,d.LOGON_ID1 AS CLOGON_ID1,e.FIRSTNAME as CFIRSTNAME,e.LASTNAME as CLASTNAME from orders a "+
        " join address c on c.address_id=a.address_id and c.member_id=a.member_id_for"+
        " join user d on d.USER_ID=a.member_id join address e on e.member_id=d.USER_ID order by a.CREATETIME desc limit "+startPage+","+endPage+"";
      }
       db.query(orderSQL, function(err,result) {
           if (err) {
             throw err;
             return res.redirect('/login');
           }
            res.render('_orders',{orders:result,userId:sess.user_id,userType:sess.user_type,moment:moment,username:sess.username,userImg:sess.user_img});
         });
    }
  }
});


/* dashboard console. */
router.get('/users_se', function(req, res, next) {
  var sess=req.session;
  var usersSQL="";
  if(sess === undefined){
    return res.redirect('/login');
  }else{
    if(sess.user_type !='HOD' && sess.user_type !='A' && sess.user_type !='DT' && sess.user_type !='DL'
        && sess.user_type !='SE'){
      return res.redirect('/login');
    }else{
      if(sess.user_type =='DT'){
        usersSQL="select a.USER_ID,a.LOGON_ID1,a.STATUS,c.IDENTIFIER,d.FIRSTNAME,d.LASTNAME,d.EMAIL1,d.MOBILE1,d.PHONE1,concat(d.ADDRESSLINE1,',',d.city,',',d.state,',',d.country,',',d.zipcode) as ADDRESS,d.ZIPCODE,d.AADHAARID,d.PANNO,d.gstin,d.DL,d.company "+
        " from user a join  usrrole b on b.USER_ID=a.USER_ID join role c on c.ROLE_ID=b.ROLE_ID "+
        " join address d on d.MEMBER_ID=a.USER_ID join usrrel e on e.USER_ID_TO=a.USER_ID"+
        " join user f on f.USER_ID=e.USER_ID_FROM join usrrole g on g.USER_ID=f.USER_ID"+
        " join role h on h.ROLE_ID=g.ROLE_ID WHERE c.IDENTIFIER='SE' AND h.IDENTIFIER='DT' AND f.USER_ID="+sess.user_id+" limit 10";
      }else if(sess.user_type =='DL'){
        usersSQL="select a.USER_ID,a.LOGON_ID1,a.STATUS,c.IDENTIFIER,d.FIRSTNAME,d.LASTNAME,d.EMAIL1,d.MOBILE1,d.PHONE1,concat(d.ADDRESSLINE1,',',d.city,',',d.state,',',d.country,',',d.zipcode) as ADDRESS,d.ZIPCODE,d.AADHAARID,d.PANNO,d.gstin,d.DL,d.company "+
        " from user a join  usrrole b on b.USER_ID=a.USER_ID join role c on c.ROLE_ID=b.ROLE_ID "+
        " join address d on d.MEMBER_ID=a.USER_ID join usrrel e on e.USER_ID_TO=a.USER_ID"+
        " join user f on f.USER_ID=e.USER_ID_FROM join usrrole g on g.USER_ID=f.USER_ID"+
        " join role h on h.ROLE_ID=g.ROLE_ID WHERE c.IDENTIFIER='SE' AND h.IDENTIFIER='DL' AND f.USER_ID="+sess.user_id+" limit 10";
      }else{
        usersSQL="select a.USER_ID,a.LOGON_ID1,a.STATUS,c.IDENTIFIER,d.FIRSTNAME,d.LASTNAME,d.EMAIL1,d.MOBILE1,d.PHONE1,concat(d.city,',',d.state,',',d.country,',',d.zipcode) as ADDRESS from user a join "+
       " usrrole b on b.USER_ID=a.USER_ID join role c on c.ROLE_ID=b.ROLE_ID join address d on d.MEMBER_ID=a.USER_ID WHERE c.IDENTIFIER='SE' limit 10";
      }
           db.query(usersSQL, function(err,result) {
        if (err) {
          throw err;
          return res.redirect('/login');
        }
         res.render('_se_list',{users:result,userId:sess.user_id,userType:sess.user_type,username:sess.username,userImg:sess.user_img});
      });
    }
  }
});




/* dashboard console. */
router.get('/users_se/pageNo/:pageNo', function(req, res, next) {
  var sess=req.session;
  var pageNo=req.params.pageNo;
  var pagesize=10;
  var startPage=(pagesize*pageNo)+1;
  var endPage=pagesize;
  var usersSQL="";
  if(sess === undefined){
    return res.redirect('/login');
  }else{
    if(sess.user_type !='HOD' && sess.user_type !='A' && sess.user_type !='DT' && sess.user_type !='DL'
        && sess.user_type !='SE'){
      return res.redirect('/login');
    }else{
      if(sess.user_type =='DT'){
        usersSQL="select a.USER_ID,a.LOGON_ID1,a.STATUS,c.IDENTIFIER,d.FIRSTNAME,d.LASTNAME,d.EMAIL1,d.MOBILE1,d.PHONE1,concat(d.ADDRESSLINE1,',',d.city,',',d.state,',',d.country,',',d.zipcode) as ADDRESS,d.ZIPCODE,d.AADHAARID,d.PANNO,d.gstin,d.DL,d.company "+
        " from user a join  usrrole b on b.USER_ID=a.USER_ID join role c on c.ROLE_ID=b.ROLE_ID "+
        " join address d on d.MEMBER_ID=a.USER_ID join usrrel e on e.USER_ID_TO=a.USER_ID"+
        " join user f on f.USER_ID=e.USER_ID_FROM join usrrole g on g.USER_ID=f.USER_ID"+
        " join role h on h.ROLE_ID=g.ROLE_ID WHERE c.IDENTIFIER='SE' AND h.IDENTIFIER='DT' AND f.USER_ID="+sess.user_id+" limit "+startPage+","+endPage+"";
      }else if(sess.user_type =='DL'){
        usersSQL="select a.USER_ID,a.LOGON_ID1,a.STATUS,c.IDENTIFIER,d.FIRSTNAME,d.LASTNAME,d.EMAIL1,d.MOBILE1,d.PHONE1,concat(d.ADDRESSLINE1,',',d.city,',',d.state,',',d.country,',',d.zipcode) as ADDRESS,d.ZIPCODE,d.AADHAARID,d.PANNO,d.gstin,d.DL,d.company "+
        " from user a join  usrrole b on b.USER_ID=a.USER_ID join role c on c.ROLE_ID=b.ROLE_ID "+
        " join address d on d.MEMBER_ID=a.USER_ID join usrrel e on e.USER_ID_TO=a.USER_ID"+
        " join user f on f.USER_ID=e.USER_ID_FROM join usrrole g on g.USER_ID=f.USER_ID"+
        " join role h on h.ROLE_ID=g.ROLE_ID WHERE c.IDENTIFIER='SE' AND h.IDENTIFIER='DL' AND f.USER_ID="+sess.user_id+" limit "+startPage+","+endPage+"";
      }else{
        usersSQL="select a.USER_ID,a.LOGON_ID1,a.STATUS,c.IDENTIFIER,d.FIRSTNAME,d.LASTNAME,d.EMAIL1,d.MOBILE1,d.PHONE1,concat(d.city,',',d.state,',',d.country,',',d.zipcode) as ADDRESS from user a join "+
       " usrrole b on b.USER_ID=a.USER_ID join role c on c.ROLE_ID=b.ROLE_ID join address d on d.MEMBER_ID=a.USER_ID WHERE c.IDENTIFIER='SE' limit "+startPage+","+endPage+"";
      }
           db.query(usersSQL, function(err,result) {
        if (err) {
          throw err;
          return res.redirect('/login');
        }
         res.render('_se_list',{users:result,userId:sess.user_id,userType:sess.user_type,username:sess.username,userImg:sess.user_img});
      });
    }
  }
});

/* dashboard console. */
router.post('/users_seByName', function(req, res, next) {
  var sess=req.session;
  var name=req.body.name;
  var usersSQL="";
  if(sess === undefined){
    return res.redirect('/login');
  }else{
    if(sess.user_type !='HOD' && sess.user_type !='A' && sess.user_type !='DT' && sess.user_type !='DL'
        && sess.user_type !='SE'){
      return res.redirect('/login');
    }else{
      if(sess.user_type =='DT'){
        usersSQL="select a.USER_ID,a.LOGON_ID1,a.STATUS,c.IDENTIFIER,d.FIRSTNAME,d.LASTNAME,d.EMAIL1,d.MOBILE1,d.PHONE1,concat(d.ADDRESSLINE1,',',d.city,',',d.state,',',d.country,',',d.zipcode) as ADDRESS,d.ZIPCODE,d.AADHAARID,d.PANNO,d.gstin,d.DL,d.company "+
        " from user a join  usrrole b on b.USER_ID=a.USER_ID join role c on c.ROLE_ID=b.ROLE_ID "+
        " join address d on d.MEMBER_ID=a.USER_ID join usrrel e on e.USER_ID_TO=a.USER_ID"+
        " join user f on f.USER_ID=e.USER_ID_FROM join usrrole g on g.USER_ID=f.USER_ID"+
        " join role h on h.ROLE_ID=g.ROLE_ID WHERE c.IDENTIFIER='SE' AND h.IDENTIFIER='DT' AND f.USER_ID="+sess.user_id+" and d.FIRSTNAME LIKE '%"+name+"%'";
      }else if(sess.user_type =='DL'){
        usersSQL="select a.USER_ID,a.LOGON_ID1,a.STATUS,c.IDENTIFIER,d.FIRSTNAME,d.LASTNAME,d.EMAIL1,d.MOBILE1,d.PHONE1,concat(d.ADDRESSLINE1,',',d.city,',',d.state,',',d.country,',',d.zipcode) as ADDRESS,d.ZIPCODE,d.AADHAARID,d.PANNO,d.gstin,d.DL,d.company "+
        " from user a join  usrrole b on b.USER_ID=a.USER_ID join role c on c.ROLE_ID=b.ROLE_ID "+
        " join address d on d.MEMBER_ID=a.USER_ID join usrrel e on e.USER_ID_TO=a.USER_ID"+
        " join user f on f.USER_ID=e.USER_ID_FROM join usrrole g on g.USER_ID=f.USER_ID"+
        " join role h on h.ROLE_ID=g.ROLE_ID WHERE c.IDENTIFIER='SE' AND h.IDENTIFIER='DL' AND f.USER_ID="+sess.user_id+" and d.FIRSTNAME LIKE '%"+name+"%' limit 10";
      }else{
        usersSQL="select a.USER_ID,a.LOGON_ID1,a.STATUS,c.IDENTIFIER,d.FIRSTNAME,d.LASTNAME,d.EMAIL1,d.MOBILE1,d.PHONE1,concat(d.city,',',d.state,',',d.country,',',d.zipcode) as ADDRESS from user a join "+
       " usrrole b on b.USER_ID=a.USER_ID join role c on c.ROLE_ID=b.ROLE_ID join address d on d.MEMBER_ID=a.USER_ID WHERE c.IDENTIFIER='SE' and d.FIRSTNAME LIKE '%"+name+"%' limit 10";
      }
           db.query(usersSQL, function(err,result) {
        if (err) {
          throw err;
          return res.redirect('/login');
        }
         res.render('_se_list',{users:result,userId:sess.user_id,userType:sess.user_type,username:sess.username,userImg:sess.user_img});
      });
    }
  }
});

/* dashboard console. */
router.get('/users_dt', function(req, res, next) {
  var sess=req.session;
  var usersSQL="";
  if(sess === undefined){
    return res.redirect('/login');
  }else{
    if(sess.user_type !='HOD' && sess.user_type !='A' && sess.user_type !='DT' && sess.user_type !='DL'
        && sess.user_type !='SE'){
      return res.redirect('/login');
    }else{
      if(sess.user_type =='SE'){
        usersSQL="select a.USER_ID,a.LOGON_ID1,a.STATUS,c.IDENTIFIER,d.FIRSTNAME,d.LASTNAME,d.EMAIL1,d.MOBILE1,d.PHONE1,concat(d.ADDRESSLINE1,',',d.city,',',d.state,',',d.country,',',d.zipcode) as ADDRESS,d.ZIPCODE,d.AADHAARID,d.PANNO,d.gstin,d.DL,d.company "+
        " from user a join usrrole b on b.USER_ID=a.USER_ID join role c on "+
        " c.ROLE_ID=b.ROLE_ID join address d on d.MEMBER_ID=a.USER_ID "+
        " join usrrel e on e.USER_ID_FROM=a.USER_ID join user f on f.USER_ID=e.USER_ID_TO "+
        " join usrrole g on g.USER_ID=f.USER_ID join role h on h.ROLE_ID=g.ROLE_ID "+
        " WHERE c.IDENTIFIER='DT' AND h.IDENTIFIER='SE' AND f.USER_ID="+sess.user_id+" limit 10";
      }else{
        usersSQL="select a.USER_ID,a.LOGON_ID1,a.STATUS,c.IDENTIFIER,d.FIRSTNAME,d.LASTNAME,d.EMAIL1,d.MOBILE1,d.PHONE1,concat(d.ADDRESSLINE1,',',d.city,',',d.state,',',d.country,',',d.zipcode) as ADDRESS,d.ZIPCODE,d.AADHAARID,d.PANNO,d.gstin,d.DL,d.company from user a join "+
       " usrrole b on b.USER_ID=a.USER_ID join role c on c.ROLE_ID=b.ROLE_ID join address d on d.MEMBER_ID=a.USER_ID WHERE c.IDENTIFIER='DT' limit 10";
      }
           db.query(usersSQL, function(err,result) {
        if (err) {
          throw err;
          return res.redirect('/login');
        }
         res.render('_dt_list',{users:result,userId:sess.user_id,userType:sess.user_type,username:sess.username,userImg:sess.user_img});
      });
    }
  }
});

/* dashboard console. */
router.get('/users_dt/pageNo/:pageNo', function(req, res, next) {

  var sess=req.session;
  var pageNo=req.params.pageNo;
  var pagesize=10;
  var startPage=(pagesize*pageNo)+1;
  var endPage=pagesize;
  var usersSQL="";
  if(sess === undefined){
    return res.redirect('/login');
  }else{
    if(sess.user_type !='HOD' && sess.user_type !='A' && sess.user_type !='DT' && sess.user_type !='DL'
        && sess.user_type !='SE'){
      return res.redirect('/login');
    }else{
      if(sess.user_type =='SE'){
        usersSQL="select a.USER_ID,a.LOGON_ID1,a.STATUS,c.IDENTIFIER,d.FIRSTNAME,d.LASTNAME,d.EMAIL1,d.MOBILE1,d.PHONE1,concat(d.ADDRESSLINE1,',',d.city,',',d.state,',',d.country,',',d.zipcode) as ADDRESS,d.ZIPCODE,d.AADHAARID,d.PANNO,d.gstin,d.DL,d.company "+
        " from user a join usrrole b on b.USER_ID=a.USER_ID join role c on "+
        " c.ROLE_ID=b.ROLE_ID join address d on d.MEMBER_ID=a.USER_ID "+
        " join usrrel e on e.USER_ID_FROM=a.USER_ID join user f on f.USER_ID=e.USER_ID_TO "+
        " join usrrole g on g.USER_ID=f.USER_ID join role h on h.ROLE_ID=g.ROLE_ID "+
        " WHERE c.IDENTIFIER='DT' AND h.IDENTIFIER='SE' AND f.USER_ID="+sess.user_id+" limit "+startPage+","+endPage+"";
      }else{
        usersSQL="select a.USER_ID,a.LOGON_ID1,a.STATUS,c.IDENTIFIER,d.FIRSTNAME,d.LASTNAME,d.EMAIL1,d.MOBILE1,d.PHONE1,concat(d.ADDRESSLINE1,',',d.city,',',d.state,',',d.country,',',d.zipcode) as ADDRESS,d.ZIPCODE,d.AADHAARID,d.PANNO,d.gstin,d.DL,d.company from user a join "+
       " usrrole b on b.USER_ID=a.USER_ID join role c on c.ROLE_ID=b.ROLE_ID join address d on d.MEMBER_ID=a.USER_ID WHERE c.IDENTIFIER='DT' limit "+startPage+","+endPage+"";
      }
           db.query(usersSQL, function(err,result) {
        if (err) {
          throw err;
          return res.redirect('/login');
        }
         res.render('_dt_list',{users:result,userId:sess.user_id,userType:sess.user_type,username:sess.username,userImg:sess.user_img});
      });
    }
  }
});


/* dashboard console. */
router.post('/users_dtByName', function(req, res, next) {
  var sess=req.session;
  var name=req.body.name;
  var usersSQL="";
  if(sess === undefined){
    return res.redirect('/login');
  }else{
    if(sess.user_type !='HOD' && sess.user_type !='A' && sess.user_type !='DT' && sess.user_type !='DL'
        && sess.user_type !='SE'){
      return res.redirect('/login');
    }else{
      if(sess.user_type =='SE'){
        usersSQL="select a.USER_ID,a.LOGON_ID1,a.STATUS,c.IDENTIFIER,d.FIRSTNAME,d.LASTNAME,d.EMAIL1,d.MOBILE1,d.PHONE1,concat(d.ADDRESSLINE1,',',d.city,',',d.state,',',d.country,',',d.zipcode) as ADDRESS,d.ZIPCODE,d.AADHAARID,d.PANNO,d.gstin,d.DL,d.company "+
        " from user a join usrrole b on b.USER_ID=a.USER_ID join role c on "+
        " c.ROLE_ID=b.ROLE_ID join address d on d.MEMBER_ID=a.USER_ID "+
        " join usrrel e on e.USER_ID_FROM=a.USER_ID join user f on f.USER_ID=e.USER_ID_TO "+
        " join usrrole g on g.USER_ID=f.USER_ID join role h on h.ROLE_ID=g.ROLE_ID "+
        " WHERE c.IDENTIFIER='DT' AND h.IDENTIFIER='SE' AND f.USER_ID="+sess.user_id+" AND d.FIRSTNAME LIKE '%"+name+"%' limit 10";
      }else{
        usersSQL="select a.USER_ID,a.LOGON_ID1,a.STATUS,c.IDENTIFIER,d.FIRSTNAME,d.LASTNAME,d.EMAIL1,d.MOBILE1,d.PHONE1,concat(d.ADDRESSLINE1,',',d.city,',',d.state,',',d.country,',',d.zipcode) as ADDRESS,d.ZIPCODE,d.AADHAARID,d.PANNO,d.gstin,d.DL,d.company from user a join "+
       " usrrole b on b.USER_ID=a.USER_ID join role c on c.ROLE_ID=b.ROLE_ID join address d on d.MEMBER_ID=a.USER_ID WHERE c.IDENTIFIER='DT' AND d.FIRSTNAME LIKE '%"+name+"%' limit 10";
      }
           db.query(usersSQL, function(err,result) {
        if (err) {
          throw err;
          return res.redirect('/login');
        }
         res.render('_dt_list',{users:result,userId:sess.user_id,userType:sess.user_type,username:sess.username,userImg:sess.user_img});
      });
    }
  }
});


/* dashboard console. */
router.get('/users_dl', function(req, res, next) {
  var sess=req.session;
  var usersSQL="";
  if(sess === undefined){
    return res.redirect('/login');
  }else{
    if(sess.user_type !='HOD' && sess.user_type !='A' && sess.user_type !='DT' && sess.user_type !='DL'
        && sess.user_type !='SE'){
      return res.redirect('/login');
    }else{
      if(sess.user_type =='SE'){
        usersSQL="select a.USER_ID,a.LOGON_ID1,a.STATUS,c.IDENTIFIER,d.FIRSTNAME,d.LASTNAME,d.EMAIL1,d.MOBILE1,d.PHONE1,concat(d.ADDRESSLINE1,',',d.city,',',d.state,',',d.country,',',d.zipcode) as ADDRESS,d.ZIPCODE,d.AADHAARID,d.PANNO,d.gstin,d.DL,d.company "+
        " from user a join usrrole b on b.USER_ID=a.USER_ID join role c on "+
        " c.ROLE_ID=b.ROLE_ID join address d on d.MEMBER_ID=a.USER_ID "+
        " join usrrel e on e.USER_ID_FROM=a.USER_ID join user f on f.USER_ID=e.USER_ID_TO "+
        " join usrrole g on g.USER_ID=f.USER_ID join role h on h.ROLE_ID=g.ROLE_ID "+
        " WHERE c.IDENTIFIER='DL' AND h.IDENTIFIER='SE' AND f.USER_ID="+sess.user_id+" limit 10";
      }else{
        usersSQL="select a.USER_ID,a.LOGON_ID1,a.STATUS,c.IDENTIFIER,d.FIRSTNAME,d.LASTNAME,d.EMAIL1,d.MOBILE1,d.PHONE1,concat(d.ADDRESSLINE1,',',d.city,',',d.state,',',d.country,',',d.zipcode) as ADDRESS,d.ZIPCODE,d.AADHAARID,d.PANNO,d.gstin,d.DL,d.company from user a join "+
       " usrrole b on b.USER_ID=a.USER_ID join role c on c.ROLE_ID=b.ROLE_ID join address d on d.MEMBER_ID=a.USER_ID WHERE c.IDENTIFIER='DL' limit 10";
      }
        db.query(usersSQL, function(err,result) {
        if (err) {
          throw err;
          return res.redirect('/login');
        }
         res.render('_dl_list',{users:result,userId:sess.user_id,userType:sess.user_type,username:sess.username,userImg:sess.user_img});
      });
    }
  }
});

/* dashboard console. */
router.get('/users_dl/pageNo/:pageNo', function(req, res, next) {
  var sess=req.session;
  var pageNo=req.params.pageNo;
 var pagesize=10;
 var startPage=(pagesize*pageNo)+1;
 var endPage=pagesize;
  var usersSQL="";
  if(sess === undefined){
    return res.redirect('/login');
  }else{
    if(sess.user_type !='HOD' && sess.user_type !='A' && sess.user_type !='DT' && sess.user_type !='DL'
        && sess.user_type !='SE'){
      return res.redirect('/login');
    }else{
      if(sess.user_type =='SE'){
        usersSQL="select a.USER_ID,a.LOGON_ID1,a.STATUS,c.IDENTIFIER,d.FIRSTNAME,d.LASTNAME,d.EMAIL1,d.MOBILE1,d.PHONE1,concat(d.ADDRESSLINE1,',',d.city,',',d.state,',',d.country,',',d.zipcode) as ADDRESS,d.ZIPCODE,d.AADHAARID,d.PANNO,d.gstin,d.DL,d.company "+
        " from user a join usrrole b on b.USER_ID=a.USER_ID join role c on "+
        " c.ROLE_ID=b.ROLE_ID join address d on d.MEMBER_ID=a.USER_ID "+
        " join usrrel e on e.USER_ID_FROM=a.USER_ID join user f on f.USER_ID=e.USER_ID_TO "+
        " join usrrole g on g.USER_ID=f.USER_ID join role h on h.ROLE_ID=g.ROLE_ID "+
        " WHERE c.IDENTIFIER='DL' AND h.IDENTIFIER='SE' AND f.USER_ID="+sess.user_id+" limit "+startPage+","+endPage+"";
      }else{
        usersSQL="select a.USER_ID,a.LOGON_ID1,a.STATUS,c.IDENTIFIER,d.FIRSTNAME,d.LASTNAME,d.EMAIL1,d.MOBILE1,d.PHONE1,concat(d.ADDRESSLINE1,',',d.city,',',d.state,',',d.country,',',d.zipcode) as ADDRESS,d.ZIPCODE,d.AADHAARID,d.PANNO,d.gstin,d.DL,d.company from user a join "+
       " usrrole b on b.USER_ID=a.USER_ID join role c on c.ROLE_ID=b.ROLE_ID join address d on d.MEMBER_ID=a.USER_ID WHERE c.IDENTIFIER='DL' limit "+startPage+","+endPage+"";
      }
        db.query(usersSQL, function(err,result) {
        if (err) {
          throw err;
          return res.redirect('/login');
        }
         res.render('_dl_list',{users:result,userId:sess.user_id,userType:sess.user_type,username:sess.username,userImg:sess.user_img});
      });
    }
  }
});


/* dashboard console. */
router.post('/users_dlByName', function(req, res, next) {
  var sess=req.session;
  var name=req.body.name;
  var usersSQL="";
  if(sess === undefined){
    return res.redirect('/login');
  }else{
    if(sess.user_type !='HOD' && sess.user_type !='A' && sess.user_type !='DT' && sess.user_type !='DL'
        && sess.user_type !='SE'){
      return res.redirect('/login');
    }else{
      if(sess.user_type =='SE'){
        usersSQL="select a.USER_ID,a.LOGON_ID1,a.STATUS,c.IDENTIFIER,d.FIRSTNAME,d.LASTNAME,d.EMAIL1,d.MOBILE1,d.PHONE1,concat(d.ADDRESSLINE1,',',d.city,',',d.state,',',d.country,',',d.zipcode) as ADDRESS,d.ZIPCODE,d.AADHAARID,d.PANNO,d.gstin,d.DL,d.company "+
        " from user a join usrrole b on b.USER_ID=a.USER_ID join role c on "+
        " c.ROLE_ID=b.ROLE_ID join address d on d.MEMBER_ID=a.USER_ID "+
        " join usrrel e on e.USER_ID_FROM=a.USER_ID join user f on f.USER_ID=e.USER_ID_TO "+
        " join usrrole g on g.USER_ID=f.USER_ID join role h on h.ROLE_ID=g.ROLE_ID "+
        " WHERE c.IDENTIFIER='DL' AND h.IDENTIFIER='SE' AND f.USER_ID="+sess.user_id+" AND d.FIRSTNAME LIKE '%"+name+"%' limit 10";
      }else{
        usersSQL="select a.USER_ID,a.LOGON_ID1,a.STATUS,c.IDENTIFIER,d.FIRSTNAME,d.LASTNAME,d.EMAIL1,d.MOBILE1,d.PHONE1,concat(d.ADDRESSLINE1,',',d.city,',',d.state,',',d.country,',',d.zipcode) as ADDRESS,d.ZIPCODE,d.AADHAARID,d.PANNO,d.gstin,d.DL,d.company from user a join "+
       " usrrole b on b.USER_ID=a.USER_ID join role c on c.ROLE_ID=b.ROLE_ID join address d on d.MEMBER_ID=a.USER_ID WHERE c.IDENTIFIER='DL' AND d.FIRSTNAME LIKE '%"+name+"%' limit 10";
      }
        db.query(usersSQL, function(err,result) {
        if (err) {
          throw err;
          return res.redirect('/login');
        }
         res.render('_dl_list',{users:result,userId:sess.user_id,userType:sess.user_type,username:sess.username,userImg:sess.user_img});
      });
    }
  }
});

/* dashboard console. */
router.get('/login', function(req, res, next) {
  res.render('_login');
});
/* dashboard console. */
router.get('/login_se', function(req, res, next) {
  res.render('_se_login_moderator');
});

/* dashboard console. */
router.get('/logout', function(req, res, next) {
  if(req.session !== undefined){
    req.session.destroy(function(){
        //res.render('console_login');
        return res.redirect('/login');
      });
  }
});
/* error. */
router.get('/error', function(req, res, next) {
  var sess=req.session;
  res.render('_error',{error:'',userId:sess.user_id,userType:sess.user_type,username:sess.username,userImg:sess.user_img});
});


/**Place order*/
router.post('/addToCart', function(req, res, next) {
  var sess=req.session;
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

  if(sess === undefined){
  return res.redirect('/');
  }else{
    if(sess.user_type !='DT' && sess.user_type !='DL'
        && sess.user_type !='SE'){
    return res.redirect('/');
    }else{

      var usrSQL="select concat(FIRSTNAME,' ',LASTNAME) AS NAME,EMAIL1,MOBILE1 from address where MEMBER_ID="+sess.user_id+"";

      db.query(usrSQL, function(err,result1) {
        if (err)
       {
        throw err;
        return res.redirect('/');
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
        return res.redirect('/');
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
        return res.redirect('/');
       }
        result3.forEach(function(element){
            stotal=element.PRICE;
          });
          var c_count=1;
          if(sess.cart_count != null){
            c_count=sess.cart_count+1;
          }
          if(stotal == undefined){
            stotal=0;
          }

          var ftotal=total+stotal;
          var ftotalwithTax=total+(total * 0.175);
          var cartSQL="insert into cart(member_id,count,status) value("+sess.user_id+","+c_count+",'P') ON "+
          " DUPLICATE KEY UPDATE count="+c_count+"";
          var cartdtlSQL="insert into cartdtl(cart_id,member_id,product_id,pspare_id,QTY,STATUS,field1,field2,PSPARE_PRICE,TOTAL) "+
          " value((select CART_ID from cart WHERE MEMBER_ID="+sess.user_id+" AND STATUS='P'),"+sess.user_id+","+pid+",'"+spid+"',"+qty+",'P','"+total+"',"+
          " '"+stotal+"',(select GROUP_CONCAT(concat(PSPARE_ID,'/',PRICE) SEPARATOR ',') from pspare where PSPARE_ID IN ("+spid+")),'"+ftotal+"')";
        db.query(cartSQL, function(err,result) {
            if (err)
           {
            throw err;
            return res.redirect('/');
           }

           db.query(cartdtlSQL, function(err,result4) {
             if (err)
            {
             throw err;
             return res.redirect('/');
            }
            var updateCartSQL=" UPDATE cart SET TOTAL=(select SUM(TOTAL)"+
            "+(SUM(TOTAL)*0.175) FROM cartdtl "+
            " WHERE MEMBER_ID="+sess.user_id+" AND STATUS='P'), FIELD1=(select SUM(TOTAL) FROM cartdtl "+
            " WHERE MEMBER_ID="+sess.user_id+" AND STATUS='P'), FIELD2=(select (SUM(TOTAL)*0.175) FROM cartdtl "+
            " WHERE MEMBER_ID="+sess.user_id+" AND STATUS='P') "+
            " WHERE MEMBER_ID="+sess.user_id+" AND STATUS='P'";
            db.query(updateCartSQL, function(err,result5) {
              if (err)
             {
              throw err;
              return res.redirect('/');
             }

             return res.redirect('/cart');
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



/**Place order*/
router.post('/place_order', function(req, res, next) {
  var sess=req.session;
  var pid=req.body.prdId;
  var qty=req.body.qty;
  var price=req.body.price;
  var total=req.body.total;
  var username;
  var email;
  var mobile;
  var productname;
  var producturl;
  var productpdf;

  if(sess === undefined){
  return res.redirect('/');
  }else{
    if(sess.user_type !='DT' && sess.user_type !='DL'
        && sess.user_type !='SE'){
    return res.redirect('/');
    }else{

      var usrSQL="select concat(FIRSTNAME,' ',LASTNAME) AS NAME,EMAIL1,MOBILE1 from address where MEMBER_ID="+sess.user_id+"";

      db.query(usrSQL, function(err,result) {
        if (err)
       {
        throw err;
        return res.redirect('/');
       }
        result.forEach(function(element){
            username=element.NAME;
            email=element.EMAIL1;
            mobile=element.MOBILE1;
          });

      });

      var prdSQL="select NAME,THUMBNAIL from product where product_id="+pid+"";

      db.query(prdSQL, function(err,result) {
        if (err)
       {
        throw err;
        return res.redirect('/');
       }
        result.forEach(function(element){
            productname=element.NAME;
            producturl=const_data.cdn_image_url+element.THUMBNAIL;
            productpdf='';
          });

      });

      var orderSQL="insert into orders(product_id,address_id,member_id,status) value("+pid+","+
      "(select address_id from address where MEMBER_ID="+sess.user_id+" AND ADDRESSFOR='SB'),"+sess.user_id+",'P')";
      var orderitemSQL="insert into orderitem (order_id,product_id,address_id,price,quantity,total,status,member_id)"+
      " value((select order_id from orders order by order_id desc limit 1),"+pid+","+
      "(select address_id from address where MEMBER_ID="+sess.user_id+" AND ADDRESSFOR='SB'),'"+price+"','"+qty+"','"+total+"','P',"+sess.user_id+")"
    db.query(orderSQL, function(err,result) {
        if (err)
       {
        throw err;
        return res.redirect('/');
       }

       db.query(orderitemSQL, function(err,result) {
         if (err)
        {
         throw err;
         return res.redirect('/');
        }
        return res.redirect('/orders');
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



router.post('/upload_receipt', function(req, res, next) {
  var sess=req.session;

  const form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files){
        var orderId = fields.lr_receipt_order_id;
        var oldPath = files.receiptfile.path;
        var newPath = "./public/lr_receipts/"+orderId+'.pdf';
        var rawData = fs.readFileSync(oldPath)
      
        fs.writeFile(newPath, rawData, function(err){
            if(err) console.log(err)
            return res.redirect('/orders');
        })
  })
  // res.redirect('/orders');
  
});


/* dashboard update order status. */
router.post('/update_order_status', function(req, res, next) {
  var sess=req.session;
  var orderId=req.body.orderId;
  var status=req.body.status;
  var shipaddress=req.body.shipaddress;
  var shippartner=req.body.shippartner;
  var shiptype=req.body.shiptype;
  var shipweight=req.body.shipweight;
  var shipquantity=req.body.shipquantity;
  var shipnumber=req.body.shipnumber;
  var shipdate=req.body.shipdate;
  var recquantity=req.body.recquantity;
  var recdate=req.body.recdate;
  var username;
  var email;
  var mobile;
  var productname;
  var producturl;
  var productpdf;
  var prdId;
  var address_id;
  var statusTxt;
  switch(status)
 {
case 'P':
  statusTxt='pending'
  break;
case 'R':
  statusTxt='rejected'
  break;
case 'A':
    statusTxt='approved'
    break;
 case 'I':
    statusTxt='in-progress'
    break;
case 'S':
    statusTxt='shipped'
    break;
case 'D':
    statusTxt='delivered'
    break;
 }
  if(sess === undefined){
    return res.redirect('/orders');
  }else{

    console.log('---------------');
    console.log('---------------');
    console.log('---------------');
    console.log('---------------');
    console.log('---------------');
    console.log('---------------');
    var updateOrderSQL="update orders set status='"+status+"',UPDATETIME=CURRENT_TIMESTAMP where order_id="+orderId+"";
    console.log(updateOrderSQL);
    console.log('---------------');
    console.log('---------------');
    console.log('---------------');
    console.log('---------------');
    console.log('---------------');
    db.query(updateOrderSQL, function(err,result) {
      if (err) {
          throw err;
          return res.redirect('/orders');
      }

      var ordSQL="select product_id,address_id from orders where order_id="+orderId+"";

      db.query(ordSQL, function(err,result1) {
        if (err) {
            throw err;
            return res.redirect('/orders');
        }
        if(result1.length===0){
          return res.redirect('/orders');
        }else{
          result1.forEach(function(element){
              prdId=element.product_id;
              address_id=element.address_id;
            });

            var usrSQL="select concat(FIRSTNAME,' ',LASTNAME) AS NAME,EMAIL1,MOBILE1 from address where address_id="+address_id+"";

            db.query(usrSQL, function(err,result2) {
              if (err) {
                 throw err;
                  return res.redirect('/orders');
              }
              result2.forEach(function(element1){
                  username=element1.NAME;
                  email=element1.EMAIL1;
                  mobile=element1.MOBILE1;
                });

                var prdSQL="select NAME,THUMBNAIL from product where product_id="+prdId+"";

                db.query(prdSQL, function(err,result3) {
                  if (err) {
                      throw err;
                      return res.redirect('/orders');
                  }
                  result3.forEach(function(element2){
                      productname=element2.NAME;
                      producturl=const_data.cdn_image_url+element2.THUMBNAIL;
                      productpdf='';
                    });
                    console.log(status);
                    if(status == 'S'){
                      console.log('inside ship');
                      var orderattrSQL="insert into ordersattr(ORDER_ID,SHIPADDRESS,SHIPPARTNER,SHIPNUMBER,SHIPTYPE,SHIPWEIGHT,SHIPQUANTITY,PACKAGE,CITY,SHIPDATE,STATUS)"+
                      " value("+orderId+",'"+shipaddress+"',"+
                      "'"+shippartner+"','"+shipnumber+"','"+shiptype+"','"+shipweight+"','"+shipquantity+"','Box',(select CITY  from address where address_id in (select address_id from orders where order_id="+orderId+")),'"+shipdate+"','S')";
                    }else if(status == 'D'){
                     var orderattrSQL="update ordersattr set STATUS='D',DELDQUANTITY='"+recquantity+"',DELDATE='"+recdate+"' WHERE ORDER_ID="+orderId+";"+
                     " insert into payment(ORDER_ID,STATUS,PENDINGFROMDATE,DELAY) value("+orderId+",'P','"+recdate+"','1');";

                    }else if(status === 'A'){
                      var orderattrSQL="update orders set status='"+status+"',UPDATETIME=CURRENT_TIMESTAMP where order_id="+orderId+"";
                      //edit here ordertotal

                        var getmembderid_from_order = "SELECT MEMBER_ID from orders where order_id="+orderId+"";
                        db.query(getmembderid_from_order, function(err, memberid) {
                            if (err) {
                              throw err;
                              return res.redirect('/orders');
                            }
                            
                            memberid.forEach(function(data) {
                              var memid = data.MEMBER_ID;
                              var getuserinsalestarget = "select user_id from sales_target where SALES_TARGET_STATUS = 0 AND user_id="+memid+"";
                              db.query(getuserinsalestarget, function(err, usersintarget) {
                                if (err) {
                                  throw err;
                                  return res.redirect('/orders');
                                }
                                usersintarget.forEach(function(data) {
                                      var getroleid = "select ROLE_ID from usrrole where user_id="+memid+"";
                                      db.query(getroleid, function(err, roleid) {
                                        if (err) {
                                          throw err;
                                          return res.redirect('/orders');
                                        }
                                        roleid.forEach(function(data) {
                                          var roleid = data.ROLE_ID;
                                          var getrole = "select IDENTIFIER from role where ROLE_ID="+roleid+"";
                                            db.query(getrole, function(err, role) {
                                              if (err) {
                                                throw err;
                                                return res.redirect('/orders');
                                              }
                                              role.forEach(function(data) {
                                                var rl = data.IDENTIFIER;
                                                var user_id = memid;
                                                  if(rl === 'SE'){
                                                  
                                                    var ApprovedOrderSQL="select COUNT(a.ORDER_ID) AS ORDERCOUNT,(CASE WHEN SUM(a.TOTAL) IS NULL THEN 0 ELSE SUM(a.TOTAL) END) AS ORDERTOTAL from orders a "+
                                                        " join address c on c.address_id=a.address_id and c.member_id=a.member_id_for"+
                                                        " join user d on d.USER_ID=a.member_id_for join address e on e.member_id=d.USER_ID "+
                                                        " where a.member_id="+user_id+" and a.STATUS='A'";
                                                  }else{
                                                  
                                                    var ApprovedOrderSQL="select COUNT(a.ORDER_ID) AS ORDERCOUNT,(CASE WHEN SUM(a.TOTAL) IS NULL THEN 0 ELSE SUM(a.TOTAL) END) AS ORDERTOTAL from orders a "+
                                                    " join address c on c.address_id=a.address_id and c.member_id=a.member_id_for "+
                                                    " join user d on d.USER_ID=a.member_id join address e on e.member_id=d.USER_ID "+
                                                    " where c.member_id="+user_id+" AND a.STATUS='A'";
                                                  }
      
                                                  db.query(ApprovedOrderSQL, function(err, result) {
                                                    if (err) {
                                                      throw err;
                                                      return res.redirect('/orders');
                                                    }
                                                    result.forEach(function(data){
                                                      ordertotal=data.ORDERTOTAL;
                                                      console.log(ordertotal);
                                                      update_sales_target = "update sales_target set SALES_ACHIEVED ="+ordertotal+" where SALES_TARGET_STATUS = 0 AND user_id="+user_id+"";
                                                      db.query(update_sales_target, function(err, result) {
                                                        if (err) {
                                                          throw err;
                                                          return res.redirect('/orders');
                                                        }
                                                      });
                                                    });
                                                  });
                                              });
                                            });
                                        });
                                      });
                                });

                              });
                              
                            });
                      });









                    }
                      db.query(orderattrSQL, function(err,result4) {
                        if (err) {
                            throw err;
                            return res.redirect('/orders');
                        }

                        return res.redirect('/orders');
                        let mailOptionsAdmin = {
                        from: const_data.admin_email,
                        to: const_data.info_admin,
                        cc: const_data.info_admin1,
                        subject: 'Order #'+orderId+' is '+statusTxt,
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
                             <p style="font-family:'Source Sans Pro',sans-serif;font-size: 16px;color: #454545;margin:0px;line-height:1.5;padding-top:18px">You have updated status of the order with id `+orderId+` to `+statusTxt+` which was placed by Mr.`+username+`,mobile no. `+mobile+` , email `+email+`. Product details are mentioned below. </p><br>
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
                    subject: 'Order #'+orderId+' is '+statusTxt,
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
                             <p style="font-family:'Source Sans Pro',sans-serif;font-size: 16px;color: #454545;margin:0px;line-height:1.5;padding-top:18px">Your order with order id `+orderId+` is `+statusTxt+` contact the executives for more information. Product details are mentioned below</p><br>
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
                      });

              //  emailer.sendMail(mailOptionsAdmin, function (error) {
                  //  if (error) {
                      //res.render('enquiry',{menu:data,userId:sess.user_id,userType:sess.user_type});
                    //  return res.redirect('/dashboard/orders');
                    //    console.log('error:', error);
                    //} else {
                        //emailer.sendMail(mailOptionsClient, function (error) {
                        //    if (error) {
                              //res.render('enquiry',{menu:data,userId:sess.user_id,userType:sess.user_type});
                          //  return res.redirect('/dashboard/orders');
                            //    console.log('error:', error);
                        //    } else {
                        //      return res.redirect('/dashboard/orders');
                            //  res.render('enquiry',{menu:data,userId:sess.user_id,userType:sess.user_type});
                          //      console.log('sent');
                      //      }
                      // });
                  //   }
                //  });


                });
            });


        }
      });




    });
  }
});


/**Remove cart item*/
router.get('/deleteCartItem/cartId/:cartId/cartDtlId/:cartDtlId', function(req, res, next) {
  var sess=req.session;
  var cart_id=req.params.cartId;
  var cartdtl_id=req.params.cartDtlId;

  if(sess === undefined){
  return res.redirect('/');
  }else{
    if(sess.user_type !='DT' && sess.user_type !='DL'
        && sess.user_type !='SE'){
    return res.redirect('/');
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
        return res.redirect('/');
       }
       db.query(cartUpdateSQL1, function(err,result) {
           if (err)
          {
           throw err;
           return res.redirect('/');
          }
      return res.redirect('/cart');
     });
  });
  }
  }
  });

  /* dashboard console. */
  router.get('/product_cr', function(req, res, next) {
    var sess=req.session;
    if(sess === undefined){
      return res.redirect('/login');
    }else{
      if(sess.user_type !='HOD' && sess.user_type !='A' && sess.user_type !='DT' && sess.user_type !='DL'
          && sess.user_type !='SE'){
        return res.redirect('/login');
      }else{
         var nameSQL="select FIRSTNAME,LASTNAME from address where MEMBER_ID="+sess.user_id+"";
         var leafCatSQL="select * from leafcategory WHERE Status='1'";
         db.query(nameSQL, function(err,result) {
             if (err) {
               throw err;
               return res.redirect('/login');
             }
             db.query(leafCatSQL, function(err,result1) {
                 if (err) {
                   throw err;
                   return res.redirect('/login');
                 }
                  res.render('_product_crud',{username:result,subCatList:result1,userId:sess.user_id,userType:sess.user_type,username:sess.username,userImg:sess.user_img});
               });
           });
        }
    }
  });

  /* post product create. */
  router.post('/product_cr_post', function(req, res, next) {
    var sess=req.session;
    var name;
    var desc;
    var catId;
    var lprice;
    var oprice;
    var pimage;
    var inventory;
    var formData = new formidable.IncomingForm();
    formData.parse(req, function (error, fields, files) {
        var newPath = "./public/images/products/" + files.image.name;
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
        name=fields.pname;
        desc=fields.pdesc;
        catId=fields.pcatId;
        lprice=fields.lprice;
        oprice=fields.oprice;
        pimage=imageName;
        inventory=fields.inventory;

    if(sess === undefined){
      return res.redirect('/login');
    }else{
      if(sess.user_type !='HOD' && sess.user_type !='A' && sess.user_type !='DT' && sess.user_type !='DL'
          && sess.user_type !='SE'){
        return res.redirect('/login');
      }else{
         var prdCrSQL="insert into product(PRODUCT_TYPE,NAME,DESCRIPTION,PUBLISHED,THUMBNAIL,FULLIMAGE)"+
         " value('SKU','"+name+"','"+desc+"','1','"+pimage+"','"+pimage+"')";
         db.query(prdCrSQL, function(err,result) {
             if (err) {
               throw err;
               return res.redirect('/login');
             }
             var prdCatRel="insert into prdcatrel(PRODUCT_ID,CATEGORY_ID)"+
             " value((select max(PRODUCT_ID) from product),"+catId+")";
             db.query(prdCatRel, function(err,result1) {
                 if (err) {
                   throw err;
                   return res.redirect('/login');
                 }
                 var prdConfSQL="insert into productconf(PRODUCT_ID,INVENTORY,LISTPRICE,OFFERPRICE)"+
                 " value((select max(PRODUCT_ID) from product),'"+inventory+"','"+lprice+"','"+oprice+"')";
                 db.query(prdConfSQL, function(err,result2) {
                     if (err) {
                       throw err;
                       return res.redirect('/login');
                     }
                     return res.redirect('/products');
                   });
               });
           });
        }
    }
    });
  });


  /* post product create. */
  router.post('/product_up_post', function(req, res, next) {
    var sess=req.session;
    var pId;
    var name;
    var desc;
    var lprice;
    var oprice;
    var pimage;
    var inventory;
    var formData = new formidable.IncomingForm();
    formData.parse(req, function (error, fields, files) {
        var newPath = "./public/images/products/" + files.image.name;
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
        name=fields.pname;
        desc=fields.pdesc;
        pId=fields.pId;
        lprice=fields.lprice;
        oprice=fields.oprice;
        pimage=imageName;
        inventory=fields.inventory;

    if(sess === undefined){
      return res.redirect('/login');
    }else{
      if(sess.user_type !='HOD' && sess.user_type !='A' && sess.user_type !='DT' && sess.user_type !='DL'
          && sess.user_type !='SE'){
        return res.redirect('/login');
      }else{
         var prdCrSQL="update product set NAME='"+name+"',DESCRIPTION='"+desc+"',"+
         " THUMBNAIL='"+pimage+"',FULLIMAGE='"+pimage+"' WHERE PRODUCT_ID="+pId+"";
         db.query(prdCrSQL, function(err,result) {
             if (err) {
               throw err;
               return res.redirect('/login');
             }
             var prdConfSQL=" update productconf set INVENTORY='"+inventory+"',LISTPRICE='"+lprice+"',"+
             " OFFERPRICE='"+oprice+"' WHERE PRODUCT_ID="+pId+"";
             db.query(prdConfSQL, function(err,result2) {
                 if (err) {
                   throw err;
                   return res.redirect('/login');
                 }
                 return res.redirect('/products');
               });
           });
        }
    }
    });
  });

  /* dashboard console. */
  router.get('/category_cr', function(req, res, next) {
    var sess=req.session;
    if(sess === undefined){
      return res.redirect('/login');
    }else{
      if(sess.user_type !='HOD' && sess.user_type !='A' && sess.user_type !='DT' && sess.user_type !='DL'
          && sess.user_type !='SE'){
        return res.redirect('/login');
      }else{
         var nameSQL="select FIRSTNAME,LASTNAME from address where MEMBER_ID="+sess.user_id+"";
         var topCatSQL="select * from topcategory where Status='1'";
         var subCatSQL="select * from leafcategory where Status='1'";
         db.query(nameSQL, function(err,result) {
             if (err) {
               throw err;
               return res.redirect('/login');
             }
             db.query(topCatSQL, function(err,result1) {
                 if (err) {
                   throw err;
                   return res.redirect('/login');
                 }
                 db.query(subCatSQL, function(err,result2) {
                     if (err) {
                       throw err;
                       return res.redirect('/login');
                     }
                      res.render('_category_crud',{username:result,topcat:result1,subcat:result2,userId:sess.user_id,userType:sess.user_type,username:sess.username,userImg:sess.user_img});
                   });
               });
           });
        }
    }
  });

  /* dashboard console spare part. */
  router.get('/sparepart', function(req, res, next) {
    var sess=req.session;
    if(sess === undefined){
      return res.redirect('/login');
    }else{
      if(sess.user_type !='HOD' && sess.user_type !='A' && sess.user_type !='DT' && sess.user_type !='DL'
          && sess.user_type !='SE'){
        return res.redirect('/login');
      }else{
         var nameSQL="select FIRSTNAME,LASTNAME from address where MEMBER_ID="+sess.user_id+"";
         var pspareSQL="select a.PSPARE_ID,a.PRODUCT_ID,b.NAME AS PRDNAME, "+
         " a.NAME AS SPNAME,a.DESCRIPTION AS SPDESC,a.IMAGE1 AS SPIMAGE,a.PRICE"+
         " from pspare a join product b on b.PRODUCT_ID=a.PRODUCT_ID";
         db.query(nameSQL, function(err,result) {
             if (err) {
               throw err;
               return res.redirect('/login');
             }
             db.query(pspareSQL, function(err,result1) {
                 if (err) {
                   throw err;
                   return res.redirect('/login');
                 }
                  res.render('_spare_part',{username:result,pspareList:result1,userId:sess.user_id,userType:sess.user_type,username:sess.username,userImg:sess.user_img});
               });

           });
        }
    }
  });




  router.get('/sparepartremove', function(req, res, next) {
    var sess=req.session;
    if(sess === undefined){
      return res.redirect('/login');
    }else{
      if(sess.user_type !='HOD' && sess.user_type !='A' && sess.user_type !='DT' && sess.user_type !='DL'
          && sess.user_type !='SE'){
        return res.redirect('/login');
      }else{
         var nameSQL="select FIRSTNAME,LASTNAME from address where MEMBER_ID="+sess.user_id+"";
         var pspareSQL="select a.PSPARE_ID,a.PRODUCT_ID,b.NAME AS PRDNAME, "+
         " a.NAME AS SPNAME,a.DESCRIPTION AS SPDESC,a.IMAGE1 AS SPIMAGE,a.PRICE"+
         " from pspare a join product b on b.PRODUCT_ID=a.PRODUCT_ID";
         db.query(nameSQL, function(err,result) {
             if (err) {
               throw err;
               return res.redirect('/login');
             }
             db.query(pspareSQL, function(err,result1) {
                 if (err) {
                   throw err;
                   return res.redirect('/login');
                 }
                  res.render('_spare_part_remove',{username:result,pspareList:result1,userId:sess.user_id,userType:sess.user_type,username:sess.username,userImg:sess.user_img});
               });

           });
        }
    }
  });



  /* dashboard console spare part. */
  router.get('/sparepart/pageNo/:pageNo', function(req, res, next) {
    var sess=req.session;
    var pageNo=req.params.pageNo;
    var pagesize=10;
    var startPage=(pagesize*pageNo)+1;
    var endPage=pagesize;
    if(sess === undefined){
      return res.redirect('/login');
    }else{
      if(sess.user_type !='HOD' && sess.user_type !='A' && sess.user_type !='DT' && sess.user_type !='DL'
          && sess.user_type !='SE'){
        return res.redirect('/login');
      }else{
         var nameSQL="select FIRSTNAME,LASTNAME from address where MEMBER_ID="+sess.user_id+"";
         var pspareSQL="select a.PSPARE_ID,a.PRODUCT_ID,b.NAME AS PRDNAME, "+
         " a.NAME AS SPNAME,a.DESCRIPTION AS SPDESC,a.IMAGE1 AS SPIMAGE,a.PRICE"+
         " from pspare a join product b on b.PRODUCT_ID=a.PRODUCT_ID limit "+startPage+","+endPage+"";
         db.query(nameSQL, function(err,result) {
             if (err) {
               throw err;
               return res.redirect('/login');
             }
             db.query(pspareSQL, function(err,result1) {
                 if (err) {
                   throw err;
                   return res.redirect('/login');
                 }
                  res.render('_spare_part',{username:result,pspareList:result1,userId:sess.user_id,userType:sess.user_type,username:sess.username,userImg:sess.user_img});
               });

           });
        }
    }
  });

  /* dashboard console spare part. */
  router.post('/sparepartByName', function(req, res, next) {
    var sess=req.session;
    var name=req.body.name;
    if(sess === undefined){
      return res.redirect('/login');
    }else{
      if(sess.user_type !='HOD' && sess.user_type !='A' && sess.user_type !='DT' && sess.user_type !='DL'
          && sess.user_type !='SE'){
        return res.redirect('/login');
      }else{
         var nameSQL="select FIRSTNAME,LASTNAME from address where MEMBER_ID="+sess.user_id+"";
         var pspareSQL="select a.PSPARE_ID,a.PRODUCT_ID,b.NAME AS PRDNAME, "+
         " a.NAME AS SPNAME,a.DESCRIPTION AS SPDESC,a.IMAGE1 AS SPIMAGE,a.PRICE"+
         " from pspare a join product b on b.PRODUCT_ID=a.PRODUCT_ID WHERE b.NAME LIKE '%"+name+"%' OR a.NAME LIKE '%"+name+"%' limit 10";
         db.query(nameSQL, function(err,result) {
             if (err) {
               throw err;
               return res.redirect('/login');
             }
             db.query(pspareSQL, function(err,result1) {
                 if (err) {
                   throw err;
                   return res.redirect('/login');
                 }
                  res.render('_spare_part',{username:result,pspareList:result1,userId:sess.user_id,userType:sess.user_type,username:sess.username,userImg:sess.user_img});
               });

           });
        }
    }
  });

  /* dashboard console spare part. */
  router.get('/sparepartbyId/Id/:id', function(req, res, next) {
    var sess=req.session;
    var id=req.params.id;
    if(sess === undefined){
      return res.redirect('/login');
    }else{
      if(sess.user_type !='HOD' && sess.user_type !='A' && sess.user_type !='DT' && sess.user_type !='DL'
          && sess.user_type !='SE'){
        return res.redirect('/login');
      }else{
         var nameSQL="select FIRSTNAME,LASTNAME from address where MEMBER_ID="+sess.user_id+"";
         var pspareSQL="select a.PSPARE_ID,a.PRODUCT_ID,b.NAME AS PRDNAME, "+
         " a.NAME AS SPNAME,a.DESCRIPTION AS SPDESC,a.IMAGE1 AS SPIMAGE,a.PRICE"+
         " from pspare a join product b on b.PRODUCT_ID=a.PRODUCT_ID WHERE a.PSPARE_ID="+id+"";
         db.query(nameSQL, function(err,result) {
             if (err) {
               throw err;
               return res.redirect('/login');
             }
             db.query(pspareSQL, function(err,result1) {
                 if (err) {
                   throw err;
                   return res.redirect('/login');
                 }
                  res.render('_spare_part_crud_edit',{username:result,pspareList:result1,userId:sess.user_id,userType:sess.user_type,username:sess.username,userImg:sess.user_img});
               });

           });
        }
    }
  });

  router.get('/sparepartremovebyId/Id/:id', function(req, res, next) {
    var sess=req.session;
    var id=req.params.id;
    if(sess === undefined){
      return res.redirect('/login');
    }else{
      if(sess.user_type !='HOD' && sess.user_type !='A' && sess.user_type !='DT' && sess.user_type !='DL'
          && sess.user_type !='SE'){
        return res.redirect('/login');
      }else{
         var nameSQL="select FIRSTNAME,LASTNAME from address where MEMBER_ID="+sess.user_id+"";
         var removeSparePartSql = "delete from pspare where PSPARE_ID="+id+"";
         var pspareSQL="select a.PSPARE_ID,a.PRODUCT_ID,b.NAME AS PRDNAME, "+
         " a.NAME AS SPNAME,a.DESCRIPTION AS SPDESC,a.IMAGE1 AS SPIMAGE,a.PRICE"+
         " from pspare a join product b on b.PRODUCT_ID=a.PRODUCT_ID";
         db.query(nameSQL, function(err,result) {
             if (err) {
               throw err;
               return res.redirect('/login');
             }

             db.query(removeSparePartSql, function(err, revresult){
              if (err) {
                throw err;
                return res.redirect('/login');
              }
              db.query(pspareSQL, function(err,result1) {
                if (err) {
                  throw err;
                  return res.redirect('/login');
                }
                 res.render('_spare_part_remove',{username:result,pspareList:result1,userId:sess.user_id,userType:sess.user_type,username:sess.username,userImg:sess.user_img});
              });
             });
           });
        }
    }
  });


  

  /* dashboard console spart part create. */
  router.get('/sparepart_cr', function(req, res, next) {
    var sess=req.session;
    if(sess === undefined){
      return res.redirect('/login');
    }else{
      if(sess.user_type !='HOD' && sess.user_type !='A' && sess.user_type !='DT' && sess.user_type !='DL'
          && sess.user_type !='SE'){
        return res.redirect('/login');
      }else{
         var nameSQL="select FIRSTNAME,LASTNAME from address where MEMBER_ID="+sess.user_id+"";
         var prdSQL="select * from product where PUBLISHED=1";
         db.query(nameSQL, function(err,result) {
             if (err) {
               throw err;
               return res.redirect('/login');
             }
             db.query(prdSQL, function(err,result1) {
                 if (err) {
                   throw err;
                   return res.redirect('/login');
                 }
                  res.render('_spare_part_crud',{username:result,prdList:result1,userId:sess.user_id,userType:sess.user_type,username:sess.username,userImg:sess.user_img});
               });
           });
        }
    }
  });

  /* post mapping. */
  router.post('/sparepart_cr_post', function(req, res, next) {
    var sess=req.session;
    var name=req.body.name;
    var desc=req.body.desc;
    var price=req.body.price;
    var productId=req.body.productId;
    if(sess === undefined){
      return res.redirect('/login');
    }else{
      if(sess.user_type !='HOD' && sess.user_type !='A' && sess.user_type !='DT' && sess.user_type !='DL'
          && sess.user_type !='SE'){
        return res.redirect('/login');
      }else{
         var psareSQL="insert into pspare(PRODUCT_ID,NAME,DESCRIPTION,PRICE,STATUS)"+
         " value("+productId+",'"+name+"','"+desc+"','"+price+"','1')";

         db.query(psareSQL, function(err,result) {
             if (err) {
               throw err;
               return res.redirect('/login');
             }
             return res.redirect('/sparepart');
           });
        }
    }
  });

  /* post mapping. */
  router.post('/sparepart_cr_post', function(req, res, next) {
    var sess=req.session;
    var spId=req.body.spId;
    var name=req.body.name;
    var desc=req.body.desc;
    var price=req.body.price;
    if(sess === undefined){
      return res.redirect('/login');
    }else{
      if(sess.user_type !='HOD' && sess.user_type !='A' && sess.user_type !='DT' && sess.user_type !='DL'
          && sess.user_type !='SE'){
        return res.redirect('/login');
      }else{
         var psareSQL=" update pspare set NAME='"+name+"',DESCRIPTION='"+desc+"',PRICE='"+price+"' WHERE PSPARE_ID="+spId+"";

         db.query(psareSQL, function(err,result) {
             if (err) {
               throw err;
               return res.redirect('/login');
             }
             return res.redirect('/sparepart');
           });
        }
    }
  });


  /* dashboard console mappings. */
  router.get('/mapping', function(req, res, next) {
    var sess=req.session;
    if(sess === undefined){
      return res.redirect('/login');
    }else{
      if(sess.user_type !='HOD' && sess.user_type !='A' && sess.user_type !='DT' && sess.user_type !='DL'
          && sess.user_type !='SE'){
        return res.redirect('/login');
      }else{
         var nameSQL="select FIRSTNAME,LASTNAME from address where MEMBER_ID="+sess.user_id+"";
         db.query(nameSQL, function(err,result) {
             if (err) {
               throw err;
               return res.redirect('/login');
             }
             var mapSQL="select a.USRREL_ID as dlt_user_rel_id,b.USER_ID as dlt_user_id,b.LOGON_ID1 as dlt_logon,e.IDENTIFIER as dlt_role,"+
             " h.FIRSTNAME as dlt_fname,h.LASTNAME as dlt_lname,h.company as dlt_company,h.EMAIL1 as dlt_email,h.MOBILE1 as dlt_mobile,c.USER_ID as se_user_id, "+
             " c.LOGON_ID1 as se_logon,g.IDENTIFIER as se_role,i.FIRSTNAME as se_fname,i.LASTNAME as se_lname,i.company as se_company,i.EMAIL1 as se_email,i.MOBILE1 as se_mobile "+
             " from usrrel a join user b on b.USER_ID=a.USER_ID_FROM "+
             " join user c on c.USER_ID=a.USER_ID_TO join usrrole d on d.USER_ID=b.USER_ID"+
             " join role e on e.ROLE_ID=d.ROLE_ID join usrrole f on f.USER_ID=c.USER_ID "+
             " join role g on g.ROLE_ID=f.ROLE_ID join address h on h.MEMBER_ID=b.USER_ID join "+
             " address i on i.MEMBER_ID=c.USER_ID";
             db.query(mapSQL, function(err,result1) {
                 if (err) {
                   throw err;
                   return res.redirect('/login');
                 }
                  res.render('_user_mapping',{username:result,mapList:result1,userId:sess.user_id,userType:sess.user_type,username:sess.username,userImg:sess.user_img});
               });

           });
        }
    }
  });

  /* dashboard console mappings. */
  router.get('/mapping/pageNo/:pageNo', function(req, res, next) {
    var sess=req.session;
    var pageNo=req.params.pageNo;
    var pagesize=10;
    var startPage=(pagesize*pageNo)+1;
    var endPage=pagesize;
    if(sess === undefined){
      return res.redirect('/login');
    }else{
      if(sess.user_type !='HOD' && sess.user_type !='A' && sess.user_type !='DT' && sess.user_type !='DL'
          && sess.user_type !='SE'){
        return res.redirect('/login');
      }else{
         var nameSQL="select FIRSTNAME,LASTNAME from address where MEMBER_ID="+sess.user_id+"";
         db.query(nameSQL, function(err,result) {
             if (err) {
               throw err;
               return res.redirect('/login');
             }
             var mapSQL="select a.USRREL_ID,b.USER_ID as dlt_user_id,b.LOGON_ID1 as dlt_logon,e.IDENTIFIER as dlt_role,"+
             " h.FIRSTNAME as dlt_fname,h.LASTNAME as dlt_lname,h.company as dlt_company,h.EMAIL1 as dlt_email,h.MOBILE1 as dlt_mobile,c.USER_ID as se_user_id, "+
             " c.LOGON_ID1 as se_logon,g.IDENTIFIER as se_role,i.FIRSTNAME as se_fname,i.LASTNAME as se_lname,i.company as se_company,i.EMAIL1 as se_email,i.MOBILE1 as se_mobile "+
             " from usrrel a join user b on b.USER_ID=a.USER_ID_FROM "+
             " join user c on c.USER_ID=a.USER_ID_TO join usrrole d on d.USER_ID=b.USER_ID"+
             " join role e on e.ROLE_ID=d.ROLE_ID join usrrole f on f.USER_ID=c.USER_ID "+
             " join role g on g.ROLE_ID=f.ROLE_ID join address h on h.MEMBER_ID=b.USER_ID join "+
             " address i on i.MEMBER_ID=c.USER_ID limit "+startPage+","+endPage+"";
             db.query(mapSQL, function(err,result1) {
                 if (err) {
                   throw err;
                   return res.redirect('/login');
                 }
                  res.render('_user_mapping',{username:result,mapList:result1,userId:sess.user_id,userType:sess.user_type,username:sess.username,userImg:sess.user_img});
               });

           });
        }
    }
  });


  /* dashboard console mappings. */
  router.post('/mappingByName', function(req, res, next) {
    var sess=req.session;
    var name=req.body.name;
    if(sess === undefined){
      return res.redirect('/login');
    }else{
      if(sess.user_type !='HOD' && sess.user_type !='A' && sess.user_type !='DT' && sess.user_type !='DL'
          && sess.user_type !='SE'){
        return res.redirect('/login');
      }else{
         var nameSQL="select FIRSTNAME,LASTNAME from address where MEMBER_ID="+sess.user_id+"";
         db.query(nameSQL, function(err,result) {
             if (err) {
               throw err;
               return res.redirect('/login');
             }
             var mapSQL="select a.USRREL_ID,b.USER_ID as dlt_user_id,b.LOGON_ID1 as dlt_logon,e.IDENTIFIER as dlt_role,"+
             " h.FIRSTNAME as dlt_fname,h.LASTNAME as dlt_lname,h.company as dlt_company,h.EMAIL1 as dlt_email,h.MOBILE1 as dlt_mobile,c.USER_ID as se_user_id, "+
             " c.LOGON_ID1 as se_logon,g.IDENTIFIER as se_role,i.FIRSTNAME as se_fname,i.LASTNAME as se_lname,i.company as se_company,i.EMAIL1 as se_email,i.MOBILE1 as se_mobile "+
             " from usrrel a join user b on b.USER_ID=a.USER_ID_FROM "+
             " join user c on c.USER_ID=a.USER_ID_TO join usrrole d on d.USER_ID=b.USER_ID"+
             " join role e on e.ROLE_ID=d.ROLE_ID join usrrole f on f.USER_ID=c.USER_ID "+
             " join role g on g.ROLE_ID=f.ROLE_ID join address h on h.MEMBER_ID=b.USER_ID join "+
             " address i on i.MEMBER_ID=c.USER_ID WHERE h.FIRSTNAME LIKE '%"+name+"%' OR i.FIRSTNAME LIKE '%"+name+"%' limit 10";
             db.query(mapSQL, function(err,result1) {
                 if (err) {
                   throw err;
                   return res.redirect('/login');
                 }
                  res.render('_user_mapping',{username:result,mapList:result1,userId:sess.user_id,userType:sess.user_type,username:sess.username,userImg:sess.user_img});
               });

           });
        }
    }
  });

  /* dashboard console mappings. */
  router.get('/mappingbyId/Id/:id', function(req, res, next) {
    var sess=req.session;
    var id=req.params.id;
    console.log('------------------------------------------------------')
    if(sess === undefined){
      return res.redirect('/login');
    }else{
      if(sess.user_type !='HOD' && sess.user_type !='A' && sess.user_type !='DT' && sess.user_type !='DL'
          && sess.user_type !='SE'){
        return res.redirect('/login');
      }else{
         var nameSQL="select FIRSTNAME,LASTNAME from address where MEMBER_ID="+sess.user_id+"";
         db.query(nameSQL, function(err,result) {
             if (err) {
               throw err;
               return res.redirect('/login');
             }
             var mapSQL="select a.USRREL_ID,b.USER_ID as dlt_user_id,b.LOGON_ID1 as dlt_logon,e.IDENTIFIER as dlt_role,"+
             " h.FIRSTNAME as dlt_fname,h.LASTNAME as dlt_lname,h.company as dlt_company,h.EMAIL1 as dlt_email,h.MOBILE1 as dlt_mobile,c.USER_ID as se_user_id, "+
             " c.LOGON_ID1 as se_logon,g.IDENTIFIER as se_role,i.FIRSTNAME as se_fname,i.LASTNAME as se_lname,i.company as se_company,i.EMAIL1 as se_email,i.MOBILE1 as se_mobile "+
             " from usrrel a join user b on b.USER_ID=a.USER_ID_FROM "+
             " join user c on c.USER_ID=a.USER_ID_TO join usrrole d on d.USER_ID=b.USER_ID"+
             " join role e on e.ROLE_ID=d.ROLE_ID join usrrole f on f.USER_ID=c.USER_ID "+
             " join role g on g.ROLE_ID=f.ROLE_ID join address h on h.MEMBER_ID=b.USER_ID join "+
             " address i on i.MEMBER_ID=c.USER_ID WHERE a.USRREL_ID="+id+"";
             db.query(mapSQL, function(err,result1) {
                 if (err) {
                   throw err;
                   return res.redirect('/login');
                 }
                 var dltSQL="select a.USER_ID,a.LOGON_ID1,d.FIRSTNAME,d.LASTNAME from user a join usrrole b on b.USER_ID=a.USER_ID"+
                 " join role c on c.ROLE_ID=b.ROLE_ID join address d on d.MEMBER_ID=a.USER_ID "+
                 " WHERE a.STATUS='1' and c.IDENTIFIER IN ('DT','DL')";
                 var seSQL="select a.USER_ID,a.LOGON_ID1,d.FIRSTNAME,d.LASTNAME from user a join usrrole b on b.USER_ID=a.USER_ID"+
                 " join role c on c.ROLE_ID=b.ROLE_ID join address d on d.MEMBER_ID=a.USER_ID "+
                 " WHERE a.STATUS='1' and c.IDENTIFIER IN ('SE')";
                 db.query(dltSQL, function(err,result2) {
                     if (err) {
                       throw err;
                       return res.redirect('/login');
                     }
                     db.query(seSQL, function(err,result3) {
                         if (err) {
                           throw err;
                           return res.redirect('/login');
                         }
                          res.render('_user_mapping_crud_edit',{username:result,mapList:result1,dltList:result2,seList:result3,userId:sess.user_id,userType:sess.user_type,username:sess.username,userImg:sess.user_img});
                       });
                   });

               });

           });
        }
    }
  });
  /* dashboard console. mapping create form */
  router.get('/mapping_cr', function(req, res, next) {
    var sess=req.session;
    if(sess === undefined){
      return res.redirect('/login');
    }else{
      if(sess.user_type !='HOD' && sess.user_type !='A' && sess.user_type !='DT' && sess.user_type !='DL'
          && sess.user_type !='SE'){
        return res.redirect('/login');
      }else{
         var nameSQL="select FIRSTNAME,LASTNAME from address where MEMBER_ID="+sess.user_id+"";
         var dltSQL="select a.USER_ID,a.LOGON_ID1,d.FIRSTNAME,d.LASTNAME from user a join usrrole b on b.USER_ID=a.USER_ID"+
         " join role c on c.ROLE_ID=b.ROLE_ID join address d on d.MEMBER_ID=a.USER_ID "+
         " WHERE a.STATUS='1' and c.IDENTIFIER IN ('DT','DL')";
         var seSQL="select a.USER_ID,a.LOGON_ID1,d.FIRSTNAME,d.LASTNAME from user a join usrrole b on b.USER_ID=a.USER_ID"+
         " join role c on c.ROLE_ID=b.ROLE_ID join address d on d.MEMBER_ID=a.USER_ID "+
         " WHERE a.STATUS='1' and c.IDENTIFIER IN ('SE')";
         db.query(nameSQL, function(err,result) {
             if (err) {
               throw err;
               return res.redirect('/login');
             }
             db.query(dltSQL, function(err,result1) {
                 if (err) {
                   throw err;
                   return res.redirect('/login');
                 }
                 db.query(seSQL, function(err,result2) {
                     if (err) {
                       throw err;
                       return res.redirect('/login');
                     }
                      res.render('_user_mapping_crud',{username:result,dltList:result1,seList:result2,userId:sess.user_id,userType:sess.user_type,username:sess.username,userImg:sess.user_img});
                   });
               });
           });
        }
    }
  });
  /* post mapping. */
  router.post('/mapping_cr_post', function(req, res, next) {
    var sess=req.session;
    var seId=req.body.seId;
    var dltId=req.body.dltId;
    if(sess === undefined){
      return res.redirect('/login');
    }else{
      if(sess.user_type !='HOD' && sess.user_type !='A' && sess.user_type !='DT' && sess.user_type !='DL'
          && sess.user_type !='SE'){
        return res.redirect('/login');
      }else{
         var usrrelSQL="insert into usrrel(USER_ID_FROM,USER_ID_TO) value ("+dltId+","+seId+")";

         db.query(usrrelSQL, function(err,result) {
             if (err) {
               throw err;
               return res.redirect('/login');
             }
             return res.redirect('/mapping');
           });
        }
    }
  });

  /* post mapping. */
  router.post('/mapping_up_post', function(req, res, next) {
    var sess=req.session;
    var relId=req.body.relId;
    var seId=req.body.seId;
    var dltId=req.body.dltId;
    if(sess === undefined){
      return res.redirect('/login');
    }else{
      if(sess.user_type !='HOD' && sess.user_type !='A' && sess.user_type !='DT' && sess.user_type !='DL'
          && sess.user_type !='SE'){
        return res.redirect('/login');
      }else{
         var usrrelSQL=" update usrrel set USER_ID_FROM="+dltId+",USER_ID_TO="+seId+" where USRREL_ID="+relId+"";

         db.query(usrrelSQL, function(err,result) {
             if (err) {
               throw err;
               return res.redirect('/login');
             }
             return res.redirect('/mapping');
           });
        }
    }
  });

  /* post category. */
  router.post('/category_cr_post', function(req, res, next) {
    var sess=req.session;
    var identifier=req.body.identifier;
    var name=req.body.name;
    var desc=req.body.desc;
    var type=req.body.type;
    var topcat=req.body.topcat;
    var subcat=req.body.subcat;
    if(sess === undefined){
      return res.redirect('/login');
    }else{
      if(sess.user_type !='HOD' && sess.user_type !='A' && sess.user_type !='DT' && sess.user_type !='DL'
          && sess.user_type !='SE'){
        return res.redirect('/login');
      }else{
         var catSQL;
         if(type =='T'){
           catSQL="insert into topcategory(Identifier,Name,Description,Status) "+
           " value('"+identifier+"','"+name+"','"+desc+"','1')";
         }else if(type =='S'){
           catSQL="insert into leafcategory(Identifier,Name,Description,TopCategoryId,ParentCategoryId,Status)"+
           " value('"+identifier+"','"+name+"','"+desc+"','"+topcat+"','"+subcat+"','1')";
         }
         db.query(catSQL, function(err,result) {
             if (err) {
               throw err;
               return res.redirect('/login');
             }
             return res.redirect('/categories');
           });
        }
    }
  });


  /* post category. */
  router.post('/category_up_post', function(req, res, next) {
    var sess=req.session;
    var identifier=req.body.identifier;
    var name=req.body.name;
    var desc=req.body.desc;
    if(sess === undefined){
      return res.redirect('/login');
    }else{
      if(sess.user_type !='HOD' && sess.user_type !='A' && sess.user_type !='DT' && sess.user_type !='DL'
          && sess.user_type !='SE'){
        return res.redirect('/login');
      }else{
         var catSQL="update leafcategory set Name='"+name+"',Description='"+desc+"' where Identifier='"+identifier+"'";
         db.query(catSQL, function(err,result) {
             if (err) {
               throw err;
               return res.redirect('/login');
             }
             return res.redirect('/categories');
           });
        }
    }
  });


  /* dashboard console. */
  router.get('/prices', function(req, res, next) {
    var sess=req.session;
    if(sess === undefined){
      return res.redirect('/login');
    }else{
      if(sess.user_type !='HOD' && sess.user_type !='A' && sess.user_type !='DT' && sess.user_type !='DL'
          && sess.user_type !='SE'){
        return res.redirect('/login');
      }else{
         var priSQL="select a.PRODUCT_ID,a.NAME,b.PRODUCTCONF_ID,b.LISTPRICE,b.OFFERPRICE from product "+
         " a join productconf b on b.PRODUCT_ID=a.PRODUCT_ID WHERE a.PUBLISHED=1 limit 10";
         db.query(priSQL, function(err,result) {
             if (err) {
               throw err;
               return res.redirect('/login');
             }
              res.render('_prices',{priceList:result,userId:sess.user_id,userType:sess.user_type,username:sess.username,userImg:sess.user_img});
           });
        }
    }
  });

  /* dashboard console. */
  router.post('/pricesByName', function(req, res, next) {
    var sess=req.session;
    var name=req.body.name;
    if(sess === undefined){
      return res.redirect('/login');
    }else{
      if(sess.user_type !='HOD' && sess.user_type !='A' && sess.user_type !='DT' && sess.user_type !='DL'
          && sess.user_type !='SE'){
        return res.redirect('/login');
      }else{
        var priSQL="select a.PRODUCT_ID,a.NAME,b.PRODUCTCONF_ID,b.LISTPRICE,b.OFFERPRICE from product "+
        " a join productconf b on b.PRODUCT_ID=a.PRODUCT_ID WHERE a.PUBLISHED=1 AND a.NAME like '%"+name+"%' limit 10";
         db.query(priSQL, function(err,result) {
             if (err) {
               throw err;
               return res.redirect('/login');
             }
              res.render('_prices',{priceList:result,userId:sess.user_id,userType:sess.user_type,username:sess.username,userImg:sess.user_img});
           });
        }
    }
  });

  /* dashboard console. */
  router.get('/prices/pageNo/:pageNo', function(req, res, next) {
    var sess=req.session;
    var pageNo=req.params.pageNo;
    var pagesize=10;
    var startPage=(pagesize*pageNo)+1;
    var endPage=pagesize;
    if(sess === undefined){
      return res.redirect('/login');
    }else{
      if(sess.user_type !='HOD' && sess.user_type !='A' && sess.user_type !='DT' && sess.user_type !='DL'
          && sess.user_type !='SE'){
        return res.redirect('/login');
      }else{
         var priSQL="select a.PRODUCT_ID,a.NAME,b.PRODUCTCONF_ID,b.LISTPRICE,b.OFFERPRICE from product "+
         " a join productconf b on b.PRODUCT_ID=a.PRODUCT_ID WHERE a.PUBLISHED=1 limit "+startPage+","+endPage+"";
         db.query(priSQL, function(err,result) {
             if (err) {
               throw err;
               return res.redirect('/login');
             }
              res.render('_prices',{priceList:result,userId:sess.user_id,userType:sess.user_type,username:sess.username,userImg:sess.user_img});
           });
        }
    }
  });

  /* dashboard console. */
  router.get('/pricesbyId/Id/:id', function(req, res, next) {
    var sess=req.session;
    var id=req.params.id;
    if(sess === undefined){
      return res.redirect('/login');
    }else{
      if(sess.user_type !='HOD' && sess.user_type !='A' && sess.user_type !='DT' && sess.user_type !='DL'
          && sess.user_type !='SE'){
        return res.redirect('/login');
      }else{
        var priSQL="select a.PRODUCT_ID,a.NAME,b.PRODUCTCONF_ID,b.LISTPRICE,b.OFFERPRICE,b.INVENTORY from product "+
              " a join productconf b on b.PRODUCT_ID=a.PRODUCT_ID WHERE a.PUBLISHED=1 AND b.PRODUCTCONF_ID="+id+" limit 10";
            db.query(priSQL, function(err,result) {
             if (err) {
               throw err;
               return res.redirect('/login');
             }
             res.render('_price_edit',{priceList:result,userId:sess.user_id,userType:sess.user_type,username:sess.username,userImg:sess.user_img});
           });
        }
    }
  });

  /* post category. */
  router.post('/price_upd_post', function(req, res, next) {
    var sess=req.session;
    var id=req.body.id;
    var listprice=req.body.listprice;
    var offerprice=req.body.offerprice;
    if(sess === undefined){
      return res.redirect('/login');
    }else{
      if(sess.user_type !='HOD' && sess.user_type !='A' && sess.user_type !='DT' && sess.user_type !='DL'
          && sess.user_type !='SE'){
        return res.redirect('/login');
      }else{
         var priSQL="UPDATE productconf set LISTPRICE='"+listprice+"', OFFERPRICE='"+offerprice+"' WHERE PRODUCTCONF_ID="+id+"";
         db.query(priSQL, function(err,result) {
             if (err) {
               throw err;
               return res.redirect('/login');
             }
             return res.redirect('/prices');
           });
        }
    }
  });

  /* dashboard console. */
  router.get('/inventory', function(req, res, next) {
    var sess=req.session;
    if(sess === undefined){
      return res.redirect('/login');
    }else{
      if(sess.user_type !='HOD' && sess.user_type !='A' && sess.user_type !='DT' && sess.user_type !='DL'
          && sess.user_type !='SE'){
        return res.redirect('/login');
      }else{
         var invSQL="select a.PRODUCT_ID,a.NAME,b.PRODUCTCONF_ID,b.LISTPRICE,b.OFFERPRICE,b.INVENTORY from product "+
         " a join productconf b on b.PRODUCT_ID=a.PRODUCT_ID WHERE a.PUBLISHED=1 limit 10";
         db.query(invSQL, function(err,result) {
             if (err) {
               throw err;
               return res.redirect('/login');
             }
              res.render('_inventory',{invList:result,userId:sess.user_id,userType:sess.user_type,username:sess.username,userImg:sess.user_img});
           });
        }
    }
  });

  /* dashboard console. */
  router.post('/inventoryByName', function(req, res, next) {
    var sess=req.session;
    var name=req.body.name;
    if(sess === undefined){
      return res.redirect('/login');
    }else{
      if(sess.user_type !='HOD' && sess.user_type !='A' && sess.user_type !='DT' && sess.user_type !='DL'
          && sess.user_type !='SE'){
        return res.redirect('/login');
      }else{
        var invSQL="select a.PRODUCT_ID,a.NAME,b.PRODUCTCONF_ID,b.LISTPRICE,b.OFFERPRICE,b.INVENTORY from product "+
        " a join productconf b on b.PRODUCT_ID=a.PRODUCT_ID WHERE a.PUBLISHED=1 AND a.NAME like '%"+name+"%' limit 10";
         db.query(invSQL, function(err,result) {
             if (err) {
               throw err;
               return res.redirect('/login');
             }
              res.render('_inventory',{invList:result,userId:sess.user_id,userType:sess.user_type,username:sess.username,userImg:sess.user_img});
           });
        }
    }
  });

  /* dashboard console. */
  router.get('/inventory/pageNo/:pageNo', function(req, res, next) {
    var sess=req.session;
    var pageNo=req.params.pageNo;
    var pagesize=10;
    var startPage=(pagesize*pageNo)+1;
    var endPage=pagesize;
    if(sess === undefined){
      return res.redirect('/login');
    }else{
      if(sess.user_type !='HOD' && sess.user_type !='A' && sess.user_type !='DT' && sess.user_type !='DL'
          && sess.user_type !='SE'){
        return res.redirect('/login');
      }else{
         var invSQL="select a.PRODUCT_ID,a.NAME,b.PRODUCTCONF_ID,b.LISTPRICE,b.OFFERPRICE,b.INVENTORY from product "+
         " a join productconf b on b.PRODUCT_ID=a.PRODUCT_ID WHERE a.PUBLISHED=1 limit "+startPage+","+endPage+"";
         db.query(invSQL, function(err,result) {
             if (err) {
               throw err;
               return res.redirect('/login');
             }
              res.render('_inventory',{invList:result,userId:sess.user_id,userType:sess.user_type,username:sess.username,userImg:sess.user_img});
           });
        }
    }
  });

  /* dashboard console. */
  router.get('/inventorybyId/Id/:id', function(req, res, next) {
    var sess=req.session;
    var id=req.params.id;
    if(sess === undefined){
      return res.redirect('/login');
    }else{
      if(sess.user_type !='HOD' && sess.user_type !='A' && sess.user_type !='DT' && sess.user_type !='DL'
          && sess.user_type !='SE'){
        return res.redirect('/login');
      }else{
        var invSQL="select a.PRODUCT_ID,a.NAME,b.PRODUCTCONF_ID,b.LISTPRICE,b.OFFERPRICE,b.INVENTORY from product "+
              " a join productconf b on b.PRODUCT_ID=a.PRODUCT_ID WHERE a.PUBLISHED=1 AND b.PRODUCTCONF_ID="+id+" limit 10";
            db.query(invSQL, function(err,result) {
             if (err) {
               throw err;
               return res.redirect('/login');
             }
             res.render('_inventory_edit',{invList:result,userId:sess.user_id,userType:sess.user_type,username:sess.username,userImg:sess.user_img});
           });
        }
    }
  });

  /* post category. */
  router.post('/inventory_upd_post', function(req, res, next) {
    var sess=req.session;
    var id=req.body.id;
    var inventory=req.body.inventory;
    if(sess === undefined){
      return res.redirect('/login');
    }else{
      if(sess.user_type !='HOD' && sess.user_type !='A' && sess.user_type !='DT' && sess.user_type !='DL'
          && sess.user_type !='SE'){
        return res.redirect('/login');
      }else{
         var priSQL="UPDATE productconf set INVENTORY='"+inventory+"' WHERE PRODUCTCONF_ID="+id+"";
         db.query(priSQL, function(err,result) {
             if (err) {
               throw err;
               return res.redirect('/login');
             }
             return res.redirect('/inventory');
           });
        }
    }
  });


  /* dashboard console. */
  router.get('/create_se_user', function(req, res, next) {
    var sess=req.session;
    if(sess === undefined){
    return res.redirect('/login');
    }else{
      if(sess.user_type !='HOD' && sess.user_type !='A' && sess.user_type !='DT' && sess.user_type !='DL'
          && sess.user_type !='SE'){
        return res.redirect('/login');
      }else{
        var prdSQL="select a.PRODUCT_ID,a.NAME,a.DESCRIPTION,a.THUMBNAIL,a.FULLIMAGE,c.INVENTORY,c.LISTPRICE,c.OFFERPRICE,d.Name AS CATNAME from product a join prdcatrel b on b.PRODUCT_ID=a.PRODUCT_ID"+
        " join productconf c on c.PRODUCT_ID=a.PRODUCT_ID left outer join leafcategory d on d.LeafCategoryId=b.CATEGORY_ID WHERE a.PUBLISHED=1";
        db.query(prdSQL, function(err,result) {
            if (err) {
              throw err;
              return res.redirect('/login');
            }
             res.render('_se_user_creation',{prdList:result,userId:sess.user_id,userType:sess.user_type,username:sess.username,userImg:sess.user_img});
          });
      }
    }
  });

  /* dashboard console. */
  router.get('/users_ld', function(req, res, next) {
    var sess=req.session;
    var usersSQL="";
    if(sess === undefined){
      return res.redirect('/login');
    }else{
      if(sess.user_type !='HOD' && sess.user_type !='A' && sess.user_type !='DT' && sess.user_type !='DL'
          && sess.user_type !='SE'){
        return res.redirect('/login');
      }else{
        if(sess.user_type =='SE'){
          usersSQL="select a.USER_ID,a.LOGON_ID1,a.STATUS,c.IDENTIFIER,d.FIRSTNAME,d.LASTNAME,d.EMAIL1,d.MOBILE1,d.PHONE1,concat(d.ADDRESSLINE1,',',d.city,',',d.state,',',d.country,',',d.zipcode) as ADDRESS,d.ZIPCODE,d.AADHAARID,d.PANNO,d.gstin,d.DL,d.company "+
          " from user a join usrrole b on b.USER_ID=a.USER_ID join role c on "+
          " c.ROLE_ID=b.ROLE_ID join address d on d.MEMBER_ID=a.USER_ID "+
          " join usrrel e on e.USER_ID_FROM=a.USER_ID join user f on f.USER_ID=e.USER_ID_TO "+
          " join usrrole g on g.USER_ID=f.USER_ID join role h on h.ROLE_ID=g.ROLE_ID "+
          " WHERE a.FIELD2='L' AND h.IDENTIFIER='SE' AND f.USER_ID="+sess.user_id+" limit 10";
        }else{
          usersSQL="select a.USER_ID,a.LOGON_ID1,a.STATUS,c.IDENTIFIER,d.FIRSTNAME,d.LASTNAME,d.EMAIL1,d.MOBILE1,d.PHONE1,concat(d.ADDRESSLINE1,',',d.city,',',d.state,',',d.country,',',d.zipcode) as ADDRESS,d.ZIPCODE,d.AADHAARID,d.PANNO,d.gstin,d.DL,d.company from user a join "+
         " usrrole b on b.USER_ID=a.USER_ID join role c on c.ROLE_ID=b.ROLE_ID join address d on d.MEMBER_ID=a.USER_ID WHERE a.FIELD2='L' limit 10";
        }
          db.query(usersSQL, function(err,result) {
          if (err) {
            throw err;
            return res.redirect('/login');
          }
           res.render('_ld_list',{users:result,userId:sess.user_id,userType:sess.user_type,username:sess.username,userImg:sess.user_img});
        });
      }
    }
  });

  /* dashboard console. */
  router.get('/users_ld/pageNo/:pageNo', function(req, res, next) {
    var sess=req.session;
    var pageNo=req.params.pageNo;
   var pagesize=10;
   var startPage=(pagesize*pageNo)+1;
   var endPage=pagesize;
    var usersSQL="";
    if(sess === undefined){
      return res.redirect('/login');
    }else{
      if(sess.user_type !='HOD' && sess.user_type !='A' && sess.user_type !='DT' && sess.user_type !='DL'
          && sess.user_type !='SE'){
        return res.redirect('/login');
      }else{
        if(sess.user_type =='SE'){
          usersSQL="select a.USER_ID,a.LOGON_ID1,a.STATUS,c.IDENTIFIER,d.FIRSTNAME,d.LASTNAME,d.EMAIL1,d.MOBILE1,d.PHONE1,concat(d.ADDRESSLINE1,',',d.city,',',d.state,',',d.country,',',d.zipcode) as ADDRESS,d.ZIPCODE,d.AADHAARID,d.PANNO,d.gstin,d.DL,d.company "+
          " from user a join usrrole b on b.USER_ID=a.USER_ID join role c on "+
          " c.ROLE_ID=b.ROLE_ID join address d on d.MEMBER_ID=a.USER_ID "+
          " join usrrel e on e.USER_ID_FROM=a.USER_ID join user f on f.USER_ID=e.USER_ID_TO "+
          " join usrrole g on g.USER_ID=f.USER_ID join role h on h.ROLE_ID=g.ROLE_ID "+
          " WHERE a.FIELD2='L' AND h.IDENTIFIER='SE' AND f.USER_ID="+sess.user_id+" limit "+startPage+","+endPage+"";
        }else{
          usersSQL="select a.USER_ID,a.LOGON_ID1,a.STATUS,c.IDENTIFIER,d.FIRSTNAME,d.LASTNAME,d.EMAIL1,d.MOBILE1,d.PHONE1,concat(d.ADDRESSLINE1,',',d.city,',',d.state,',',d.country,',',d.zipcode) as ADDRESS,d.ZIPCODE,d.AADHAARID,d.PANNO,d.gstin,d.DL,d.company from user a join "+
         " usrrole b on b.USER_ID=a.USER_ID join role c on c.ROLE_ID=b.ROLE_ID join address d on d.MEMBER_ID=a.USER_ID WHERE a.FIELD2='L' limit "+startPage+","+endPage+"";
        }
          db.query(usersSQL, function(err,result) {
          if (err) {
            throw err;
            return res.redirect('/login');
          }
           res.render('_ld_list',{users:result,userId:sess.user_id,userType:sess.user_type,username:sess.username,userImg:sess.user_img});
        });
      }
    }
  });


  /* dashboard console. */
  router.post('/users_ldByName', function(req, res, next) {
    var sess=req.session;
    var name=req.body.name;
    var usersSQL="";
    if(sess === undefined){
      return res.redirect('/login');
    }else{
      if(sess.user_type !='HOD' && sess.user_type !='A' && sess.user_type !='DT' && sess.user_type !='DL'
          && sess.user_type !='SE'){
        return res.redirect('/login');
      }else{
        if(sess.user_type =='SE'){
          usersSQL="select a.USER_ID,a.LOGON_ID1,a.STATUS,c.IDENTIFIER,d.FIRSTNAME,d.LASTNAME,d.EMAIL1,d.MOBILE1,d.PHONE1,concat(d.ADDRESSLINE1,',',d.city,',',d.state,',',d.country,',',d.zipcode) as ADDRESS,d.ZIPCODE,d.AADHAARID,d.PANNO,d.gstin,d.DL,d.company "+
          " from user a join usrrole b on b.USER_ID=a.USER_ID join role c on "+
          " c.ROLE_ID=b.ROLE_ID join address d on d.MEMBER_ID=a.USER_ID "+
          " join usrrel e on e.USER_ID_FROM=a.USER_ID join user f on f.USER_ID=e.USER_ID_TO "+
          " join usrrole g on g.USER_ID=f.USER_ID join role h on h.ROLE_ID=g.ROLE_ID "+
          " WHERE a.FIELD2='L' AND h.IDENTIFIER='SE' AND f.USER_ID="+sess.user_id+" AND d.FIRSTNAME LIKE '%"+name+"%' limit 10";
        }else{
          usersSQL="select a.USER_ID,a.LOGON_ID1,a.STATUS,c.IDENTIFIER,d.FIRSTNAME,d.LASTNAME,d.EMAIL1,d.MOBILE1,d.PHONE1,concat(d.ADDRESSLINE1,',',d.city,',',d.state,',',d.country,',',d.zipcode) as ADDRESS,d.ZIPCODE,d.AADHAARID,d.PANNO,d.gstin,d.DL,d.company from user a join "+
         " usrrole b on b.USER_ID=a.USER_ID join role c on c.ROLE_ID=b.ROLE_ID join address d on d.MEMBER_ID=a.USER_ID WHERE a.FIELD2='L' AND d.FIRSTNAME LIKE '%"+name+"%' limit 10";
        }
          db.query(usersSQL, function(err,result) {
          if (err) {
            throw err;
            return res.redirect('/login');
          }
           res.render('_ld_list',{users:result,userId:sess.user_id,userType:sess.user_type,username:sess.username,userImg:sess.user_img});
        });
      }
    }
  });

  /* dashboard console. */
  router.get('/update_user/id/:id/st/:st', function(req, res, next) {
    var sess=req.session;
    var id=req.params.id;
    var status=req.params.st;
    if(sess === undefined){
    return res.redirect('/login');
    }else{
      if(sess.user_type !='HOD' && sess.user_type !='A' && sess.user_type !='DT' && sess.user_type !='DL'
          && sess.user_type !='SE'){
        return res.redirect('/login');
      }else{
        if(status =='A'){
          var usrSQL="UPDATE user SET STATUS='1' WHERE USER_ID="+id+"";
        }else if(status =='I'){
          var usrSQL="UPDATE user SET STATUS='0' WHERE USER_ID="+id+"";
        }
        db.query(usrSQL, function(err,result) {
            if (err) {
              throw err;
              return res.redirect('/login');
            }
             return res.redirect('/users_ld');
          });
      }
    }
  });



  /* dashboard console. */
  router.get('/followup_lt', function(req, res, next) {
    var sess=req.session;
    var usersSQL="";
    if(sess === undefined){
      return res.redirect('/login');
    }else{
      if(sess.user_type !='HOD' && sess.user_type !='A' && sess.user_type !='DT' && sess.user_type !='DL'
          && sess.user_type !='SE'){
        return res.redirect('/login');
      }else{
        if(sess.user_type =='A' || sess.user_type =='HOD'){
          enqSQL="select a.ENQUIRY_ID,a.STATUS,a.CREATEDATE,a.NEXTDATE,a.TYPE,a.ISNEW,a.COMMENT,a.QTY,a.QTY_2,a.QTY_3,a.QTY_4,a.QTY_5,a.PRICE,a.PRICE_2,a.PRICE_3,a.PRICE_4,a.PRICE_5,a.IMAGE1,a.IMAGE2,a.IMAGE3,a.IMAGE4,a.IMAGE5,b.LOGON_ID1,c.FIRSTNAME,c.LASTNAME,c.MOBILE1,c.EMAIL1"+
          ", c.ADDRESSLINE1, c.CITY, c.STATE, c.COUNTRY, c.ZIPCODE, c.company, c.gstin from enquiry a join user b on b.USER_ID=a.USER_ID join address c on c.MEMBER_ID=b.USER_ID order by a.CREATEDATE";
        }else if(sess.user_type =='SE'){
          enqSQL="select a.ENQUIRY_ID,a.STATUS,a.CREATEDATE,a.NEXTDATE,a.TYPE,a.ISNEW,a.COMMENT,a.QTY,a.QTY_2,a.QTY_3,a.QTY_4,a.QTY_5,a.PRICE,a.PRICE_2,a.PRICE_3,a.PRICE_4,a.PRICE_5,a.IMAGE1,a.IMAGE2,a.IMAGE3,a.IMAGE4,a.IMAGE5, a.IMAGE6,b.LOGON_ID1,c.FIRSTNAME,c.LASTNAME,c.MOBILE1,c.EMAIL1"+
          ", c.ADDRESSLINE1, c.CITY, c.STATE, c.COUNTRY, c.ZIPCODE, c.company, c.gstin from enquiry a join user b on b.USER_ID=a.USER_ID join address c on c.ADDRESS_ID=a.ADDRESS_ID where a.USER_ID='"+sess.user_id+"' order by a.CREATEDATE";
        }
          db.query(enqSQL, function(err,result) {
          if (err) {
            throw err;
            return res.redirect('/login');
          }
           res.render('_follow_up_list',{enquiry:result,moment:moment,userId:sess.user_id,userType:sess.user_type,username:sess.username,userImg:sess.user_img});
        });
      }
    }
  });

  /* dashboard console. */
  router.get('/followup_lt/pageNo/:pageNo', function(req, res, next) {
    var sess=req.session;
    var pageNo=req.params.pageNo;
   var pagesize=10;
   var startPage=(pagesize*pageNo)+1;
   var endPage=pagesize;
    var usersSQL="";

    // enqSQL="select a.ENQUIRY_ID,a.STATUS,a.CREATEDATE,a.NEXTDATE,a.TYPE,a.ISNEW,a.COMMENT,a.QTY,a.PRICE,a.IMAGE1,a.IMAGE2,a.IMAGE3,a.IMAGE4,a.IMAGE5,b.LOGON_ID1,c.FIRSTNAME,c.LASTNAME,c.MOBILE1,c.EMAIL1"+
    //       " from enquiry a join user b on b.USER_ID=a.USER_ID join address c on c.MEMBER_ID=b.USER_ID where b.FIELD3='"+sess.user_id+"' order by a.CREATEDATE limit 10";
    if(sess === undefined){
      return res.redirect('/login');
    }else{
      if(sess.user_type !='HOD' && sess.user_type !='A' && sess.user_type !='DT' && sess.user_type !='DL'
          && sess.user_type !='SE'){
        return res.redirect('/login');
      }else{
        if(sess.user_type =='A' || sess.user_type =='HOD'){
          enqSQL="select a.ENQUIRY_ID,a.STATUS,a.CREATEDATE,a.NEXTDATE,a.TYPE,a.ISNEW,a.COMMENT,a.QTY,a.PRICE,a.IMAGE1,a.IMAGE2,a.IMAGE3,a.IMAGE4,a.IMAGE5,b.LOGON_ID1,c.FIRSTNAME,c.LASTNAME,c.MOBILE1,c.EMAIL1"+
          " from enquiry a join user b on b.USER_ID=a.USER_ID join address c on c.MEMBER_ID=b.USER_ID order by a.CREATEDATE limit "+startPage+","+endPage+"";
        }else if(sess.user_type =='SE'){
          enqSQL="select a.ENQUIRY_ID,a.STATUS,a.CREATEDATE,a.NEXTDATE,a.TYPE,a.ISNEW,a.COMMENT,a.QTY,a.PRICE,a.IMAGE1,a.IMAGE2,a.IMAGE3,a.IMAGE4,a.IMAGE5,b.LOGON_ID1,c.FIRSTNAME,c.LASTNAME,c.MOBILE1,c.EMAIL1"+
          " from enquiry a join user b on b.USER_ID=a.USER_ID join address c on c.ADDRESS_ID=a.ADDRESS_ID where b.FIELD3='"+sess.user_id+"' order by a.CREATEDATE limit "+startPage+","+endPage+"";
        }
          db.query(enqSQL, function(err,result) {
          if (err) {
            throw err;
            return res.redirect('/login');
          }
            res.render('_follow_up_list',{enquiry:result,moment:moment,userId:sess.user_id,userType:sess.user_type,username:sess.username,userImg:sess.user_img});
        });
      }
    }
  });


  /* dashboard console. */
  router.post('/followup_ltByName', function(req, res, next) {
    var sess=req.session;
    var name=req.body.name;
    var usersSQL="";
    if(sess === undefined){
      return res.redirect('/login');
    }else{
      if(sess.user_type !='HOD' && sess.user_type !='A' && sess.user_type !='DT' && sess.user_type !='DL'
          && sess.user_type !='SE'){
        return res.redirect('/login');
      }else{

        if(sess.user_type =='A' || sess.user_type =='HOD'){
          enqSQL="select a.ENQUIRY_ID,a.STATUS,a.CREATEDATE,a.NEXTDATE,a.TYPE,a.COMMENT,a.ISNEW,a.QTY,a.PRICE,a.IMAGE1,a.IMAGE2,a.IMAGE3,a.IMAGE4,a.IMAGE5,b.LOGON_ID1,c.FIRSTNAME,c.LASTNAME,c.MOBILE1,c.EMAIL1"+
          " from enquiry a join user b on b.USER_ID=a.USER_ID join address c on c.MEMBER_ID=b.USER_ID WHERE  c.FIRSTNAME LIKE '%"+name+"%' limit 10";
        }else if(sess.user_type =='SE'){
          enqSQL="select a.ENQUIRY_ID,a.STATUS,a.CREATEDATE,a.NEXTDATE,a.TYPE,a.COMMENT,a.ISNEW,a.QTY,a.PRICE,a.IMAGE1,a.IMAGE2,a.IMAGE3,a.IMAGE4,a.IMAGE5,b.LOGON_ID1,c.FIRSTNAME,c.LASTNAME,c.MOBILE1,c.EMAIL1"+
          " from enquiry a join user b on b.USER_ID=a.USER_ID join address c on c.MEMBER_ID=b.USER_ID WHERE b.FIELD3='"+sess.user_id+"' c.FIRSTNAME LIKE '%"+name+"%' limit 10";
        }
          db.query(enqSQL, function(err,result) {
          if (err) {
            throw err;
            return res.redirect('/login');
          }
            res.render('_follow_up_list',{enquiry:result,moment:moment,userId:sess.user_id,userType:sess.user_type,username:sess.username,userImg:sess.user_img});
        });
      }
    }
  });

  router.post('/followup_update', function(req, res, next) {
    var sess=req.session;
    var id=req.body.id;
    var status=req.body.status;
    var nextDate=req.body.nextdate;
    if(sess === undefined){
    return res.redirect('/login');
    }else{
      if(sess.user_type !='HOD' && sess.user_type !='A' && sess.user_type !='DT' && sess.user_type !='DL'
          && sess.user_type !='SE'){
        return res.redirect('/login');
      }else{
        if(status=='F'){
          var enqSQL="UPDATE enquiry SET STATUS='"+status+"',NEXTDATE='"+nextDate+"' WHERE ENQUIRY_ID="+id+"";
        }else if(status=='S'){
          var enqSQL="UPDATE enquiry SET STATUS='"+status+"' WHERE ENQUIRY_ID="+id+"";
        }
        db.query(enqSQL, function(err,result) {
            if (err) {
              throw err;
              return res.redirect('/login');
            }
             return res.redirect('/followup_lt');
          });
      }
    }
  });


  /* dashboard console. */
  router.get('/enquiry_lt', function(req, res, next) {
    var sess=req.session;
    var usersSQL="";
    if(sess === undefined){
      return res.redirect('/login');
    }else{
      if(sess.user_type !='HOD' && sess.user_type !='A' && sess.user_type !='DT' && sess.user_type !='DL'
          && sess.user_type !='SE'){
        return res.redirect('/login');
      }else{
        if(sess.user_type =='A' || sess.user_type =='HOD'){
          enqSQL="select a.ENQUIRY_ID,a.STATUS,a.CREATEDATE,a.NEXTDATE,a.TYPE,a.ISNEW,a.COMMENT,a.QTY,a.QTY_2,a.QTY_3,a.QTY_4,a.QTY_5,a.PRICE,a.PRICE_2,a.PRICE_3,a.PRICE_4,a.PRICE_5,a.IMAGE1,a.IMAGE2,a.IMAGE3,a.IMAGE4,a.IMAGE5,a.IMAGE6,a.ESTIMATED_DELIVERY_DATE,b.LOGON_ID1,c.FIRSTNAME,c.LASTNAME,c.MOBILE1,c.EMAIL1"+
          ", c.ADDRESSLINE1, c.CITY, c.STATE, c.COUNTRY, c.ZIPCODE, c.company, c.gstin from enquiry a join user b on b.USER_ID=a.USER_ID join address c on c.ADDRESS_ID=a.ADDRESS_ID order by a.CREATEDATE";
        }else if(sess.user_type =='SE'){
          enqSQL="select a.ENQUIRY_ID,a.STATUS,a.CREATEDATE,a.NEXTDATE,a.TYPE,a.ISNEW,a.COMMENT,a.QTY,a.QTY_2,a.QTY_3,a.QTY_4,a.QTY_5,a.PRICE,a.PRICE_2,a.PRICE_3,a.PRICE_4,a.PRICE_5,a.IMAGE1,a.IMAGE2,a.IMAGE3,a.IMAGE4,a.IMAGE5,a.IMAGE6,a.ESTIMATED_DELIVERY_DATE,b.LOGON_ID1,c.FIRSTNAME,c.LASTNAME,c.MOBILE1,c.EMAIL1"+
          ", c.ADDRESSLINE1, c.CITY, c.STATE, c.COUNTRY, c.ZIPCODE, c.company, c.gstin from enquiry a join user b on b.USER_ID=a.USER_ID join address c on c.ADDRESS_ID=a.ADDRESS_ID where a.USER_ID='"+sess.user_id+"' order by a.CREATEDATE";
        }
          db.query(enqSQL, function(err,result) {
          if (err) {
            throw err;
            return res.redirect('/login');
          }
           res.render('_enquiry_list',{enquiry:result,moment:moment,userId:sess.user_id,userType:sess.user_type,username:sess.username,userImg:sess.user_img});
        });
      }
    }
  });

  /* dashboard console. */
  router.get('/enquiry_lt/pageNo/:pageNo', function(req, res, next) {
    var sess=req.session;
    var pageNo=req.params.pageNo;
   var pagesize=10;
   var startPage=(pagesize*pageNo)+1;
   var endPage=pagesize;
    var usersSQL="";
    if(sess === undefined){
      return res.redirect('/login');
    }else{
      if(sess.user_type !='HOD' && sess.user_type !='A' && sess.user_type !='DT' && sess.user_type !='DL'
          && sess.user_type !='SE'){
        return res.redirect('/login');
      }else{
        if(sess.user_type =='A' || sess.user_type =='HOD'){
          enqSQL="select a.ENQUIRY_ID,a.STATUS,a.CREATEDATE,a.NEXTDATE,a.TYPE,a.ISNEW,a.COMMENT,a.QTY,a.PRICE,a.IMAGE1,a.IMAGE2,a.IMAGE3,a.IMAGE4,a.IMAGE5,b.LOGON_ID1,c.FIRSTNAME,c.LASTNAME,c.MOBILE1,c.EMAIL1"+
          " from enquiry a join user b on b.USER_ID=a.USER_ID join address c on c.MEMBER_ID=b.USER_ID order by a.CREATEDATE limit "+startPage+","+endPage+"";
        }else if(sess.user_type =='SE'){
          enqSQL="select a.ENQUIRY_ID,a.STATUS,a.CREATEDATE,a.NEXTDATE,a.TYPE,a.ISNEW,a.COMMENT,a.QTY,a.QTY_2,a.QTY_3,a.QTY_4,a.QTY_5,a.PRICE,a.PRICE_2,a.PRICE_3,a.PRICE_4,a.PRICE_5,a.IMAGE1,a.IMAGE2,a.IMAGE3,a.IMAGE4,a.IMAGE5,b.LOGON_ID1,c.FIRSTNAME,c.LASTNAME,c.MOBILE1,c.EMAIL1"+
          " from enquiry a join user b on b.USER_ID=a.USER_ID join address c on c.MEMBER_ID=b.USER_ID where b.FIELD3='"+sess.user_id+"' order by a.CREATEDATE limit "+startPage+","+endPage+"";
        }
          db.query(enqSQL, function(err,result) {
          if (err) {
            throw err;
            return res.redirect('/login');
          }
            res.render('_enquiry_list',{enquiry:result,moment:moment,userId:sess.user_id,userType:sess.user_type,username:sess.username,userImg:sess.user_img});
        });
      }
    }
  });


  /* dashboard console. */
  router.post('/enquiry_ltByName', function(req, res, next) {
    var sess=req.session;
    var name=req.body.name;
    var usersSQL="";
    if(sess === undefined){
      return res.redirect('/login');
    }else{
      if(sess.user_type !='HOD' && sess.user_type !='A' && sess.user_type !='DT' && sess.user_type !='DL'
          && sess.user_type !='SE'){
        return res.redirect('/login');
      }else{

        if(sess.user_type =='A' || sess.user_type =='HOD'){
          enqSQL="select a.ENQUIRY_ID,a.STATUS,a.CREATEDATE,a.NEXTDATE,a.TYPE,a.COMMENT,a.ISNEW,a.QTY,a.PRICE,a.IMAGE1,a.IMAGE2,a.IMAGE3,a.IMAGE4,a.IMAGE5,b.LOGON_ID1,c.FIRSTNAME,c.LASTNAME,c.MOBILE1,c.EMAIL1"+
          " from enquiry a join user b on b.USER_ID=a.USER_ID join address c on c.MEMBER_ID=b.USER_ID WHERE  c.FIRSTNAME LIKE '%"+name+"%' limit 10";
        }else if(sess.user_type =='SE'){
          enqSQL="select a.ENQUIRY_ID,a.STATUS,a.CREATEDATE,a.NEXTDATE,a.TYPE,a.COMMENT,a.ISNEW,a.QTY,a.PRICE,a.IMAGE1,a.IMAGE2,a.IMAGE3,a.IMAGE4,a.IMAGE5,b.LOGON_ID1,c.FIRSTNAME,c.LASTNAME,c.MOBILE1,c.EMAIL1"+
          " from enquiry a join user b on b.USER_ID=a.USER_ID join address c on c.MEMBER_ID=b.USER_ID WHERE b.FIELD3='"+sess.user_id+"' c.FIRSTNAME LIKE '%"+name+"%' limit 10";
        }
          db.query(enqSQL, function(err,result) {
          if (err) {
            throw err;
            return res.redirect('/login');
          }
            res.render('_enquiry_list',{enquiry:result,moment:moment,userId:sess.user_id,userType:sess.user_type,username:sess.username,userImg:sess.user_img});
        });
      }
    }
  });

  router.get('/enquiry_update/id/:id/st/:st', function(req, res, next) {
    var sess=req.session;
    var id=req.params.id;
    var status=req.params.st;
    if(sess === undefined){
    return res.redirect('/login');
    }else{
      if(sess.user_type !='HOD' && sess.user_type !='A' && sess.user_type !='DT' && sess.user_type !='DL'
          && sess.user_type !='SE'){
        return res.redirect('/login');
      }else{
          var enqSQL="UPDATE enquiry SET STATUS='"+status+"' WHERE ENQUIRY_ID="+id+"";

        db.query(enqSQL, function(err,result) {
            if (err) {
              throw err;
              return res.redirect('/login');
            }
             return res.redirect('/enquiry_lt');
          });
      }
    }
  });

  router.get('/geninvoice/id/:id', function(req, res, next) {
    var sess=req.session;
    var orderid=req.params.id;
    //orderid = '10101';
    console.log("--------------------");
    console.log(req.params.id);
    if(sess === undefined){
    return res.redirect('/login');
    }else{
      if(sess.user_type !='HOD' && sess.user_type !='A' && sess.user_type !='DT' && sess.user_type !='DL'
          && sess.user_type !='SE'){
        return res.redirect('/login');
      }else{
          var enq_ins_sql="insert into invoice(ORDER_ID,STATUS,GENERATEDATE,NAME)"+
          " SELECT * FROM (SELECT "+orderid+",'P',CURRENT_TIMESTAMP,'"+orderid+"_INVOICE') AS tmp "+
          " WHERE NOT EXISTS (SELECT ORDER_ID FROM invoice WHERE ORDER_ID ="+orderid+") LIMIT 1";
          var address_sql="select a.ORDER_ID,b.FIRSTNAME,b.LASTNAME,b.ADDRESSLINE1,b.ADDRESSLINE2,b.CITY,b.STATE,b.COUNTRY,"+
          " b.EMAIL1,b.MOBILE1,b.LANDMARK,b.gstin,b.company,b.ZIPCODE,a.MEMBER_ID,a.MEMBER_ID_FOR "+
          " from orders a join address b on b.ADDRESS_ID=a.ADDRESS_ID WHERE a.ORDER_ID="+orderid+"";
          var prd_sql="select a.ORDER_ID,b.ORDERITEM_ID,b.PRICE,c.NAME,b.QUANTITY,b.TOTAL,b.STOTAL from "+
          " orders a join orderitem b on b.ORDER_ID=a.ORDER_ID join product c on c.PRODUCT_ID=b.PRODUCT_ID "+
          " join productconf d on d.PRODUCT_ID=c.PRODUCT_ID WHERE a.ORDER_ID="+orderid+"";
          var ord_sql="select a.REDEEM_POINTS,a.ORDER_ID,a.TAX,a.TOTAL,a.FIELD1,(select SUM(QUANTITY) from orderitem where ORDER_ID=a.ORDER_ID) TQTY from orders a WHERE a.ORDER_ID="+orderid+"";
          var enq_sel_sql="select * from invoice where ORDER_ID="+orderid+"";

        db.query(enq_ins_sql, function(err,result1) {
            if (err) {
              throw err;
              return res.redirect('/login');
            }
            db.query(address_sql, function(err,result2) {
                if (err) {
                  throw err;
                  return res.redirect('/login');
                }
                db.query(prd_sql, function(err,result3) {
                    if (err) {
                      throw err;
                      return res.redirect('/login');
                    }
                    db.query(ord_sql, function(err,result4) {
                        if (err) {
                          throw err;
                          return res.redirect('/login');
                        }
                        db.query(enq_sel_sql, function(err,result5) {
                            if (err) {
                              throw err;
                              return res.redirect('/login');
                            }
 res.render('_invoice',{address:result2,products:result3,ordersdtl:result4,invoice:result5,moment:moment,userId:sess.user_id,userType:sess.user_type,username:sess.username,userImg:sess.user_img});
                          });
                      });
                  });
              });
          });
      }
    }
  });



  router.get('/genappinvoice/id/:id', function(req, res, next) {
    var orderid=req.params.id;
    //orderid = '10101';
    console.log("--------------------");
    console.log(req.params.id);
    
   
      
          var enq_ins_sql="insert into invoice(ORDER_ID,STATUS,GENERATEDATE,NAME)"+
          " SELECT * FROM (SELECT "+orderid+",'P',CURRENT_TIMESTAMP,'"+orderid+"_INVOICE') AS tmp "+
          " WHERE NOT EXISTS (SELECT ORDER_ID FROM invoice WHERE ORDER_ID ="+orderid+") LIMIT 1";
          var address_sql="select a.ORDER_ID,b.FIRSTNAME,b.LASTNAME,b.ADDRESSLINE1,b.ADDRESSLINE2,b.CITY,b.STATE,b.COUNTRY,"+
          " b.EMAIL1,b.MOBILE1,b.LANDMARK,b.gstin,b.company,b.ZIPCODE,a.MEMBER_ID,a.MEMBER_ID_FOR "+
          " from orders a join address b on b.ADDRESS_ID=a.ADDRESS_ID WHERE a.ORDER_ID="+orderid+"";
          var prd_sql="select a.ORDER_ID,b.ORDERITEM_ID,b.PRICE,c.NAME,b.QUANTITY,b.TOTAL,b.STOTAL from "+
          " orders a join orderitem b on b.ORDER_ID=a.ORDER_ID join product c on c.PRODUCT_ID=b.PRODUCT_ID "+
          " join productconf d on d.PRODUCT_ID=c.PRODUCT_ID WHERE a.ORDER_ID="+orderid+"";
          var ord_sql="select a.ORDER_ID,a.TAX,a.TOTAL,a.FIELD1,(select SUM(QUANTITY) from orderitem where ORDER_ID=a.ORDER_ID) TQTY from orders a WHERE a.ORDER_ID="+orderid+"";
          var enq_sel_sql="select * from invoice where ORDER_ID="+orderid+"";

        db.query(enq_ins_sql, function(err,result1) {
            if (err) {
              throw err;
              return err;
            }
            db.query(address_sql, function(err,result2) {
                if (err) {
                  throw err;
                  return err;
                }
                db.query(prd_sql, function(err,result3) {
                    if (err) {
                      throw err;
                      return err;
                    }
                    db.query(ord_sql, function(err,result4) {
                        if (err) {
                          throw err;
                          return err;
                        }
                        db.query(enq_sel_sql, function(err,result5) {
                            if (err) {
                              throw err;
                              return err;
                            }
 res.render('_invoicemobile',{address:result2,products:result3,ordersdtl:result4,invoice:result5,moment:moment,userId:req.params.user_id,userType:req.params.user_type,username:req.params.username,userImg:req.params.user_img});
                          });
                      });
                  });
              });
          });
      
    
  });



  /* complaints console. */
router.get('/complaints', function(req, res, next) {
  var sess=req.session;
  var orderSQL="";
  if(sess === undefined){
    return res.redirect('/login');
  }else{
    if(sess.user_type !='HOD' && sess.user_type !='A' && sess.user_type !='DT' && sess.user_type !='DL'
        && sess.user_type !='SE'){
      return res.redirect('/login');
    }else{
      console.log('user type--------->');
      console.log(sess.user_type);
      if(sess.user_type == 'HOD' || sess.user_type == 'A')
      {
        orderSQL=" SELECT * FROM complaints";
      }else if(sess.user_type == 'DL' || sess.user_type == 'DT')
      {
        orderSQL = "SELECT * FROM complaints WHERE user_id ="+sess.user_id+"";
      }
        
      
       db.query(orderSQL, function(err,result) {
           if (err) {
             throw err;
             return res.redirect('/login');
           }
            res.render('_complaints',{orders:result,userId:sess.user_id,userType:sess.user_type,moment:moment,username:sess.username,userImg:sess.user_img});
         });
    }
  }
});


router.post('/complaint_update', function(req, res, next) {
  var sess=req.session;
  var id=req.body.orderId;
  var status=req.body.status;

  if(sess === undefined){
  return res.redirect('/login');
  }else{
    if(sess.user_type !='HOD' && sess.user_type !='A' && sess.user_type !='DT' && sess.user_type !='DL'
        && sess.user_type !='SE'){
      return res.redirect('/login');
    }else{
      // if(status=='F'){
      //   var enqSQL="UPDATE enquiry SET STATUS='"+status+"',NEXTDATE='"+nextDate+"' WHERE ENQUIRY_ID="+id+"";
      // }else if(status=='S'){
      //   var enqSQL="UPDATE enquiry SET STATUS='"+status+"' WHERE ENQUIRY_ID="+id+"";
      // }
      var enqSQL="UPDATE complaints SET STATUS='"+status+"' WHERE order_id="+id+"";
      db.query(enqSQL, function(err,result) {
          if (err) {
            throw err;
            return res.redirect('/login');
          }
           return res.redirect('/complaints');
        });
    }
  }
});


router.get('/notifications', function(req, res, next) {
  var sess=req.session;
  var get_notifications_query = "select * from notifications where user_id="+sess.user_id+"";
  db.query(get_notifications_query, function(err, results){
    if (err) {
      throw err;
      return res.redirect('/login');
    }
    res.render('_notifications',{notifications:results,userId:sess.user_id,userType:sess.user_type,moment:moment,username:sess.username,userImg:sess.user_img});
  })
  
});


router.post('/delete_discount_ads', function(req, res, next) {
  var sess = req.session;
  var delete_discount_ad_query = "DELETE from "
  const form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files){
        var banner_id = fields.banner_id;
        var delete_discount_ad_query = "DELETE from discount_ads WHERE id ='"+banner_id+"'";
        db.query(delete_discount_ad_query, function(err, result){
          if(err) throw err;
          return res.redirect('/discount_and_ads');
        });
  })
});
router.get('/discount_and_ads', function(req, res, next) {
  var sess = req.session;
  var get_discount_and_ads_query = "SELECT * FROM discount_ads";
  db.query(get_discount_and_ads_query, function(err, results){
    if(err) {
      throw err;
      return res.redirect('/login');
    }
    res.render('_discount_and_ads',{ banners:results,userId:sess.user_id,userType:sess.user_type,moment:moment,username:sess.username,userImg:sess.user_img});
  });
  
});

router.post('/upload_discount_ad', function(req, res, next){
  var sess=req.session;

  const form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files){
        var category = fields.discountadcategory;
        var oldPath = files.discountadfile.path;
        var newPath = "./public/discountads/"+files.discountadfile.name;
        var rawData = fs.readFileSync(oldPath)
      
        fs.writeFile(newPath, rawData, function(err){
            if(err) console.log(err)
            //return res.redirect('/discount_and_ads');
        })
        var insert_discount_ad_query = "insert into discount_ads (filename, CREATETIME, category) values ('"+files.discountadfile.name+"',CURRENT_TIMESTAMP,'"+category+"')";
        db.query(insert_discount_ad_query, function(err, result){
          if(err) throw err;
          return res.redirect('/discount_and_ads');
        });
  })

});


/* upload product from excel */
router.get('/upload_products', function(req, res, next) {
  var sess = req.session;
  if(sess === undefined){
    return res.redirect('/login');
  }else{
    var path = "./public/product_excel/Item_wise_stock_details.xlsx";
    
    readXlsxFile(path).then((rows) => {
      
      // skip header
      rows.shift();

      let products = [];

      rows.forEach((row) => {
        let product = {
          sub_group_level_1: row[0],
          sub_group_level_2: row[1],
          item_no: row[2],
          item_description: row[3],
          in_stock: row[4]
        };

        products.push(product);
      });
      console.log(products);
      res.render('_upload_products',{ products:products,userId:sess.user_id,userType:sess.user_type,moment:moment,username:sess.username,userImg:sess.user_img});
    });                                     
  }
});

router.post('/upload_product_file', function(req, res, next) {
  var sess=req.session;
  const form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files){
        var oldPath = files.productfile.path;
        var newPath = "./public/product_excel/Item_wise_stock_details.xlsx";
        var rawData = fs.readFileSync(oldPath)
        fs.writeFile(newPath, rawData, function(err){
            if(err) console.log(err)
            //return res.redirect('/discount_and_ads');
        })
        
        return res.redirect('/upload_products');
  })
});

/* register complaints */
router.post('/complaints', function(req, res, next) {
  var sess=req.session;
  var order_id=req.body.orderId;
  var user_id = req.body.userId;
  var status='P';
  var order_qty_complain = req.body.order_qty_complain;
  var order_qa_complain = req.body.order_qa_complain;
  var order_delivery_complain = req.body.order_delivery_complain;
  var feedback = req.body.feedback;
  console.log(order_id);
  console.log(status);
  console.log(order_qty_complain);
  console.log(order_qa_complain);
  console.log(order_delivery_complain);
  console.log(feedback);
  var CREATEDATE = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
  var UPDATETIME = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
  



  if(sess === undefined){
  return res.redirect('/login');
  }else{
    if(sess.user_type !='HOD' && sess.user_type !='A' && sess.user_type !='DT' && sess.user_type !='DL'
        && sess.user_type !='SE'){
      return res.redirect('/login');
    }else{
      var sqlstmt = "INSERT INTO complaints (order_id,order_qty_complain,order_qa_complain, order_delivery_complain, CREATETIME, UPDATETIME, feedback, STATUS, user_id) VALUES?";

      var values = [
        [order_id,order_qty_complain, order_qa_complain, order_delivery_complain, CREATEDATE, UPDATETIME, feedback, status, user_id]
      ]
      db.query(sqlstmt, [values], function(err,result) {
          if (err) {
            throw err;
            return res.redirect('/login');
          }
           return res.redirect('/orders');
        });
    }
  }
});





router.get('/rewards', function(req, res, next) {
  var sess=req.session;
  var orderSQL="";
  if(sess === undefined){
    return res.redirect('/login');
  }else{
    if(sess.user_type !='HOD' && sess.user_type !='A' && sess.user_type !='DT' && sess.user_type !='DL'
        && sess.user_type !='SE'){
      return res.redirect('/login');
    }else{
      console.log('user type--------->');
      console.log(sess.user_type);
      if(sess.user_type == 'A')
      {
        orderSQL="SELECT * FROM rewards WHERE id = 1";
      }else if(sess.user_type == 'DT' || sess.user_type == 'DL'){
        orderSQL = "SELECT * FROM user WHERE USER_ID="+sess.user_id+"";
      }
      
       db.query(orderSQL, function(err,result) {
           if (err) {
             throw err;
             return res.redirect('/login');
           }
           console.log(result);
            res.render('_rewards',{rewards:result,userId:sess.user_id,userType:sess.user_type,moment:moment,username:sess.username,userImg:sess.user_img});
         });
    }
  }
});

router.get('/getrewardpoints', function(req, res, next ){
  var sess=req.session;
  var orderSQL="";
  orderSQL = "SELECT * FROM user WHERE USER_ID="+sess.user_id+"";
  db.query(orderSQL, function(err,result) {
    if (err) {
      throw err;
    }
    console.log(result);
    res.json({'data':result[0].usr_reward_points});
  });
});

router.post('/updatecarttotal', function(req, res, next){
  // var sess =  req.session;
  var points = req.body.points;
  var prev_total = req.body.total;
  var total = req.body.total;
  var redeem_status = req.body.redeem_status;
  var cart_id = req.body.cart_id;
  var cartSQL = "";


  console.log(points+' '+total+' '+redeem_status+' '+cart_id);
  if(redeem_status == 'true')
  {
    total =  total - points;
    cartSQL = "UPDATE cart SET TOTAL ="+total+",REDEEM_POINTS ="+points+" WHERE CART_ID ="+cart_id+"";
  }else{
    total = parseInt(total) + parseInt(points);
    cartSQL = "UPDATE cart SET TOTAL ="+total+",REDEEM_POINTS = 0 WHERE CART_ID ="+cart_id+"";
  }


  
  db.query(cartSQL, function(err,result) {
    if (err) {
      throw err;
    }
    console.log(result);
    return res.redirect('/cart');
  });
})


router.post('/updaterewardpoints', function(req, res, next){
  var sess=req.session;
  var reward_points = req.body.points;
  var redeem_status = req.body.redeem_status;

  if( redeem_status == 'true'){
    var updateSQL = "UPDATE user SET usr_reward_points = usr_reward_points - "+reward_points+" WHERE usr_reward_points >= 50 AND USER_ID ="+sess.user_id+"";
  }else{
    var updateSQL = "UPDATE user SET usr_reward_points = usr_reward_points + "+reward_points+" WHERE usr_reward_points >= 50 AND USER_ID ="+sess.user_id+"";
  }

  db.query(updateSQL, function(err, result){
    if(err) {
      throw err;
    }
    console.log(result);
    return res.json({'data':result});
  });
});

router.post('/update_reward', function(req, res, next) {
  var sess=req.session;
  var reward_points = req.body.reward_points;
  var reward_cost = req.body.reward_cost;
  var allowed_rewards = req.body.allowed_points;
  var reward_status = req.body.reward_status;
  var CREATEDATE = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
  var UPDATETIME = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');

  if(reward_status === 'Inactive')
  {
    reward_status = 'I';
  }else{
    reward_status = 'A'
  }

  var query = 'UPDATE rewards SET reward_point = ?, cost_per_reward = ?, UPDATETIME = ?, STATUS = ?, ALLOWED_REWARD_POINTS = ? WHERE id = 1';

  var values = [
    [ ]
  ]
  db.query(query, [reward_points,reward_cost,UPDATETIME,reward_status,allowed_rewards], function(err,result) {
    if (err) {
      throw err;
      return res.redirect('/login');
    }
     return res.redirect('/rewards');
  });

});

module.exports = router;
