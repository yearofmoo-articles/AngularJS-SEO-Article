var App;
(function() {
  App = angular.module('App', []);

  App.run(['$rootScope', function($rootScope) {
    var _getTopScope = function() {
      return angular.element(document).scope();
    };

    $rootScope.ready = function() {
      var $scope = _getTopScope();
      $scope.status = 'ready';
      if(!$scope.$$phase) $scope.$apply();
    };
    $rootScope.loading = function() {
      var $scope = _getTopScope();
      $scope.status = 'loading';
      if(!$scope.$$phase) $scope.$apply();
    };
    $rootScope.$on('$routeChangeStart', function() {
      _getTopScope().loading();
    });
  }]);

  App.controller('IndexCtrl', function($scope, $http) {
    $scope.some_value = 'Stefan';
    $scope.ready();
  });

  App.controller('VideosCtrl', function($scope, $http) {
    var url = 'https://gdata.youtube.com/feeds/api/standardfeeds/top_rated?time=today&alt=json';
    $http.get(url).success(function(data) {
      setTimeout(function() {
        var feed = data['feed'];
        var entries = feed['entry'];
        $scope.videos = [];
        for(var i=0;i<entries.length;i++) {
          var entry = entries[i];
          var title = entry['title']['$t'];
          $scope.videos.push({
            title : title
          });
        };
        $scope.ready();
      }, 1000);
    });
  });

  App.config(['$routeProvider', '$locationProvider', function($routes, $location) {

    $location.hashPrefix('!');

    $routes.when('/home',{
      controller : 'IndexCtrl',
      templateUrl : '/pages/index.html'
    });

    $routes.when('/videos',{
      controller : 'VideosCtrl',
      templateUrl : '/pages/videos.html'
    });

    $routes.otherwise({
      redirectTo : '/home'
    });

  }]);

})();
