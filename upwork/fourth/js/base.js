$(document).ready(function(){
	$("#drop-list").hide();
	$("#drop-list").css("left",$("#drop-toggler").offset().left-40);
	$("#drop-list").css("top",$("#drop-toggler").offset().top+70);
	$(".pop").popover({trigger:"hover"});
	$("#drop-toggler").click(function(){
		$("#drop-list").toggle(250);
		return false;
	});

	var updateTableCounters = function(table){
		var rows = $(table).find("tr");
		var total = 0;
		for (var i = 1; i < rows.length; i++) {
			var count = $(rows[i]).find("td").last().find("input").val();
			var number =parseInt(count) || 0;
			total = total +  number;
		};
		$(table).find("tr").first().find("th").last().html(total)
	};

	$(".count").on("keyup change",function(){
		var table = $(this).parents("table");
		updateTableCounters(table);
	});
	var tables = $("#tables-part").find("table");
	for (var i = 0; i < tables.length; i++) {
		updateTableCounters(tables[i]);
	};
	
});