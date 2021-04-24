const cron = require('node-cron');
var db = require('../config/database');

module.exports = {
    enquiryCronJob: function() {
        cron.schedule('* * * 30 * *', function() {
            console.log('removing enquiry every 30 days');
        });     
    },
    updatePaymentDueDays: function() {
        cron.schedule('0 0 0 * * *', function() {
            var get_orders_query = "select * from orders where STATUS='D'";
            db.query(get_orders_query, function(err, orderresulsts){
                if(err) throw err;
                orderresulsts.forEach(order => {
                    var updatetime = order.UPDATETIME;
                    var current_time = new Date();
                    var time_diff = Math.abs(current_time - updatetime);
                    var days_diff = Math.ceil(time_diff/(1000*60*60*24));
                    var user_id = order.MEMBER_ID_FOR;
                    var user_role = '';
                    console.log("executing operation on order id: "+order.ORDER_ID);
                    if(days_diff%5 === 0){
                        console.log('updating notifications every 12am midnight sec for order_id'+order.ORDER_ID);
                        var insert_query = "insert into notifications (user_id,order_id,notification_content,CREATEDATE) values ('"+user_id+"','"+order.ORDER_ID+"','You passed permissible payment due date by "+days_diff+", kindly payback!',CURRENT_TIMESTAMP)";
                        db.query(insert_query, function(err, result) {
                            if(err) throw err;
                            console.log("inserted notification");
                        });
                    }
                    if(order.PAYMENT_CLEARANCE_STATUS === 0){
                        var order_id = order.ORDER_ID;
                        var update_order_due_date = "update orders SET PAYMENT_DUE_DAYS_COUNT = '"+days_diff+"' where ORDER_ID = '"+order_id+"'";
                        db.query(update_order_due_date, function(err, result) {
                            if(err) throw err;
                            console.log("updated order payment due days for order id: "+order_id);
                        });
                    }
                });
            });
            
        });
    }
};
