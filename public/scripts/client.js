var myApp = angular.module('myApp', []);

myApp.controller('MainController', ['$scope', '$http', function($scope, $http){
  function start() {
          var deviceID = "2a0022000947353138383138",
              tempSpan = document.getElementById("uptime"),
              accessToken = "bde3b78aa80ae0789693bd5f91af1119ddeb4e25",
              eventSource = new EventSource("https://api.particle.io/v1/devices/" + deviceID + "/events/?access_token=" + accessToken),
              lowCount = 0,
              mediumCount = 0,
              highCount= 0,
              impactLevel = "low",
              data = {},
              totalMediumHighHits;

          tempSpan.innerHTML = "Waiting for data...";
          eventSource.addEventListener('rangeLevel', function(e) {
              var parsedData = JSON.parse(e.data);
              if(parsedData.data >= 300 && parsedData.data<500){
                impactLevel = "low";
                lowCount++;
              } else if (parsedData.data >= 500 && parsedData.data<700){
                impactLevel = "medium";
                mediumCount++;
                data.count=mediumCount;
                data.impactLevel=impactLevel;
                smsTwilio(data);
              } else if(parsedData.data > 700){
                impactLevel = "high";
                highCount++;
                data.count=highCount;
                data.impactLevel=impactLevel;
                smsTwilio(data);
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
