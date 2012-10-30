var App;
(function() {
  App = angular.module('App', []);

  App.run(['$rootScope', function($rootScope) {
    $rootScope.ready = function() {
      var $scope = angular.element(document).scope();
      $scope.status = 'ready';
    };
    $rootScope.loading = function() {
      var $scope = angular.element(document).scope();
      $scope.status = 'loading';
    };
    $rootScope.$on('$routeChangeStart', function() {
      var $scope = angular.element(document).scope();
      $scope.loading();
    });
  }]);

  App.controller('IndexCtrl', function($scope, $http) {
    $scope.some_value = 'Stefan';
    $scope.ready();
  });

  App.controller('VideosCtrl', function($scope, $http) {
    var url = 'https://gdata.youtube.com/feeds/api/standardfeeds/top_rated?time=today&alt=json';
    setTimeout(function() {
      $http.get(url).success(function(data) {
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
      });
    }, 1000);
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
