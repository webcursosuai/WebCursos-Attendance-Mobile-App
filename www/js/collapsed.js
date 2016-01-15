/*
 * 
 * 
 */
$('.collapsed').click(function() {
		if($('.collapsed').children().hasClass("glyphicon glyphicon-minus"))
			{
			$('.collapsed').children().removeClass( "glyphicon glyphicon-minus" );
			$('.collapsed').children().addClass( "glyphicon glyphicon-plus" );
			}
			$( this ).children().toggleClass( "glyphicon glyphicon-minus" );
		if($('.noncollapsed').parent().hasClass("collapsed"))
			{
			$('.noncollapsed').removeClass( "glyphicon glyphicon-minus" );
			$('.noncollapsed').addClass( "glyphicon glyphicon-plus" );
			}
		else
			{
			$('.noncollapsed').removeClass( "glyphicon glyphicon-plus" );
			$('.noncollapsed').addClass( "glyphicon glyphicon-minus" );
			}
			});