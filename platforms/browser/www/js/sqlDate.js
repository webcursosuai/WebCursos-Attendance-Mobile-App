/*
 * 
 * 
 */
function sqldate(date){
    	// Split timestamp into [ Y, M, D, h, m, s ]
	    var t = date.split(/[- :]/);

	    // Apply each element to the Date function
	    var sqldatetime = new Date(t[0], t[1]-1, t[2], t[3], t[4], t[5]);
    	return sqldatetime;
    }