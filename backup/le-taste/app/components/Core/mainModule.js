/**
 * Created by leef on 07/05/17.
 */
'use strict';
/**
 * @ngdoc function
 * @name angularVideoAppApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angularVideoAppApp
 */
// /// <reference path="../../../typings/index.d.ts" />

angular.module('mainModule')
    .controller('MainCtrl', function($scope, $rootScope, $http, $sce, $timeout, $location, Login, toastr) {
      // console.log($scope);
      // console.log($rootScope);
      // console.log($rootScope.initilizationState);
      $scope.items = [];
      $scope.currentItem = {};
      $scope.currentPosition = 0;
      $scope.currentState = 'Poster';
      $scope.$watch('currentPosition', function(newValue, oldValue) {
        $scope.currentItem = $scope.items[$scope.currentPosition];
      });

      $scope.sendUserAction = function(itemTitle, actionType)
      {
        var apiBaseUrl = 'https://le-taste.herokuapp.com/api/v1/movies/';
        var apiActionUrl = '';
        var successMessage = '';
        var showSuccesNotification = true;
        switch (actionType) {
          case 'add':
            apiActionUrl = '/add_to_watch_list/';
            successMessage = '<span> movie just has been successfully added to your watchlist! </span>';
            break;
          case 'like':
            apiActionUrl = '/like/';
            successMessage = '<span> movie has been liked by you! </span>';
            break;
          case 'dislike':
            apiActionUrl = '/dislike/';
            successMessage = '<span> You have disliked that movie. Thank your for your opinion!</span>';
            break;
          case 'soso':
            apiActionUrl = '/so_so/';
            successMessage = '<span> Thank you for your respone! </span>';
            break;
          case 'skip':
            apiActionUrl = '/skip/';
            successMessage = '';
            showSuccesNotification = false;
            break;
          default:
            window.alert('actionType not specified!');
            return;
        }

        $http.post(apiBaseUrl + $scope.currentItem.id + apiActionUrl)
            .then(function successCallback(response) {
              if(showSuccesNotification)
              {
                console.log(response);
                toastr.success('<em>' + itemTitle + '</em>' + successMessage, {
                  allowHtml: true
                });
              }
            }, function errorCallback(response) {
              toastr.error('Your credentials are gone or something else had happend; Please, try to re-login to app or contact with admins', 'Error');
              console.log(response);
            });

      };

      $scope.nextItem = function() {
        //Check, if we are at the end of array
        // $('.your-class').fadeOut(100);
        $scope.opacity = false;
        $scope.slickConfigLoaded = false;
        // $('.your-class').slick('unslick');
        $scope.currentState = 'Poster';
        $scope.currentPosition = ($scope.currentPosition === $scope.items.length - 1) ? 0 : $scope.currentPosition + 1;
        $timeout(function() {
          $scope.slickConfigLoaded = true;

        });

        $('.btn').blur();
        $('#watchBtnID').popover('hide');
      };

      $scope.changeState = function() {
        $scope.currentState = ($scope.currentState === 'Poster') ? 'Trailer' : 'Poster';
      };

      $scope.getInitialData = function() {
        $http.get('https://le-taste.herokuapp.com/api/v1/movies/').then(function(response) {
          $scope.items = response.data;
          //Generating url for embed youtube videos and Generating image backdrops
          for (var i = 0; i < $scope.items.length - 1; i++) {
            var rx = /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/;
            var youtubeBaseURL = 'https://youtube.com/embed/';
            var videoId = '';
            var matchedArray = [];
            var currentElement = $scope.items[i];
            // jscs:disable requireCamelCaseOrUpperCaseIdentifiers
            currentElement.imageMainBackdrop = 'https://image.tmdb.org/t/p/w780/' + currentElement.backdrops[0].file_path;
            // jscs:enable requireCamelCaseOrUpperCaseIdentifier

            if (currentElement.trailer === null) {
              break;
            }
            matchedArray = currentElement.trailer.match(rx);
            currentElement.trailerEmbed = youtubeBaseURL + matchedArray[1] + '?autoplay=1';

          }
          console.log($scope.items);
          $scope.initilizationState = 'Initilized';
          $scope.currentItem = $scope.items[0];
          $scope.slickConfigLoaded = true;
          $scope.$watch('currentItem.imdbid', function() {
            $scope.getRatingFromImdb();
          });
        });
      };

      $scope.getRatingFromImdb = function() {
        $timeout(function() {
          window.imdb.rating.createJSONP();
          //DOM has finished rendering
        });
      };

      $scope.slickConfig = {
        dots: true,
        infinite: true,
        speed: 300,
        slidesToShow: 7,
        slidesToScroll: 7,
        event: {
          // destroy: function(event, slick) {
          //     console.log('destroy');
          // },
          init: function(event, slick) {
            // console.log('init');
            $scope.opacity = true;
            $('.your-class ').animate({
              'opacity': 1
            }, 300);
          }
        },
        responsive: [{
          breakpoint: 1200,
          settings: {
            slidesToShow: 6,
            slidesToScroll: 6,
            infinite: true,
            dots: true
          }

        }, {
          breakpoint: 1024,
          settings: {
            slidesToShow: 5,
            slidesToScroll: 5,
            infinite: true,
            dots: true
          }
        }, {
          breakpoint: 990,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 4,
            infinite: true,
            dots: true
          }

        }, {

          breakpoint: 800,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 4,
            infinite: true,
            dots: true,
            arrows: false
          }
        }, {
          breakpoint: 700,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true,
            arrows: false
          }
        }, {
          breakpoint: 500,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            dots: false,
            arrows: false
          }
        }, {

          breakpoint: 350,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: false
          }
        }
          // You can unslick at a given breakpoint now by adding:
          // settings: 'unslick'
          // instead of a settings object
        ]
      };
      $scope.initilizePopOverButtons = function() {

        // var elem = '<div class="well"><a href="google.com">Message one, From someone.</a></div>' +
        //   '<div class="well"><a href="google.com">Message one, From someone.</a></div>'
        //   ;
        var watchBtnWidth = $('#watchBtnID').outerWidth();
        var popoverElem = '<div class="btn-group" style="width:' + watchBtnWidth + 'px"><button type="button" class="btn btn-default btn-dislike" title="Hate that movie!" aria-label="Left Align"><span class="glyphicon glyphicon-thumbs-down" aria-hidden="true"></span></button><button type="button" class="btn btn-default  btn-soso" title="Its fine" aria-label="Center Align"><span class="glyphicon glyphicon-ok" aria-hidden="true"></span></button><button type="button" class="btn btn-default btn-like" title="Like this!" aria-label="Right Align"><span class="glyphicon glyphicon-thumbs-up" aria-hidden="true"></span></button></div>';
        var htmlTemplate = '<div class="popover popover-buttons" role="tooltip"><div class="popover-content"></div>';

        $('#watchBtnID').popover({
          animation: true,
          content: popoverElem,
          template: htmlTemplate,
          title: '',
          trigger: 'click',
          html: true,
          placement: 'bottom'
        });
        $('#watchBtnID').on('shown.bs.popover', function() {
          $('button.btn.btn-dislike').click(function(e) {
            // angular.element(angularRegion).scope() - получение scope, который используется элементом разметки с id="angularRegion"
            // $apply - применяет изменения на объекте scope
            angular.element(this).scope().$apply('sendUserAction(currentItem.title, \'dislike\');nextItem()');
          });
        });
        $('#watchBtnID').on('shown.bs.popover', function() {
          $('button.btn.btn-default.btn-like').click(function(e) {
            // angular.element(angularRegion).scope() - получение scope, который используется элементом разметки с id="angularRegion"
            // $apply - применяет изменения на объекте scope
            angular.element(this).scope().$apply('sendUserAction(currentItem.title, \'like\');nextItem()');
            // angular.element(this).scope().$apply('nextItem()');
          });
        });
        $('#watchBtnID').on('shown.bs.popover', function() {
          $('button.btn.btn-soso').click(function(e) {
            // angular.element(angularRegion).scope() - получение scope, который используется элементом разметки с id="angularRegion"
            // $apply - применяет изменения на объекте scope
            angular.element(this).scope().$apply('sendUserAction(currentItem.title, \'soso\');nextItem()');
          });
        });
        $('body').on('hidden.bs.popover', function(e) {
          $(e.target).data('bs.popover').inState = {
            click: false,
            hover: false,
            focus: false
          };
        });
      };

      $scope.trustSrc = function(src) {
        return $sce.trustAsResourceUrl(src);
      };

      $scope.noImage780 = 'data:image/png;base64,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';
      // $scope.prevItem = function () {
      //   //Check, if we are at the beginning of array
      //   $scope.currentPosition = ($scope.currentPosition === 0) ? $scope.currentPosition = $scope.items.length - 1 : $scope.currentPosition - 1;
      // };
      // $scope.firstInitOfApp =  function () {
      //   if($rootScope.initilizationState === 'NotInitilized')
      //   {
      //     $scope.sendRequest();
      //   }
      // };
      // $scope.items[0] = { title: 'Basic title', tagline: 'basic tagline', plot: 'test', trailerEmbed: 'https://www.youtube.com/embed/1MhPz88bqig' };
      // trailer: 'http://youtube.com/watch?v=1MhPz88bqig'
    });
