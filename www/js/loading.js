/*
 * 
 * 
 */
$(document).ready(function () {
    $(document).ajaxStart(function () {
        $("#loading").show();
        $(".container").hide();
    }).ajaxStop(function () {
        $("#loading").hide();
        $(".container").show();
    });
});