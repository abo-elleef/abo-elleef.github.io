var timer;
var changeBG = function(path){
  $('#bodyOverlay').fadeOut(200);
  $('#bodyOverlay').attr('src',path);
  $('#bodyOverlay').fadeIn(400);
}
var updateCapText = function(text){
  $('#capPlaceHoder').hide();
  $('#capPlaceHoder').text(text);
  if($("#capRemoval").hasClass("expanded")){
    $('#capPlaceHoder').show(700);
  };
};
var slideUpdates = function(){
  var path = getImagePath($('.photoContainer.active'));
  var text = getText($('.photoContainer.active'));
  //$("#capRemoval").addClass("expanded");
  changeBG(path);
  updateCapText(text);
};
var updateClassActive = function(item){
  $(".photoContainer").removeClass("active");
  $(item).addClass("active");
};
var getImagePath = function(item){
  return $(item).find('img').attr('src');
};
var getText = function(item){
  return $(item).find('.capLink').text();
};
var slide = function(){
    var items = $(".photoContainer");
    timer = setInterval(function(){
      var next = $('.photoContainer.active').removeClass('active').next('.photoContainer');
      if(next.length){
        $(next).addClass("active")
      }else{
        $(".photoContainer").first().addClass("active");
      }
      slideUpdates();
    },5000)
};
$(document).ready(function(){
  var expanded = false;
  slide()
  slideUpdates();
  $('.imgLink').click(function(e){
    e.preventDefault();
    updateClassActive($(this).parents(".photoContainer"));
    slideUpdates();
  });
  $('.capLink').click(function(e){
    e.preventDefault();
    updateClassActive($(this).parents(".photoContainer"));
    slideUpdates();
  });
  $('.imgLink').hover(function(e){
    clearInterval(timer);
  },function(){
    slide();
  });
  $("#capContainer").hover(function(){
    $("#capRemoval").show(500);
  },function(){
    if($("#capRemoval").hasClass("expanded")){
      $("#capRemoval").hide(500);
    };
  });
  $("#capRemoval").hide();
  $("#capRemoval").click(function(e){
    $(this).toggleClass("expanded");
    $("#capPlaceHoder").toggle(500);
    setTimeout(function(){
    $("#capRemoval").show();
    },1100);
  });
  $("#gallaryToggler").click(function(e){
    $(this).toggleClass("up");
    if(expanded){
      $(".data-container").animate({'bottom':"20px"},500);
      expanded = !expanded
    }else{
      $(".data-container").animate({'bottom':"-190px"},500);
      expanded = !expanded
    }
  });
});