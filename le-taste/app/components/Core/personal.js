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

angular.module('personalModule')
    .controller('PersonalCtrl', function($scope, $rootScope, $http, $sce, $timeout, $location, Login, toastr) {
      $scope.items = [];
      $scope.dataLoaded = false;
      $scope.getUserData = function()
      {
        var searchParams = $location.search();
        console.log($location);
        $http.get('https://le-taste.herokuapp.com/api/v1/movies/?opinion='+searchParams.opinion).then(function(response) {
          $scope.items = response.data;
          $scope.dataLoaded = true;
          console.log($scope.items);
        });
      };
      $scope.removeImdbRatings = function () {
        $('script[src^="https://p.media-imdb.com/static-content/documents/v1/title/"]').remove();
      };
      $scope.finished = function() {
        $('.dropdown-toggle').dropdown();
      };
      $scope.trustSrc = function(src) {
        return $sce.trustAsResourceUrl(src);
      };
    });