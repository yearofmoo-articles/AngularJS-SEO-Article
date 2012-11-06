var _app, _location;
(function() {
  _app = window.App;
  _app.run(['$location', function($location) {
    _location = $location;
  }]);
})();

var _gotoPage = function($scope, url, onReady) {
  var $location = _location;
  if($location) {
    $location.path(url).replace();
    if(!$scope.$$phase) {
      $scope.$apply(function() {
        onReady();
      });
    }
    else {
      onReady();
    }
  };
};

var _checkIfLoaded = function(url, done) {
  var $scope = _getTopScope();
  _gotoPage($scope, url, function() {
    $scope.$watch('status', function() {
      if($scope.status == 'ready') {
        done();
      }
    });
  });
};

var _resetVars = function() {
  _getTopScope().status = null;
};

var _getTopScope = function() {
  return angular.element(document).scope();
};

var _isScopeReset = function() {
  return _getTopScope().status === null;
};

describe('Testing all pages to see if they load properly', function() {

  beforeEach(function() {
    _resetVars();
  });

  it('GET /home.html', function(done) {
    expect(_isScopeReset()).to.equal(true);
    _checkIfLoaded('/home.html', done);
  });

  it('GET /videos.html', function(done) {
    expect(_isScopeReset()).to.equal(true);
    _checkIfLoaded('/videos.html', done);
  });

});
