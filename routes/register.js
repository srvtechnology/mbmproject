var express = require('express');
var router = express.Router();
var moment = require('moment');
var formidable = require("formidable");
var fs = require("fs");
var db = require('../config/database');
var data;

(function () {
  db.query('select topcategoryid,identifier,name,field1,field2 from topcategory  where ?',{status: '1'}, function(err,result) {
      if (err) throw err;
      data=result;
    });
})();

router.post('/register', function(req,res,next){
  var sess=req.session;
  var fname=req.body.fname;
  var lname=req.body.lname;
  var gstin=req.body.gstin;
  var pan=req.body.panno;
  var role=req.body.role;
  var from=req.body.from;
  var mobile=req.body.mobile1;
  var email=req.body.email1;
  var logonid=req.body.logonId;
  var password=req.body.password;
  var address1=req.body.address1;
  var country=req.body.country;
  var state=req.body.state;
  var city=req.body.city;
  var zipcode=req.body.zipcode;
  var companyname=req.body.compnay;
  var phone=req.body.phone1;
  const buf = Buffer.from(password);
  var base64passkey=buf.toString('base64');
  if(sess === undefined){
  return res.redirect('/login');
  }else{
    if(sess.user_type !='HOD' && sess.user_type !='A' && sess.user_type !='DT' && sess.user_type !='DL'
        && sess.user_type !='SE'){
      return res.redirect('/login');
    }else{
      if(from =='A'){
        var userSQL="insert into user(user_type,status,logon_id1,logon_id2,logon_id3,password,passwordstate,retrycount,FIELD2) " +
        "values('A','1','"+logonid+"','"+mobile+"','"+email+"','"+base64passkey+"','1',0,'M');";
        userSQL+="insert into usrrole(user_id,role_id) values((select USER_ID from user where LOGON_ID1='"+logonid+"'),(select role_id from role where IDENTIFIER='"+role+"'));";
        userSQL+="insert into address(member_id,firstname,lastname,addressline1,city,state,country,zipcode,email1,mobile1,mobile1code,panno,company,gstin,phone1,ADDRESSTYPE,ADDRESSFOR) "+
        " values((select USER_ID from user where LOGON_ID1='"+logonid+"'),'"+fname+"','"+lname+"','"+address1+"','"+city+"','"+state+"','"+country+"','"+zipcode+"','"+email+"','"+mobile+"','+91','"+pan+"','"+companyname+"','"+gstin+"','"+phone+"','O','SB');";
      }else if(from =='SE'){
        var userSQL="insert into user(user_type,status,logon_id1,logon_id2,logon_id3,password,passwordstate,retrycount,FIELD2) " +
        "values('A','0','"+logonid+"','"+mobile+"','"+email+"','"+base64passkey+"','1',0,'L');";
        userSQL+="insert into usrrole(user_id,role_id) values((select USER_ID from user where LOGON_ID1='"+logonid+"'),(select role_id from role where IDENTIFIER='"+role+"'));";
        userSQL+="insert into address(member_id,firstname,lastname,addressline1,city,state,country,zipcode,email1,mobile1,mobile1code,panno,company,gstin,phone1,ADDRESSTYPE,ADDRESSFOR) "+
        " values((select USER_ID from user where LOGON_ID1='"+logonid+"'),'"+fname+"','"+lname+"','"+address1+"','"+city+"','"+state+"','"+country+"','"+zipcode+"','"+email+"','"+mobile+"','+91','"+pan+"','"+companyname+"','"+gstin+"','"+phone+"','O','SB');";
      }
      db.query(userSQL,function(err,result) {
          if (err) {
            throw err;
          }
          else{
            res.redirect('/')
          }
        });
    }
  }
});

