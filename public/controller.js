// controller.js
angular.module('pictureModule', []).controller('pictureCtrl', function($scope) {

  $scope.testImage1 = {
    id: 0,
    title: 'Test Signal',
    rating: 5,
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/SMPTE_Color_Bars.svg/329px-SMPTE_Color_Bars.svg.png'
  };
  $scope.testImage2 = {
    id: 1,
    title: 'Workshop Cafe',
    rating: 5,
    url: 'https://workfrom-workfrominc.netdna-ssl.com/files/2016/01/101081477_ifQbFxU00h4F7hcjmQcMFkCr8Csk3OrgBmPJ7faYXYM.jpg'
  };
  $scope.testImage3 = {
    id: 2,
    title: 'Test Image',
    rating: 5,
    url: 'http://engineeringtutorial.com/wp-content/uploads/2016/07/Transformer-Open-and-Short-Circuit-Tests.png'
  };
  
  // initialization and defaults
  $scope.collection = [$scope.testImage1, $scope.testImage2, $scope.testImage3]; // array of objects, each object will have a title, rating and url property
  $scope.favorites = [];
  $scope.currentImg = $scope.collection[0];
  $scope.imgURL = $scope.collection[0].url;
  $scope.imgTitle = $scope.collection[0].title;
  $scope.imgRating = $scope.collection[0].rating;
  $scope.titleText = 'Enter your title here!';
  $scope.urlText = 'Enter your url here!';



  $scope.addURL = function(title, url) {
    console.log('adding ' + title + ' with URL ' + url);
    $scope.collection.push({
      id: $scope.collection.length,
      title: title,
      rating: 0,
      url: url
    });
    // Images.addOne(title, url).then(function(resp) {
    //   $scope.collection.push(resp);
    // });
  }

  $scope.getImage = function(id) {
    // query the database and get the URL of the clicked table row
    console.log('image id clicked:', id);
    $scope.currentImg = $scope.collection[id];
    $scope.imgTitle = $scope.collection[id].title;
    $scope.imgRating = $scope.collection[id].rating;
    $scope.imgURL = $scope.collection[id].url; // need to get index
  }

  $scope.changeRating = function(rating) {
    console.log('Rating:', rating);
    $scope.imgRating = rating;
    $scope.changeFavorites(rating);
  }

  $scope.clearText = function(element) {
    console.log('clearing text at:', element);
    $scope[element] = '';
  }

  $scope.changeFavorites = function(rating) {
    if (rating >= 4) {
      $scope.favorites.push($scope.currentImg);
    } else {
      $scope.favorites.splice($scope.collection.indexOf($scope.currentImg), 1);
    }  
  }

});