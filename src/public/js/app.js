$(document).ready(function() {
	$(".content").isotope({
		itemSelector: '.element',
		layoutMode : 'fitRows'
	});
	$("body").css("overflow", "visible");
});