$(document).ready(function() {
	$(".content").isotope({
		itemSelector: '.element',
		layoutMode : 'fitRows'
	});
	$("body").css("overflow", "visible");
	$(window).resize();
});

//Rooms JS
$(document).ready(function() {
	$(".toolbar .room").click(function() {
		if($(".toolbar .sub").length === 0) {
			$.get("/ajax/rooms/add", function(data) {
				$(".room").text("Cancel");
				$(".toolbar").append(data).find(".sub").fadeIn('normal');
			});
		} else {
			$(".toolbar .sub").remove();
			$(".room").text("New Room");
		}
	});
	$(".toolbar").on('submit', ".addroom", function() {
		var action = $(this).attr("action");
		var data = $(this).serialize();
		$.post(action, data).success(function(data) {
			var $newItems = $(data);
			$(".content").isotope('insert', $newItems);
			$('.notifications').notify({
				message: { text: 'Awesome! Your room was created.' }
			}).show();
			$(".room").text("New Room");
			$(".toolbar .sub").remove();
		}).error(function(data) {
			var errors = JSON.parse(data.responseText);
			$.each(errors, function(index, item) {
				$('.notifications').notify({
					message: { text: item.msg },
					type: "error"
				}).show();
			});
		});
		return false;
	});
});