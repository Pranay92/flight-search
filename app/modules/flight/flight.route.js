angular.module('flight').config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouterProvider) {
  
  $stateProvider.state('home',{
    url : '/',
    views : {
      '@' : {
        controller : 'homeCtrl',
        templateUrl : 'app/modules/flight/templates/home.html'              
      },
      'content@home' : {
        controller : 'contentCtrl',
        templateUrl : 'app/modules/flight/templates/content.html'
      },
      'filter@home' : {
        controller : 'filterCtrl',
        templateUrl : 'app/modules/flight/templates/filter.html'
      }
    }
  });

}]);