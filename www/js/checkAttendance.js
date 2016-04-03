/*
 * 
 * 
 */
	function checkAttendance(){
		if(localStorage.getItem("taken")){
	
		if ( localStorage.getItem("taken") == 'Perfect'){
			alert ('Attendance taken correctly!.');
			$('.click').removeClass("list-group-item-success");
			$('.click').addClass("list-group-item-info");
			$('.click').find('span').removeClass( "glyphicon glyphicon-camera" );
			$('.click').find('span').addClass( "glyphicon glyphicon-ok" );
			localStorage.removeItem("taken");
			//$('#startScan').remove();
		}
		else if (localStorage.getItem("taken") == 'Error'){
			alert('Error at taking attendance. Please try again');
			$('.click').removeClass("list-group-item-success");
			$('.click').addClass("list-group-item-danger");
			localStorage.removeItem("taken");
		}
		}
	}

$(document).ready(function() {
//refresh every x seconds
setInterval(checkAttendance,3000); 
});