router.post('/register_update', function(req,res,next){
  var sess=req.session;
  var fname=req.body.fname;
  var lname=req.body.lname;
  var gstin=req.body.gstin;
  var pan=req.body.panno;
  var user_id=req.body.userId;
  var mobile=req.body.mobile1;
  var email=req.body.email1;
  var address1=req.body.address1;
  var country=req.body.country;
  var state=req.body.state;
  var city=req.body.city;
  var zipcode=req.body.zipcode;
  var companyname=req.body.compnay;
  var phone=req.body.phone1;

  if(sess === undefined){
  return res.redirect('/login');
  }else{
    if(sess.user_type !='HOD' && sess.user_type !='A' && sess.user_type !='DT' && sess.user_type !='DL'
        && sess.user_type !='SE'){
      return res.redirect('/login');
    }else{
      var  userSQL="update address set FIRSTNAME='"+fname+"',LASTNAME='"+lname+"',ADDRESSLINE1='"+address1+"',CITY='"+city+"',"+
      " STATE='"+state+"',COUNTRY='"+country+"',ZIPCODE='"+zipcode+"',EMAIL1='"+email+"',PHONE1='"+phone+"',MOBILE1='"+mobile+"'"+
      ",PANNO='"+pan+"',company='"+companyname+"',gstin='"+gstin+"' where MEMBER_ID="+user_id+"";
      db.query(userSQL,function(err,result) {
          if (err) {
            throw err;
          }
          else{
            res.redirect('/')
          }
        });
    }
  }
});


router.post('/profile_register_update', function(req,res,next){
  var sess=req.session;
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
  var fname=fields.fname;
  var lname=fields.lname;
  var gstin=fields.gstin;
  var pan=fields.panno;
  var user_id=fields.userId;
  var mobile=fields.mobile1;
  var email=fields.email1;
  var address1=fields.address1;
  var country=fields.country;
  var state=fields.state;
  var city=fields.city;
  var zipcode=fields.zipcode;
  var companyname=fields.compnay;
  var phone=fields.phone1;

  if(sess === undefined){
  return res.redirect('/login');
  }else{
    if(sess.user_type !='HOD' && sess.user_type !='A' && sess.user_type !='DT' && sess.user_type !='DL'
        && sess.user_type !='SE'){
      return res.redirect('/login');
    }else{
      var  userSQL="update address set FIRSTNAME='"+fname+"',LASTNAME='"+lname+"',ADDRESSLINE1='"+address1+"',CITY='"+city+"',"+
      " STATE='"+state+"',COUNTRY='"+country+"',ZIPCODE='"+zipcode+"',EMAIL1='"+email+"',PHONE1='"+phone+"',MOBILE1='"+mobile+"'"+
      ",PANNO='"+pan+"',company='"+companyname+"',gstin='"+gstin+"' where MEMBER_ID="+user_id+"";
      db.query(userSQL,function(err,result) {
          if (err) {
            throw err;
            return res.redirect('/login');
          }
          else{
            var profileImgSQL="UPDATE user set FIELD1='"+pimage+"' WHERE USER_ID="+sess.user_id+"";
            db.query(profileImgSQL, function(err,result) {
                if (err) {
                  throw err;
                  return res.redirect('/login');
                }
                return res.redirect('/profile');
              });
          }
        });
       }
    }
});
});

