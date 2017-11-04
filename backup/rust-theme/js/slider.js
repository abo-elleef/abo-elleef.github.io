var timer;

// timer = setInterval(function(){},5000);
var addActiveClass = function(item){
  $(item).addClass("active").show();
};
var clearClasses = function(that){
  $(that).find("li").removeClass("previous").removeClass("next").removeClass("active");
};
var slideForword = function(that){
  var current = $(that).find("li.active");
  var next = $(current).next("li");
  clearClasses(that);
  if(next.length){
    $(current).addClass("previous");
    var afterNext = $(next).addClass('active').next("li");
    if(afterNext.length){
      $(afterNext).addClass("next");
    }else{
      $(that).find("li").first().addClass("next");
    };
  }else{
    $(that).find("li").first().addClass("active").next("li").addClass("next");
    $(that).find("li").last().addClass("previous");
  };
};
var slideBackword = function(that){
  var current = $(that).find("li.active");
  var previous = $(current).prev("li");
  clearClasses(that);
  if(previous.length){
    $(current).addClass("next");
    var beforePrevious = $(previous).addClass('active').prev("li");
    if(beforePrevious.length){
      $(beforePrevious).addClass("previous");
    }else{
      $(that).find("li").last().addClass("previous");
    };
  }else{
    $(that).find("li").last().addClass("active").prev("li").addClass("previous");
    $(that).find("li").first().addClass("next");
  };
};

$.fn.blurize = function() {
    var slides = $(this).find("li");
    var that  = this;
    $("#nextButton").click(function(e){
      e.preventDefault();
      slideForword($(that));
    });
    $("#previousButton").click(function(e){
      e.preventDefault();
      slideBackword($(that));
    });
    //addActiveClass(slides[0]);

};