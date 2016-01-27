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
				$('#resultText').html(result);
				 	var string = result.split('*');
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
						if(result == 'error decoding QR Code')
							{
							alert(result+ '. Please try again.');
							}
						else if (response.error == '1' && result != 'error decoding QR Code') {
							alert ('Attendance taken correctly!.');
							$('.click').removeClass("list-group-item-success");
							$('.click').addClass("list-group-item-info");
							$('.click').find('span').removeClass( "glyphicon glyphicon-camera" );
							$('.click').find('span').addClass( "glyphicon glyphicon-ok" );
							$('#fileInput').remove();
						} else if(response.error == '0' && result != 'error decoding QR Code'){
							alert ('Error at taking attendance.');
						}
					}
				});
			});
  		})
	});
}

window.onload = onLoadHandler;

