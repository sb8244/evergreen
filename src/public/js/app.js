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
	$(".scroller").on('click', '.element .close', function() {
		var self = $(this);
		var room_id = $(this).data("id");
		var text = "Are you sure you want to delete this room and all documents in it?";
		text += "<br><br>Again, all documents inside this room will be gone forever. <b>This is not reversible.</b>";
		$.confirm({
			text: text,
			confirm: function(button) {
				var data = "room_id="+ room_id;
				$.post("/ajax/rooms/remove", data)
				.success(function(result) {
					if(result.status === "okay")
						$(".content").isotope('remove', self.parent());
					else {
						$('.notifications').notify({
							message: { text: 'Oops, you don\'t have permission to delete this room.' },
							type: "error"
						}).show();
					}
				}).fail(function(err) {
					console.log(err);
				});
			},
			cancel:function(button) {
				console.log("no");
			},
			confirmButton: "Yes, I am",
			cancelButton: "Oops, no way!",
			post: true
		});
	})
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