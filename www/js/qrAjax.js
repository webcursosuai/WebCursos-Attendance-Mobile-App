/*
 * 
 * 
 */
var CANVAS_IMAGE_WIDTH = 100;
var reader = new FileReader();

function loadImage(src, callback){
	var img = new Image();
	img.onload = function(){
		callback(img);
	};
	img.src = src;
}

function decodeQRCode(src, callback){
	qrcode.callback = callback;
 	qrcode.decode(src);
}

function onLoadHandler(){
	var $fileInput = $('#fileInput');
	$fileInput.on('change', function() {
		var file = $fileInput.get(0).files[0];
		var src = (window.URL || window.webkitURL).createObjectURL(file);
  		loadImage(src, function(image){
  			
			decodeQRCode(src, function(result){
			var resultElement = $('#resultText');
				try{
					resultElement.html(result);
				}catch(e){
					resultElement.html(result);
				}
				//ajax to take attendance 
				$('#resultText').html(result);
				 	var string = result.split('*');
				  	//string[0] = URL(comes without / at end), string[1] = sessid, string[2] = attid
				  	var urlajax = string[0]+"/mod/attendance/mobile/requests.php";
				  	var sessionid = string[1];
				  	var attendanceid = string[2];
					var username = localStorage.getItem("user");
                    var password = localStorage.getItem("pass");
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
						'sessionid': sessionid,
						'attendanceid': attendanceid
					},
					success : function(
							response) {
						if (response.error == 'Attendance Taken Correctly!') {
							alert (response.error);	
						} else {
							alert ('Error at taking attendance');
						}
					}
				});
			});
  		})
	});
}

window.onload = onLoadHandler;

