var express = require('express');
var router = express.Router();
var db = require('../config/database');
var emailer = require('../config/emailers');
var const_data = require('../config/const');
var data;
global.RewardsPoints = 0;
global.RewardCostPoint = 0;
global.cartTotal = 0;
global.existingRewardPoint = 0;
(function () {
  db.query('select topcategoryid,identifier,name,field1,field2 from topcategory  where ?',{status: '1'}, function(err,result) {
      if (err) throw err;
      data=result;
    });
})();


/* GET state data. */
router.get('/getJurst/country/:country', function(req, res, next) {
  var country=req.params.country;
 var getState="select identifier,displayname from jurst where type='STAT' and country='"+country+"'";
  db.query(getState,function(err,result) {
      if (err) throw err;
      res.json({'data':result});
    });
});

/* GET city data. */
router.get('/getJurst/state/:state', function(req, res, next) {
  var state=req.params.state;
 var getCity="select identifier,displayname from jurst where type='CITY' and state='"+state+"'";
  db.query(getCity, function(err,result) {
      if (err) throw err;
      res.json({'data':result});
    });
});

/* GET MEMBER DETAILS */
router.get('/getMemberDetails/memberid/:memberid', function(req, res, next) {
  var memberid=req.params.memberid;
 var getMember="select * from address where MEMBER_ID='"+memberid+"'";
 var getRole = "select a.USER_ID, b.NAME from usrrole a, role b WHERE a.ROLE_ID = b.ROLE_ID AND a.USER_ID='"+memberid+"'";
  db.query(getMember, function(err,result1) {
    db.query(getRole, function(err,result2) {
      if (err) throw err;
      res.json({'data':result1, 'roledetails': result2});
    });
  });
});


