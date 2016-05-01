angular.module('services').factory('flightService',['$q','$timeout','$rootScope',function($q,$timeout,$rootScope){

  var service = {};
  service.search = search;
  service.triggerSearch = triggerSearch;
  service.broadcast = broadcast;
  service.flightAirlineList = flightAirlineList;
  return service;

  function search(config){

    var results = [],
        index = 0,
        flightNos = flightNoList(),
        flightAirlines = flightAirlineList(),
        limit = (parseInt(Math.random() * 10)),
        depart,
        arrive,
        deferred,
        date;

    while(index < limit) {

      date = randomTime();
      depart = config.depart || new Date(date);
      date.setHours(date.getHours() + 2);
      arrive = config.depart || new Date(date);

      results.push({
        'from' : config.from,
        'to' : config.to,
        'price' : (parseInt(Math.random() * 10000)).toFixed(2),
        'depart' :depart,
        'arrive' : arrive,
        'flight' : {
          'depart' : {
            'no' : flightNos[parseInt(Math.random() * 8)],
            'airline' : flightAirlines[parseInt(Math.random() * 4)]
          },
          'return' : {
            'no' : flightNos[parseInt(Math.random() * 8)],
            'airline' : flightAirlines[parseInt(Math.random() * 4)]
          }
        }
      });

      index++;

    }

    deferred = $q.defer();
    $timeout(function () { deferred.resolve( results ); }, Math.random() * 2000, false);
    return deferred.promise;
  }

  function triggerSearch(query) {
    var config = {
      'title'  : query.return ? (query.from.display + ' > ' + query.to.display + ' > ' + query.from.display) : (query.from.display + ' > ' + query.to.display),
      'depart' : query.depart,
      'arrive' : query.arrive,
      'return' : query.return,
      'from'   : query.from,
      'to'     : query.to,
      'range'  : query.range
    };
    $rootScope.$broadcast('search',config);
  }

  function broadcast(event,data){
    $rootScope.$broadcast(event,data);
  }

  /*Private functions*/

  function randomTime() {
    var date = new Date();
    date.setHours(parseInt(Math.random() * 23));
    return date;
  }

  function flightNoList() {

    var list = [
      'AI-101',
      'AI-102',
      'AI-103',
      'AI-104',
      'AI-105',
      'AI-106',
      'AI-107',
      'AI-108',
      'AI-109'
    ];

    return list;
  }

  function flightAirlineList(){

    var list = [
      'Indigo',
      'Air India',
      'Jet Airways',
      'Spice Jet'
    ];

    return list;
  }

}]);