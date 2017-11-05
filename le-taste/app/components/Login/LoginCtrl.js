/**
 * Created by leef on 07/05/17.
 */

le_taste.controller('loginCtrl', function ($scope, Login) {
  // reset login status
  console.log('entered login controller');
  Login.ClearCredentials();

  $scope.login = function () {
    $scope.dataLoading = true;
    Login.Login($scope.username, $scope.password, function (response) {
      console.log(response);
      if (response.statusText === 'OK') {
        // jscs:disable requireCamelCaseOrUpperCaseIdentifiers
        console.log(response)
        Login.SetCredentials($scope.username, $scope.password, response.data.auth_token);
        $rootScope.logged = true;
        $location.path('/');
      } else {
        $scope.error = response.data.non_field_errors;
        $scope.dataLoading = false;
      }
    });
  };
    $scope.logout = function() {
      Facebook.logout(function() {
        $scope.$apply(function() {
          $scope.user   = {};
          $scope.logged = false;
        });
      });
    };
      $scope.fbSignIn = function() {

          Facebook.getLoginStatus(function (response) {
              if (response.status === 'connected') {
                  $scope.loggedIn = true;
                  console.log('already connected!');
                  console.log(response);
              } else {
                  $scope.loggedIn = false;
                  Facebook.login(function (response) {
                      if (response.status === 'connected') {
                          $scope.loggedIn = true;
                          console.log('first time connected!');
                          console.log(response);
                      }
                  });
              }
          });
     };
});
