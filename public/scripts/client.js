var myApp = angular.module('myApp', []);

myApp.controller('MainController', ['$scope', '$http', function($scope, $http){
  function start() {
          document.getElementById("uptime").innerHTML = "Waiting for data...";
          var deviceID = "2a0022000947353138383138";
          var accessToken = "bde3b78aa80ae0789693bd5f91af1119ddeb4e25";
          var eventSource = new EventSource("https://api.particle.io/v1/devices/" + deviceID + "/events/?access_token=" + accessToken);

          eventSource.addEventListener('rangeLevel', function(e) {
              var parsedData = JSON.parse(e.data);
              var impactLevel = "low";

              if(parsedData.data >= 500 && parsedData.data<700){
                impactLevel = "low";
              } else if (parsedData.data >= 700 && parsedData.data<900){
                impactLevel = "medium";
              } else if(parsedData.data >= 900 && parsedData.data<1200){
                impactLevel = "high";
              }
              $http.post('/twilio', impactLevel).then(function(response){
                
              });

              var tempSpan = document.getElementById("uptime");
              tempSpan.innerHTML += " impact: " + impactLevel;

            tempSpan.style.fontSize = "28px";

          }, false);
      }


start();

}]); //end MainController controller
