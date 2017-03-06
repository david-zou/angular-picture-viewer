angular.module('pictureServices', []).factory('Images', function($http) {
  
  var addOne = function(id, title, url) {
    return $http({
      method: 'POST',
      url: '/image/post',
      data: {
        id: id,
        title: title,
        rating: 0,
        url: url
      }
    }).then(function(resp) {
      return resp;
    }).catch(function(error) {
      console.error(error);
    });
  };

  var getAll = function(cb) {
    return $http({
      method: 'GET',
      url: '/image/get'
    }).then(function(resp) {
      cb(resp.data);
    });
  };

  return {
    addOne: addOne,
    getAll: getAll
  };
});