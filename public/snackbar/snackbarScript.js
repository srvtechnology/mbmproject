
function redeemPointAdded(){
    var x = document.getElementById("snackbar");
    $('#snackbar').css('background', '#C70039');
	$('#snackbar').html('Redeem point being added');
  x.className = "show";
  setTimeout(function(){ x.className = x.className.replace("show", ""); }, 2000);
}


function redeemPointRemoved(){
    var x = document.getElementById("snackbar");
    $('#snackbar').css('background', '#C70039');
	$('#snackbar').html('Redeem point being Removed');
  x.className = "show";
  setTimeout(function(){ x.className = x.className.replace("show", ""); }, 2000);
}


function placingOrder(){
    var x = document.getElementById("snackbar");
    $('#snackbar').css('background', '#C70039');
	$('#snackbar').html('Placing Order!');
  x.className = "show";
  setTimeout(function(){ x.className = x.className.replace("show", ""); }, 2000);
}



function welcomeAdmin(userType){
  var x = document.getElementById("snackbar");
  $('#snackbar').css('background', '#4caf50');
  if(userType === 'A'){
    $('#snackbar').html('Welcome Admin!');
  }else if(userType === 'DT'){
    $('#snackbar').html('Welcome Distributor!');
  }else if(userType === 'SE'){
    $('#snackbar').html('Welcome Sales Executive!');
  }else if(userType === 'DL'){
    $('#snackbar').html('Welcome Dealer!');
  }else{
    $('#snackbar').html('Welcome user!');
  }
 
  x.className = "show";
  setTimeout(function(){ x.className = x.className.replace("show", ""); }, 2000);
}