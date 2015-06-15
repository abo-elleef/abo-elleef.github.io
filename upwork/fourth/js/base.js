$(document).ready(function(){
	$("#drop-list").hide();
	$("#drop-list").css("left",$("#drop-toggler").offset().left-40);
	$("#drop-list").css("top",$("#drop-toggler").offset().top+70);

	$("#drop-toggler").click(function(){
		$("#drop-list").toggle(250);
		return false;
	});

	var updateTableCounters = function(){
		var table = $(this).parents("table");
		var rows = $(table).find("tr");
		var total = 0;
		for (var i = 1; i < rows.length; i++) {
			var count = $(rows[i]).find("td").last().find("input").val();
			total = total + parseInt(count) ;
		};
		$(table).find("tr").first().find("th").last().html(total)
	};

	$(".count").change(updateTableCounters);
	
});