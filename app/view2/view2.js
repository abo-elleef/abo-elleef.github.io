'use strict';

angular.module('view2', ['ngRoute'])

le_taste.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view2', {
    templateUrl: 'view2/view2.html',
    controller: 'View2Ctrl',
    resolve:{
      data: function(){
        return 'this is my data';
      }
    }
  });
}])

.controller('View2Ctrl', function($scope, data) {
  console.log(data);
});