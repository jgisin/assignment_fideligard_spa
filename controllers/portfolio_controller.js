fideligard.controller('PortfolioCtrl', ['$scope', 'StocksService', 'PortfolioService', function($scope, StocksService, PortfolioService){

  $scope.cash = PortfolioService.getCash();
  $scope.purchasedStocks = PortfolioService.getStocks();
  console.log($scope.purchasedStocks);
}]);
