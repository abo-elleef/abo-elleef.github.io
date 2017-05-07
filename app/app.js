'use strict';

// Declare app level module which depends on views, and components
angular.module('mainModule', []);
angular.module('personalModule', []);
var LoginComponent = angular.module('login', []);
var le_taste = angular.module('le_taste', [
  'ngRoute',
  'view2',
  'ui.router',
  'le_taste.version',
  'login',
  'mainModule',
  'personalModule',
  'ngCookies',
  'ngAnimate',
  'toastr',
  'slickCarousel'
])
.config(function ($routeProvider,$locationProvider) {
  // $locationProvider.html5Mode({
  // enabled: true,
  // requireBase: false
  // });
  $routeProvider
      .when('/login', {
        templateUrl: '/components/Login/login.html',
        controller: 'loginCtrl',
        resolve:{
          data: function(){
            return 'this is my data';
          }
        }
      })
      .when('/personal', {
        controller: 'PersonalCtrl',
        templateUrl: 'views/personalview.html'
      })
      .when('/', {
        controller: 'MainCtrl',
        templateUrl: 'components/Core/main.html'
      })

      .otherwise({ redirectTo: '/' });
})

le_taste.run(['$rootScope', '$location', '$cookieStore', '$http', 'Login',
      function ($rootScope, $location, $cookieStore, $http, Login) {
        // // keep user logged in after page refresh
        $rootScope.globals = $cookieStore.get('globals') || {};
        console.log($rootScope.globals);
        if ($rootScope.globals.currentUser) {
          $http.defaults.headers.common['Authorization'] = 'token ' + $rootScope.globals.currentUser.token; // jshint ignore:line
          $rootScope.logged = true;
          console.log($rootScope.globals);
        }
        // // jscs:disable requireCamelCaseOrUpperCaseIdentifiers
        $rootScope.$on('$locationChangeStart', function (event, next, current) {
          // redirect to login page if not logged in
          if ($location.path() !== '/login' && !$rootScope.globals.currentUser) {
            // check for url code: maybe current user just have been redirected from facebook auth api
            if (window.location.search.slice(0, 6) === '?code=' && $rootScope.logged !== true && $rootScope.requestSent !== true) {
              $rootScope.facebookCode = window.location.search.slice(6);
              $rootScope.requestSent = true;
              Login.FacebookLogin('facebook',$rootScope.facebookCode, function(response) {
                if(response.statusText === 'OK') {
                  $rootScope.logged = true;
                  $rootScope.requestSent = false;
                  $location.path('/');
                  AuthenticationService.SetCredentials('', '', response.data.token);
                } else {
                  console.log(response);
                  $rootScope.requestSent = false;
                }
              });
            }
            else {
              $location.path('/login');
            }
          }
        });
      }])
    // jscs:enable requireCamelCaseOrUpperCaseIdentifiers

    .filter('defaultImage', function () {
      // value - данные для которых применяется фильтр
      return function (value) {
        // проверка переменной value на наличие строки
        if (value) {
          var processedValue = 'https://image.tmdb.org/t/p/w150/' + value;
          return processedValue;
        } else {
          return 'data:image/png;base64,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';
        }
      };
    })
    .run(function ($rootScope, $location, Login) {
      $rootScope.localpath = window.location.origin + window.location.pathname;
      $rootScope.logOut = function () {
        Login.ClearCredentials();
        $rootScope.logged = false;
        $location.path('/login');
      };
      $rootScope.personalPage = function (opinionValue) {
        $location.path('/personal').search({opinion: opinionValue});
      };
    });

