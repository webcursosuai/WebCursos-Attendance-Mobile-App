$( "#startScan" ).click(function() {
	cordova.plugins.barcodeScanner.scan(
		function (result) {
			var s = "Result: " + result.text + "<br/>" +
			"Format: " + result.format + "<br/>" +
			"Cancelled: " + result.cancelled;
			//alert(s);
			
			//code that takes attendance on webcursos
			var resulttext = result.text;
			var string = resulttext.split('*');
		  	//string[0] = URL(comes without / at end), string[1] = sessid, string[2] = attid
		  	var urlajax = string[0]+"/mod/attendance/mobile/requests.php";
		  	var sessionid = string[1];
		  	var attendanceid = string[2];
			var username = localStorage.getItem("user");
            var password = localStorage.getItem("pass");
            //checks wheter you are late or not (0 = not,1 = late)
            var late = $('.list-group-item-success').attr('late');
          //ajax to take attendance 
		jQuery
		.ajax({

			url : urlajax,
			async : false,
			dataType : 'jsonp',
			jsonp : 'callback',
			contentType : "application/json",

			data : {
				'username' : username,
				'password' : password,
				'action' : 'attendance',
				'sessionid' : sessionid,
				'attendanceid' : attendanceid,
				'late' : late
			},
			success : function(
					response) {
				 if (response.error == '1') {
					 var correct = "1";
				
				} else if(response.error == '0'){
					alert('Error at taking attendance.');
				}
			}
		});
		}, 
		function (error) {
			alert("Scanning failed: " + error);
		}
	);
	if ( correct == '1'){
		alert ('Attendance taken correctly!.');
		$('.click').removeClass("list-group-item-success");
		$('.click').addClass("list-group-item-info");
		$('.click').find('span').removeClass( "glyphicon glyphicon-camera" );
		$('.click').find('span').addClass( "glyphicon glyphicon-ok" );
		//$('#startScan').remove();
	}
	else{
		alert('Error at taking attendance.');
	}
});