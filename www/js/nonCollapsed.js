/*
 * 
 * 
 */
$('.noncollapsed').parent().click(function() {
 if($('.noncollapsed').parent().hasClass("collapsed"))
	 {
	 $('.noncollapsed').removeClass( "glyphicon glyphicon-plus" );
	 $('.noncollapsed').addClass( "glyphicon glyphicon-minus" );
	 }
 else
	 {
	 $('.noncollapsed').removeClass("glyphicon glyphicon-minus");
	 $('.noncollapsed').addClass("glyphicon glyphicon-plus");
	 $('.collapsed').children().removeClass("glyphicon glyphicon-minus").addClass("glyphicon glyphicon-plus").hasClass("glyphicon glyphicon-minus");
	 }
});