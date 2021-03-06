var myApp = angular.module('myApp', []);

myApp.controller('MainController', ['$scope', '$http', function($scope, $http){
  function start() {
          var deviceID = "actual device id",
              tempSpan = document.getElementById("uptime"),
              accessToken = "actual active token",
              eventSource = new EventSource("https://api.particle.io/v1/devices/" + deviceID + "/events/?access_token=" + accessToken),
              lowCount = 0,
              mediumCount = 0,
              highCount= 0,
              impactLevel = "low",
              mediumData = {},
              highData={};


          tempSpan.innerHTML = "Waiting for data...";
          eventSource.addEventListener('rangeLevel', function(e) {
              var parsedData = JSON.parse(e.data);
              if(parsedData.data >= 300 && parsedData.data<500){
                impactLevel = "low";
                lowCount++;
              } else if (parsedData.data >= 500 && parsedData.data<700){
                impactLevel = "medium";
                mediumCount++;
                mediumData.count=mediumCount;
                mediumData.impactLevel=impactLevel;
                // if(mediumCount%5 == 0)
                // {
                smsTwilio(mediumData);

                // }
              } else if(parsedData.data > 700){
                impactLevel = "high";
                highCount++;
                highData.count=highCount;
                highData.impactLevel=impactLevel;
                smsTwilio(highData);
              }
             function smsTwilio(data){
                $http.post('/twilio', data).then(function(response){
                  console.log(response);
                });
             }
              tempSpan.innerHTML += " impact: " + impactLevel;
              tempSpan.style.fontSize = "28px";
              tempSpan.style.fontSize = "28px";

          }, false);
      }


start();

}]); //end MainController controller