router.post('/register_se', function(req,res,next){
  var sess=req.session;

  var formData = new formidable.IncomingForm();
  formData.parse(req, function (error, fields, files) {
      var newPath1 = "./public/images/enquiry/" + files.inputImage1.name;
      var oldPath1=files.inputImage1.path;
      var imageName1=files.inputImage1.name;
      var newPath2 = "./public/images/enquiry/" + files.inputImage2.name;
      var oldPath2=files.inputImage2.path;
      var imageName2=files.inputImage2.name;
      var newPath3 = "./public/images/enquiry/" + files.inputImage3.name;
      var oldPath3=files.inputImage3.path;
      var imageName3=files.inputImage3.name;
      var newPath4= "./public/images/enquiry/" + files.inputImage4.name;
      var oldPath4=files.inputImage4.path;
      var imageName4=files.inputImage4.name;
      var newPath5 = "./public/images/enquiry/" + files.inputImage5.name;
      var oldPath5=files.inputImage5.path;
      var imageName5=files.inputImage5.name;
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
  var prdQty=fields.prdQty;
  var prdPrice=fields.prdPrice;
  var createdate=fields.createdate;
  var followUpDate=fields.followUpDate;
  var exeComment=fields.exeComment;
  const buf = Buffer.from(password);
  var base64passkey=buf.toString('base64');
  if(sess === undefined){
  return res.redirect('/login');
  }else{
    if(sess.user_type !='HOD' && sess.user_type !='A' && sess.user_type !='DT' && sess.user_type !='DL'
        && sess.user_type !='SE'){
      return res.redirect('/login');
    }else{

        var userSQL="insert into user(user_type,status,logon_id1,logon_id2,logon_id3,password,passwordstate,retrycount,FIELD2,FIELD3) " +
        "values('A','0','"+logonid+"','"+mobile+"','"+email+"','"+base64passkey+"','1',0,'L','"+sess.user_id+"');";
        userSQL+="insert into usrrole(user_id,role_id) values((select USER_ID from user where LOGON_ID1='"+logonid+"'),(select role_id from role where IDENTIFIER='"+role+"'));";
        userSQL+="insert into address(member_id,firstname,lastname,addressline1,city,state,country,zipcode,email1,mobile1,mobile1code,panno,company,gstin,phone1,ADDRESSTYPE,ADDRESSFOR) "+
        " values((select USER_ID from user where LOGON_ID1='"+logonid+"'),'"+fname+"','"+lname+"','"+address1+"','"+city+"','"+state+"','"+country+"','"+zipcode+"','"+email+"','"+mobile+"','+91','"+pan+"','"+companyname+"','"+gstin+"','"+phone+"','O','SB');";
          userSQL+="insert into enquiry(USER_ID,STATUS,CREATEDATE,NAME,TYPE,QTY,PRICE,IMAGE1,IMAGE2,IMAGE3,IMAGE4,IMAGE5,IMAGE6,COMMENT,ISNEW,NEXTDATE)"+
          "value((select USER_ID from user where LOGON_ID1='"+logonid+"'),'P','"+createdate+"','Enquiry',"+
          "'"+enqType+"','"+prdQty+"','"+prdPrice+"','"+catalogImage+"','"+imageName1+"','"+imageName2+"','"+imageName3+"','"+imageName4+"','"+imageName5+"','"+exeComment+"','N','"+followUpDate+"');";
      db.query(userSQL,function(err,result) {
          if (err) {
            throw err;
          }
          else{
            res.redirect('/')
          }
        });
    }
  }
});
});







router.post('/enquiry_submit', function(req,res,next){
  var sess=req.session;

  var formData = new formidable.IncomingForm();
  formData.parse(req, function (error, fields, files) {
      var newPath1 = "./public/images/enquiry/" + files.inputImage1.name;
      var oldPath1=files.inputImage1.path;
      var imageName1=files.inputImage1.name;
      var newPath2 = "./public/images/enquiry/" + files.inputImage2.name;
      var oldPath2=files.inputImage2.path;
      var imageName2=files.inputImage2.name;
      var newPath3 = "./public/images/enquiry/" + files.inputImage3.name;
      var oldPath3=files.inputImage3.path;
      var imageName3=files.inputImage3.name;
      var newPath4= "./public/images/enquiry/" + files.inputImage4.name;
      var oldPath4=files.inputImage4.path;
      var imageName4=files.inputImage4.name;
      var newPath5 = "./public/images/enquiry/" + files.inputImage5.name;
      var oldPath5=files.inputImage5.path;
      var imageName5=files.inputImage5.name;
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
  var prdQty_1=fields.inputQty1;
  var prdQty_2=fields.inputQty2;
  var prdQty_3=fields.inputQty3;
  var prdQty_4=fields.inputQty4;
  var prdQty_5=fields.inputQty5;
  var prdPrice_1=fields.inputPrice1;
  var prdPrice_2=fields.inputPrice2;
  var prdPrice_3=fields.inputPrice3;
  var prdPrice_4=fields.inputPrice4;
  var prdPrice_5=fields.inputPrice5;
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
  var createdate=fields.createdOn;
  var followUpDate=fields.followUpDate;
  var exeComment=fields.exeComment;
  const buf = Buffer.from(password);
  var base64passkey=buf.toString('base64');
  if(sess === undefined){
  return res.redirect('/login');
  }else{
    if(sess.user_type !='HOD' && sess.user_type !='A' && sess.user_type !='DT' && sess.user_type !='DL'
        && sess.user_type !='SE'){
      return res.redirect('/login');
    }else{
      var address_id = 0;
      var insertContactDetailsQuery = "insert into address(firstname,lastname,addressline1,city,state,country,zipcode,email1,mobile1,mobile1code,panno,company,gstin,phone1,ADDRESSTYPE,ADDRESSFOR) "+
      " values('"+fname+"','"+lname+"','"+address1+"','"+city+"','"+state+"','"+country+"','"+zipcode+"','"+email+"','"+mobile+"','+91','"+pan+"','"+companyname+"','"+gstin+"','"+phone+"','O','SB');";
         db.query(insertContactDetailsQuery,function(err,result) {
          if (err) throw err;
            address_id = result.insertId;
            console.log(result.insertId);
            console.log(address_id);
            var insertEnquiryDetailsQuery = "insert into enquiry(USER_ID,STATUS,CREATEDATE,NAME,TYPE,QTY,QTY_2,QTY_3,QTY_4,QTY_5,PRICE,PRICE_2,PRICE_3,PRICE_4,PRICE_5,IMAGE1,IMAGE2,IMAGE3,IMAGE4,IMAGE5,IMAGE6,COMMENT,ISNEW,NEXTDATE,ADDRESS_ID)"+
            "value('"+sess.user_id+"','P','"+createdate+"','Enquiry',"+
            "'"+enqType+"','"+prdQty_1+"','"+prdQty_2+"','"+prdQty_3+"','"+prdQty_4+"','"+prdQty_5+"','"+prdPrice_1+"','"+prdPrice_2+"','"+prdPrice_3+"','"+prdPrice_4+"','"+prdPrice_5+"','"+catalogImage+"','"+imageName1+"','"+imageName2+"','"+imageName3+"','"+imageName4+"','"+imageName5+"','"+exeComment+"','N','"+followUpDate+"','"+address_id+"');";
    
            db.query(insertEnquiryDetailsQuery,function(err,result) {
              if (err) {
                throw err;
              }
              else{
                res.redirect('/');
              }
            });
        });
    }
  }
});
});


