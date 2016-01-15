/*
 * 
 * 
 */
$(document).ready(function() {
        			//set this values as desired(for interval on attendance to be taken)
        			var minus = 30;
        			var plus = 15;
        			//loginvalues
        			var username = localStorage.getItem("user");
                    var password = localStorage.getItem("pass");
        			//counters to check if theres sessions on each division of time
		 			var counttoday= 0;
		 			var counttomorrow = 0;
		 			var countlater = 0;	
		 			// timeminus = now - minus minutes
		 			var now = new Date();
					var time = dateAdd(now,'minute', - minus);
					var timeminusinterval = (time.getFullYear()+'-'+time.getMonth()+1 +'-'+ time.getDate()+' '+time.getHours()+':'+time.getMinutes()+':00' );
					//console.log("timeminusinterval: "+ timeminusinterval);
       jQuery.ajax({
                    url: "https://webcursos-d.uai.cl/mod/attendance/mobile/requests.php",
                    async: false,
                    dataType: 'jsonp',
                    jsonp: 'callback',
                    contentType: "application/json",
                    data: {
                        	'username': username,
                        	'password': password,
                        	'action'  : 'sessions',
                        	'time' : timeminusinterval
                    },
                    success: function(response)
                    {		
                    	// '' means theres no error
                    	if(response.error != ''){
                    		$('.today').append("<li class='list-group-item alert-warning'>No available sessions</li>");
                    		$('.tomorrow').append("<li class='list-group-item alert-warning'>No available sessions</li>");
                    		$('.later').append("<li class='list-group-item alert-warning'>No available sessions</li>");
                    							}
                    	else{
                    		$.each(response.values, function (index, value){
								//date time from sql
                    		    var sqldatetime = sqldate(value.time);
                    			//console.log('sqltime :' +sqldatetime);
 								//current datetime
                   				var currentdatetime = new Date();
                   				//console.log('current: ' + currentdatetime);
                   				//tomorrow's datetime                   				
                   		        var tomorrow = dateAdd(currentdatetime,'day', 1);
                   		     	//console.log('tomorrow :' + tomorrow );
                   		 		//sql minutes -30 & +15 (range for assistance to be taken)
                   		     	var timesminus= dateAdd(sqldatetime,'minute',- minus);
                   		    	//console.log('timesminus :' + timesminus );
                   		        var timesplus=  dateAdd(sqldatetime,'minute',+ plus);
                   		        //console.log('timesplus :' + timesplus );
                   				 //la diferencia: ahora -> si estoy pasado de la horaes negativa
                   				 //si estoy adelantado es positiva
                   			if (currentdatetime.getDate() == sqldatetime.getDate() && currentdatetime.getMonth() == sqldatetime.getMonth()){
                   				//this means the session is today 
                   				var difference = getDateDiff(currentdatetime,sqldatetime,'minutes');
                   				//console.log("difference: "+ difference);
                   			if(currentdatetime <= timesplus && difference<= minus && difference >=  - minus && counttoday == 0){
                   				//if you can take the attendance now
                   				counttoday++;
                   				$('.today').append("<a href='#' onclick='takePhoto()' class='click list-group-item list-group-item-success clearfix'><div class='clearfix'><span class='glyphicon glyphicon-camera pull-right'></span>"+ value.coursename +"\n"+ value.description +"\n"+ value.time +"</div></a>");
                       			}
                   			else if(currentdatetime <= sqldatetime){
                   				//if the session is today but not now
                   				counttoday++;
                   				$('.today').append("<li class='list-group-item'><div class='clearfix'>"+ value.coursename +" "+ value.description +" "+ value.time +"</div></li>");
                   				}	
                   				} //today
                   			if ( tomorrow.getDate() == sqldatetime.getDate()){                  						
                       			//this means the session is tomorrow 
                       			counttomorrow++;
                       			$('.tomorrow').append("<li class='list-group-item'><div class='clearfix'>"+ value.coursename +" "+ value.description +" "+ value.time +"</div></li>");
                       			} //tomorrow
                   			if ( currentdatetime.getDate() != sqldatetime.getDate() && tomorrow.getDate() != sqldatetime.getDate() && currentdatetime.getDate() <= sqldatetime.getDate()){
                       			//this means the session is later on (-today -tomorrow) 
                       			countlater++;
                       			$('.later').append("<li class='list-group-item'><div class='clearfix'>"+ value.coursename +" "+ value.description +" "+ value.time +"</div></li>");
                       			} //later
                    			});
                    		} // if theres no error on ajax call  
                    		if(counttoday==0){
            					$('.today').append("<li class='list-group-item text-warning'>There are no available sessions for today</li>");
            					}
            				if(counttomorrow ==0){
            					$('.tomorrow').append("<li class='list-group-item text-warning'>There are no available sessions for tomorrow</li>");	
            					}
            				if(countlater==0){
            					$('.later').append("<li class='list-group-item text-warning'>There are no available sessions for later</li>");	
            					}
                    	} //success        
            	    });
            });
