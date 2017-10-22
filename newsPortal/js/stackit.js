var PushStackLayer = function(layerContent){
	var layer = $("iframe").append(layerContent);
	layer.addClass("stackLayer");
	$("body").append(layer);
};
var sendRequest = function(){
	var  url = $(this).attr("href");
	console.log(url);
	$.get(url,function(data){
		PushStackLayer(data);
	});
	return false;
};
var stackAllAnchors = function(){
	$('a.stacky').click(function(e){
		e.preventDefault();
		return false;
	});
};
// stackAllAnchors();
