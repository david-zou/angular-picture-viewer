angular.module('pictureServices', []).factory('Images', function($http) {
  
  var addOne = function(url) {
    return $http({
      method: 'POST',
      url: '/',
      data: {url: url}
    }).then(function(resp) {
      return resp;
    }).catch(function(error) {
      console.error(error);
    });;
  };

  var getAll = function() {
    return $http({
      method: 'GET',
      url: '/',
    }).then(function(resp) {
      return resp.data;
    });
  };

  return {
    addOne: addOne,
    getAll: getAll
  };
});