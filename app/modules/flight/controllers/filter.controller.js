//angular.module('flight').controller('filterCtrl',['$scope','cityService',function($scope,cityService){
angular.module('flight').controller('filterCtrl',['$scope','cityService','$timeout','$q','flightService',function($scope,cityService,$timeout,$q,flightService){

    var self = this;
    self.cities = cityService.list();
    self.querySearch = querySearch;
    self.validCount = [1,2,3,4,5,6];
    self.toggleTab = toggleTab;
    self.currTab = 'oneway';
    self.query = {};
    self.search = search;
    self.filterPrice = filterPrice;

    function querySearch (query) {
      var results = query ? self.cities.filter( createFilterFor(query) ) : self.cities,
          deferred;
      deferred = $q.defer();
      $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
      return deferred.promise;
    }

    function createFilterFor(query) {
      var lowercaseQuery = angular.lowercase(query);
      return function filterFn(city) {
        return (city.value.indexOf(lowercaseQuery) >= 0);
      };
    }

    function toggleTab(tab) {
      self.currTab = tab;
      self.query.return = (tab == 'return') ? self.query.return : null;
    }

    function search(){
      flightService.triggerSearch(self.query);
    }

    function filterPrice(){
      flightService.broadcast('filter-price',self.query.range);
    }

}]);