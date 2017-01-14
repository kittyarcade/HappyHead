console.log('meow.js');

var myApp = angular.module('myApp', []);

myApp.controller('Hoth', ['$scope', '$http', function($scope, $http){
  console.log('totally angular dude');

  $scope.find = function(){
    $http({
      method: 'GET',
      url: '/router'
    }).then(function(response){
      console.log('GET response: ', response.data);
      $scope.collection = response.data;
    });
  };//end find function

  $scope.submit = function(){ //function for button click
    console.log('clicked submit');
    var petAdded = {
      Name: $scope.petName,
      Animal: $scope.petType,
      Age: $scope.petAge,
      Image: $scope.petImg
    };
    console.log(petAdded);
    $http({   //sends submitted data to server that then goes to db
      method: 'POST',
      url: '/router',
      data: petAdded
    }).then(function(response){
      console.log('POST response: ', response);
    });//end $http
    clearForms();
    $scope.find();
  }; //end $scope.submit

  $scope.deletePet = function(petId){
    $http({
      method: 'DELETE',
      url: '/router/' + petId
      // data: {petId: petId}
    }).then(function(response){
      console.log('Delete success: ', response);
      $scope.find();
    });
  };

  //clears input fields
  var clearForms = function(){
    $scope.petName='';
    $scope.petType='';
    $scope.petAge='';
    $scope.petImg='';
  };


}]); //end hoth controller
