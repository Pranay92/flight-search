angular.module('services').factory('cityService',[function(){

  var service = {};
  service.list = list;
  return service;

  function list(){

    var cities = [
      'Raipur',
      'Pune',
      'Mumbai',
      'Delhi',
      'Chennai',
      'Bengaluru',
      'Kolkatta',
      'Hyderabad',
      'Chandigarh'
    ],
    formatted = [];

    cities.map(function(city){
      formatted.push({
        value : city.toLowerCase(),
        display : city,
        code : city.slice(0,3).toUpperCase()
      });
    });

    return formatted;
  }

}]);