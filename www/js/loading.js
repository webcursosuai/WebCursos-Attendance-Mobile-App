/*
 * 
 * 
 */
$(document).ready(function () {
    $(document).ajaxStart(function () {
        $("#loading").show();
    }).ajaxStop(function () {
        $("#loading").hide();
        $(".container").show();
    });
});