router.post('/mbm_product_enquiry_submit', function(req,res,next){
  var sess=req.session;

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
  if(sess === undefined){
  return res.redirect('/login');
  }else{
    if(sess.user_type !='HOD' && sess.user_type !='A' && sess.user_type !='DT' && sess.user_type !='DL'
        && sess.user_type !='SE'){
      return res.redirect('/login');
    }else{
      var address_id = 0;
      var insertContactDetailsQuery = "insert into address(firstname,lastname,addressline1,city,state,country,zipcode,email1,mobile1,mobile1code,panno,company,gstin,phone1,ADDRESSTYPE,ADDRESSFOR) "+
      " values('"+fname+"','"+lname+"','"+address1+"','"+city+"','"+state+"','"+country+"','"+zipcode+"','"+email+"','"+mobile+"','+91','"+pan+"','"+companyname+"','"+gstin+"','"+phone+"','O','SB');";
         db.query(insertContactDetailsQuery,function(err,result) {
          if (err) throw err;
            address_id = result.insertId;
            console.log(result.insertId);
            console.log(address_id);
            var insertEnquiryDetailsQuery = "insert into enquiry(USER_ID,STATUS,CREATEDATE,NAME,TYPE,QTY,QTY_2,QTY_3,QTY_4,QTY_5,PRICE,PRICE_2,PRICE_3,PRICE_4,PRICE_5,IMAGE1,IMAGE2,IMAGE3,IMAGE4,IMAGE5,IMAGE6,COMMENT,ISNEW,NEXTDATE,ADDRESS_ID)"+
            "value('"+sess.user_id+"','P','"+createdate+"','Enquiry',"+
            "'"+enqType+"','"+prdQty_1+"','"+prdQty_2+"','"+prdQty_3+"','"+prdQty_4+"','"+prdQty_5+"','"+prdPrice_1+"','"+prdPrice_2+"','"+prdPrice_3+"','"+prdPrice_4+"','"+prdPrice_5+"','"+catalogImage+"','"+imageName1+"','"+imageName2+"','"+imageName3+"','"+imageName4+"','"+imageName5+"','"+exeComment+"','N','"+followUpDate+"','"+address_id+"');";
    
            db.query(insertEnquiryDetailsQuery,function(err,result) {
              if (err) {
                throw err;
              }
              else{
                res.redirect('/')
              }
            });
        });
    }
  }
});
});

module.exports = router;
