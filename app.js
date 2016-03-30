var fideligard = angular.module('fideligard', ['ui.router', 'ui.bootstrap', 'ngMaterial']);

fideligard.config(function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('dashboard');

  $stateProvider
  .state('container',
    { url: '/',
      templateUrl: 'dashboard.html',
      controller: 'DashboardCtrl',
  })
  .state('container.dashboard', {
    url: 'dashboard',
    views: {
      'datepicker': {
        templateUrl: 'templates/datepicker.html',
        controller: 'DatePickerCtrl'
      },
      'stocks': {
        templateUrl: 'templates/stocks.html',
        controller: 'StocksCtrl',
      },
      'portfolio': {
        templateUrl: 'templates/portfolio.html',
        controller: 'PortfolioCtrl'
      }
    }
  })
  .state('dashboard.portfolio',
    {
      url: '',
      templateUrl: 'templates/portfolio.html',
      controller: 'PortfolioCtrl'
    });



});



// debug
fideligard.run(function($rootScope){
  $rootScope.$on("$stateChangeError", console.log.bind(console));
});
