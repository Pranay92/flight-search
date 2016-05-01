angular.module('flight').controller('contentCtrl',['$scope','flightService',function($scope,flightService){

  // private variable, to be used for caching purpose
  var recordsCopy = [],
      flightCache = [],
      checkedAirlines = [];

  $scope.journey = 'Flight Details';
  $scope.records = [];
  $scope.returnFlight = false;
  $scope.departDate = null;
  $scope.returnDate = null;
  $scope.initiated = false;
  $scope.airlines = formatAirlines(flightService.flightAirlineList());
  $scope.filterByAirline = filterByAirline;

  function search(config){
    flightService.search({from : config.from.code,to : config.to.code}).then(function(data){
      flightCache = data;
      $scope.records = JSON.parse(JSON.stringify(data));
      format(config); 
    })
  }

  function format(config){

    // create a copy of current records 
    recordsCopy = [];
    if($scope.records.length) {
      recordsCopy = JSON.parse(JSON.stringify($scope.records));  
    }

    if(config.range) {
      filterByPrice(config.range);
    }

    $scope.returnFlight = config.return ? true : false;
    $scope.departDate = config.depart;
    $scope.returnDate = config.return;
    $scope.journey = $scope.returnFlight ? (config.from.display + ' > ' + config.to.display + ' > ' + config.from.display) : (config.from.display + ' > ' + config.to.display);
    $scope.searching = false;
  }

  $scope.$on('search',function(event,data){
    $scope.searching = true;
    $scope.initiated = true;
    $scope.records = [];
    search(data);
  });

  $scope.$on('filter-price',function(event,range){
    filterByPrice(range);
  });

  $scope.$watch('airlines',function(){

  });

  function filterByAirline(airline) {

    if(airline.checked && checkedAirlines.indexOf(airline.name) < 0) {
      checkedAirlines.push(airline.name);
    }

    if(!airline.checked && checkedAirlines.indexOf(airline.name) >= 0) {
      checkedAirlines.splice(checkedAirlines.indexOf(airline.name),1);
    }

    var results = flightCache.filter(function(a){
        return (checkedAirlines.indexOf(a.flight.depart.airline) >= 0 || ( a.flight.return && checkedAirlines.indexOf(a.flight.return.airline) >= 0 ))
    });

    $scope.records = results;

  }

  function formatAirlines(flightArray){

    var len = flightArray.length,
        index = 0,
        results = [];

    while(index < len) {
      results.push({
        name : flightArray[index],
        checked : false 
      });
      index++;
    }

    return results;
  }

  function filterByPrice(range){
    $scope.records = recordsCopy.filter(function(a){
      return parseInt(a.price) <= range;
    });    
  }

}]);