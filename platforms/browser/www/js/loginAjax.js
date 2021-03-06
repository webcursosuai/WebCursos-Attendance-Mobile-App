/*
 * 
 * 
 */
$(document).ready(function() {
	if (localStorage.getItem("user")) {
		window.location.replace("sessions.html");
	} else {
		$(".btnsubmit").click(function() {
		var user = $('#userinput').val();
		var pass = $('#passwordinput').val();
			jQuery.ajax({
			url : "https://webcursos-d.uai.cl/mod/attendance/mobile/requests.php",
			async : false,
			dataType : 'jsonp',
			jsonp : 'callback',
			contentType : "application/json",
			data : {
				'username' : user,
				'password' : pass,
				'action' : 'login'
			},
			success : function(response) {
				if (response.error == 'Valid login') {
					localStorage.setItem("user",user);
					localStorage.setItem("pass",pass);
					window.location.replace("sessions.html");
				} else {
					$('#respuesta').html('<div class="error">' + response.error + '</div>');
					$('.input-group').addClass('has-error');
                    $( ".container" ).effect( "shake" );
				}

			}
			});
		});

	}
});