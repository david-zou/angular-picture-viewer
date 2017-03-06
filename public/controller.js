// controller.js
angular.module('pictureModule', ['pictureServices']).controller('pictureCtrl', function($scope, Images) {

  // Mock data
  $scope.testImage1 = {
    title: 'Test Signal',
    rating: 0,
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/SMPTE_Color_Bars.svg/329px-SMPTE_Color_Bars.svg.png'
  };
  $scope.testImage2 = {
    title: 'Workshop Cafe',
    rating: 0,
    url: 'https://workfrom-workfrominc.netdna-ssl.com/files/2016/01/101081477_ifQbFxU00h4F7hcjmQcMFkCr8Csk3OrgBmPJ7faYXYM.jpg'
  };
  $scope.testImage3 = {
    title: 'Test Image',
    rating: 0,
    url: 'http://engineeringtutorial.com/wp-content/uploads/2016/07/Transformer-Open-and-Short-Circuit-Tests.png'
  };

  $scope.collection = []; 

  $scope.getAllImages = function(cb) {
    $scope.collection = Images.getAll(function(images) {
      if (images.length === 0) {
        $scope.collection = [$scope.testImage1, $scope.testImage2, $scope.testImage3];
        $scope.renderImage(0);
      } else {
        $scope.collection = images;
        if (cb) {
          cb($scope.collection);
        }
      }
    });
  };

  // initialization and defaults
  $scope.currentIndex = 0;
  $scope.currentfavoriteIndex = 0;
  $scope.currentImg;
  $scope.imgURL;
  $scope.imgTitle;
  $scope.imgRating;
  $scope.favorites = [];

  // Render first image when the page loads.
  $scope.getAllImages(function(collection) {
    $scope.currentImg = collection[0];
    $scope.imgURL = collection[0].url;
    $scope.imgTitle = collection[0].title;
    $scope.imgRating = collection[0].rating;
    $scope.renderImage(0);
  });


  $scope.titleText = 'Enter your title here!';
  $scope.urlText = 'Enter your url here!';
  $scope.stars = ['\u2606', '\u2606', '\u2606', '\u2606', '\u2606'];

  $scope.addURL = function(title, url) {
    Images.addOne($scope.idCounter, title, url)
    .then(function(resp) {
      $scope.collection.push(resp);
      $scope.getAllImages();
    });
  }

  $scope.renderImage = function(index) {
    // query the database and get the URL of the clicked table row
    $scope.currentIndex = index;
    $scope.currentImg = $scope.collection[index];
    $scope.imgTitle = $scope.collection[index].title;
    $scope.imgURL = $scope.collection[index].url;
    $scope.imgRating = $scope.collection[index].rating;
    $scope.renderRating();
  }

  $scope.renderFavorite = function(index) {
    // query the database and get the URL of the clicked table row
    $scope.currentfavoriteIndex = index;
    $scope.currentImg = $scope.favorites[index];
    $scope.imgTitle = $scope.favorites[index].title;
    $scope.imgURL = $scope.favorites[index].url;
    $scope.imgRating = $scope.favorites[index].rating;
    $scope.renderRating();
  }

  $scope.renderRating = function() {
    $scope.stars = ['\u2606', '\u2606', '\u2606', '\u2606', '\u2606'];  // reset ratings
    for (var index = 0; index < $scope.currentImg.rating; index++) {
      $scope.stars[index] = '\u2605';
    }
  }

  $scope.changeRating = function(rating) {
    $scope.collection[$scope.collection.indexOf($scope.currentImg)].rating = rating;
    if ($scope.favorites.indexOf($scope.currentImg) >= 0) {
      $scope.favorites[$scope.favorites.indexOf($scope.currentImg)].rating = rating;
    }
    $scope.imgRating = rating;
    $scope.changeFavorites(rating);
    $scope.renderRating();
  }

  $scope.clearText = function(element) {
    $scope[element] = '';
  }

  $scope.changeFavorites = function(rating) {
    if (rating >= 4) {
      if ($scope.favorites.indexOf($scope.currentImg) === -1) {
        $scope.favorites.push($scope.currentImg);
      }
    } else {
      if ($scope.favorites.indexOf($scope.currentImg) >= 0) {
        $scope.favorites.splice($scope.favorites.indexOf($scope.currentImg), 1);
      }
    }  
  }

});