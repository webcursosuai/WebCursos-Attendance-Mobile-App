/*
 * 
 * 
 */
$(document).ready(function () {
    $(document).ajaxStart(function () {
    	$(".container").hide();
        $("#loading").show();
    }).ajaxStop(function () {
        $("#loading").hide();
        $(".container").show();
    });
});