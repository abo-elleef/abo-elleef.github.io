
//  slider

var timer ;
var progressTimer;
var slideTime = 5000;
var progressTime = 50;

var getActiveSlide = function(){
  return $(".slide.active");
};
var getNextSlide = function(current){
  var next = $(current).next(".slide");
  if(!next.length){
    next = $(".slide").first()
  };
  return next;
};
var getPreviousSlide = function(current){
  var prev = $(current).prev(".slide");
  if(!prev.length){
    prev = $(".slide").last()
  };
  return prev;
};
var addClasses = function(next){
  var inClass = $(next).attr("data-ani-in-cls");
  var outClass =$(next).attr("data-ani-out-cls");
  $(next).addClass(inClass).removeClass(outClass);
  $(next).addClass("active").addClass("animated").removeClass("hide");
  var cap = $(next).find(".capText");
  setTimeout(function(){
    cap.removeClass("hide").addClass(cap.attr("data-ani-in-cls"))
  },1000)
};
var slideForward = function(){
  var current  = getActiveSlide()
  var next = getNextSlide(current);
  var outClass = $(current).attr("data-ani-out-cls");
  current.removeClass("active").addClass(outClass);
  var cap = current.find(".capText")
  cap.addClass('hide');
  addClasses(next);
}
var slideBackword = function(){
  var current  = getActiveSlide()
  var prev = getPreviousSlide(current);
  var outClass = $(current).attr("data-ani-out-cls");
  current.removeClass("active").addClass(outClass);
  addClasses(prev);
}
var slide = function(){
  timer = setInterval(function(){
    slideForward();
  },slideTime);
};
var progress = function(){
  var progressState = 0;
  var counter=0;
  progressTimer = setInterval(function(){
      var progressString = progressState + "%"
      $(".determinate").css("width",progressString);
      progressState = (100 * counter)%100;
      counter += 0.01;

  },progressTime);
};
var activateSlider = function(){
  slide();
  progress();
  $(".slide").hover(function(e){
    clearInterval(timer);
    clearInterval(progressTimer)
  },function(e){
    slide();
    progress();
  });
};

// images archive functions
  var openGallaryMode = function(that){
    $('.gallary').show(500);
    updateWindowSize();
    var current = $(that).parents(".archiveItem").addClass("active");
    updateOpenedItem(current);
    updateGallaryItemHieght();
  };
  var dismissGallaryMode = function(e){
    $('.gallary').hide();
    $(".archiveItem").removeClass("active");
  };
  var updateWindowSize = function(){
    $('.gallary').css('height',$(window).height());
    $('.gallary').css('width',$(window).width());
  };
  var updateGallaryItemHieght = function(){
    var imageHeight = $(".gallary-item").find('img').height();
    var gallaryHeight = $(window).height()*0.8;
    if(imageHeight < gallaryHeight){
      $('.gallary-item').height(imageHeight);
    }else{
      $('.gallary-item').height(gallaryHeight);
    }
  };
  var getActiveArchiveItem = function(){
    return $(".archiveItem.active");
  };
  var getNextArchiveItem = function(current){
    var current = current || getActiveArchiveItem();
    var next = current.next(".archiveItem");
    if(next.length){
      return next;
    };
    return $(".archiveItem").first();
  };
  var getPreviousArchiveItem = function(current){
    var current = current || getActiveArchiveItem();
    var prev = current.prev(".archiveItem");
    if(prev.length){
      return prev;
    };
    return $(".archiveItem").last();
  };
  var updateOpenedItem = function(parent){
    var imageUrl = $(parent).find('img').attr('src');
    var title = $(parent).find('.title').text();
    var date = $(parent).find('.date').text();
    $(".img-wrapper img").attr("src",imageUrl);
    $(".cap-wrapper .shown-title").text(title);
    $(".cap-wrapper .shown-date").text(date);
  };
  var removeClassActive = function(item){
    $(item).removeClass("active");
  };
  var addClassActive = function(item){
    $(item).addClass("active");
  };

  var gallaryForward = function(){
    var active = getActiveArchiveItem();
    var next = getNextArchiveItem(active);
    updateOpenedItem(next);
    removeClassActive(active);
    addClassActive(next);
    updateGallaryItemHieght();
  };
  var gallaryBackword = function(){
    var active = getActiveArchiveItem();
    var prev = getPreviousArchiveItem(active);
    updateOpenedItem(prev);
    removeClassActive(active);
    addClassActive(prev);
    updateGallaryItemHieght();
  };
// end of images archive functions
var footerActivator = function(){
  var hotNews = $(".hot-news li");
  var active = $("li.shown");
  var next = $(active).next("li");
  if(!next.length){
   next = $(".hot-news li").first();
  };
  active.removeClass("shown");
  next.addClass("shown");
};
var animateCardClass = function(){
  $(".card").hover(function(){
    $(this).addClass("z-depth-2").addClass("bigger");
  },function(){
    $(this).removeClass("z-depth-2").removeClass("bigger");
  });
};
$(document).ready(function(){
  $(".button-collapse").sideNav();
  $('.pushpin').pushpin({ top: "100px" });
  $('.dropdown-button').dropdown({ belowOrigin: true });
  activateSlider(); // main page slider
  setInterval(function(){
    footerActivator();
  },5000)
  $("#mapContainer").hide();
  $("#map-trigger").click(function(e){
    e.preventDefault();
    $("#mapContainer").show(500);
  });
  animateCardClass();
  // ready actions for images archive

  $('.gallary').on('click',dismissGallaryMode);
  // to prevent remove gallary mode when click on text or image
  $(".img-wrapper").click(function(){
    return false;
  });
  $(".cap-wrapper").click(function(){
    return false;
  });
  $(".img-arch-shafaf").click(function(e){  openGallaryMode(this); });
  $(window).resize(updateWindowSize);
  dismissGallaryMode();
  $(".next").click(gallaryForward);
  $(".prev").click(gallaryBackword);
  // end of images page


  $('.modal-trigger').leanModal();
  $('.slider').slider({Interval:5000});
  $(window).scroll(function() {
    var scroll = window.pageYOffset || document.documentElement.scrollTop;
      if ( scroll >= 5 ) {
         $('nav').addClass('shrink');
      }else {
          $('nav').removeClass('shrink');
      };
      if( $(document).height() - ($(window).scrollTop() + $(window).height()) > 200) {
        $(".hot-news").addClass("pinnedFooter");
      }else{
        $(".hot-news").removeClass("pinnedFooter");
      };
  });
});