/**Place order*/
router.get('/updateCart/prd/:prdId/qty/:qty/price/:price/cartId/:cartId/cartDtlId/:cartDtlId', function(req, res, next) {
  var sess=req.session;
  var pid=req.params.prdId;
  var qty=req.params.qty;
  var price=req.params.price;
  var cart_id=req.params.cartId;
  var cartdtl_id=req.params.cartDtlId;
  var total=price * qty;

  if(sess === undefined){
  res.json({'updated':false});
  }else{
    if(sess.user_type !='DT' && sess.user_type !='DL'
        && sess.user_type !='SE'){
    res.json({'updated':false});
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
        res.json({'updated':false});
       }
       db.query(cartUpdateSQL1, function(err,result) {
           if (err)
          {
           throw err;
           res.json({'updated':false});
          }
       res.json({'updated':true});
     });
  });
  }
  }
  });


  /**Place order*/
  router.get('/place_order/cartId/:cartId/memberFor/:memberFor', function(req, res, next) {
    var sess=req.session;
    var cartId=req.params.cartId;
    var memberFor=req.params.memberFor;
    var username;
    var pid;
    var email;
    var mobile;
    var productname;
    var producturl;
    var productpdf;

    if(sess === undefined){
    res.json({'updated':false});
    }else{
      if(sess.user_type !='DT' && sess.user_type !='DL'
          && sess.user_type !='SE'){
      res.json({'updated':false});
      }else{
        var getExistingRewardPoint = "SELECT usr_reward_points FROM user WHERE USER_ID ="+sess.user_id+"";
        db.query(getExistingRewardPoint, function(err, result){
          if(err)
          {
            throw err;
          }
          global.existingRewardPoint = result[0].usr_reward_points;
        });
         var getRewardPointsQuery = "SELECT reward_point,cost_per_reward FROM rewards WHERE id = 1";
        
         db.query(getRewardPointsQuery, function(err, result){
          if(err)
          {
            throw err;
          }
          console.log(result);
          global.RewardsPoints = result[0].reward_point;
          global.RewardCostPoint = result[0].cost_per_reward;
          console.log(global.RewardsPoints);
          console.log(global.RewardCostPoint);
          var getCartTotal = "select TOTAL from cart WHERE CART_ID="+cartId+"";
         db.query(getCartTotal, function(err, result){
          if(err)
          {
            throw err;
          }
          console.log(result);
          global.cartTotal = result[0].TOTAL;
          
          console.log(global.cartTotal);
          var totalrewardpoints = (global.cartTotal / global.RewardCostPoint) * global.RewardsPoints;
          console.log(global.RewardsPoints);
          console.log(global.RewardCostPoint);
          console.log(totalrewardpoints);
          totalrewardpoints = Math.ceil(totalrewardpoints)+global.existingRewardPoint;

          var updateRewardPoints = "UPDATE user SET usr_reward_points = "+totalrewardpoints+" WHERE USER_ID ="+sess.user_id+"";
          db.query(updateRewardPoints, function(err, result){
            if(err)
            {
              throw err;
            }
            console.log(result);
           
          });
         });
         });

         

         
         
        var orderSQL="insert into orders(address_id,member_id,MEMBER_ID_FOR,status,TAX,DISCOUNT,TOTAL,FIELD1,CREATETIME, REDEEM_POINTS) value("+
        "(select address_id from address where MEMBER_ID="+memberFor+" AND ADDRESSFOR='SB'),"+sess.user_id+","+memberFor+",'P', "+
        " (select FIELD2 from cart WHERE CART_ID="+cartId+"),'', "+
        " (select TOTAL from cart WHERE CART_ID="+cartId+"),(select FIELD1 from cart WHERE CART_ID="+cartId+"),CURRENT_TIMESTAMP, (select REDEEM_POINTS from cart WHERE CART_ID="+cartId+"))";
        db.query(orderSQL, function(err,result) {
          if (err)
         {
          throw err;
          res.json({'updated':false});
         }
         var cartdtlSQL="select * from cartdtl where cart_id="+cartId+" AND STATUS='P'";
         db.query(cartdtlSQL, function(err,cartdetails) {
           if (err)
          {
           throw err;
           res.json({'updated':false});
          }
          cartdetails.forEach(function(element){
            var orderitemSQL="insert into orderitem (order_id,product_id,address_id,price,"+
            " quantity,total,status,member_id,MEMBER_ID_FOR,PSPARE_IDS,PSPARE_PRICE,PSPARE_TOTAL_PRICE,STOTAL)"+
            " value((select order_id from orders order by order_id desc limit 1),"+element.PRODUCT_ID+","+
            "(select address_id from address where MEMBER_ID="+memberFor+" AND ADDRESSFOR='SB'),'"+element.FIELD1+"',"+
            " '"+element.QTY+"','"+element.FIELD1+"','P',"+sess.user_id+","+memberFor+",'"+element.pspare_id+"','"+element.PSPARE_PRICE+"','"+element.FIELD2+"','"+element.TOTAL+"')"
           var updateInvSQL="update productconf set INVENTORY=INVENTORY-"+element.QTY+" WHERE PRODUCT_ID="+element.PRODUCT_ID+"";
            db.query(orderitemSQL, function(err,result1) {
              if (err)
             {
              throw err;
              res.json({'updated':false});
             }
             db.query(updateInvSQL, function(err,resultinvupdate) {
               if (err)
              {
               throw err;
               res.json({'updated':false});
              }
               });
              });
            });
            var cartEmptySQL="DELETE FROM cartdtl WHERE CART_ID="+cartId+"";
             db.query(cartEmptySQL, function(err,result2) {
               if (err)
              {
               throw err;
               res.json({'updated':false});
              }
              var cartEmptySQL1="DELETE FROM cart WHERE CART_ID="+cartId+"";
              db.query(cartEmptySQL1, function(err,result3) {
                if (err)
               {
                throw err;
                res.json({'updated':false});
               }
               res.json({'updated':true});
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


module.exports = router;
