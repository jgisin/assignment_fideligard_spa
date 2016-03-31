fideligard.controller('PortfolioCtrl', ['$scope', 'StocksService', 'PortfolioService', 'DatePickerService', function($scope, StocksService, PortfolioService, DatePickerService){

  $scope.cash = PortfolioService.getCash();
  $scope.purchasedStocks = PortfolioService.getStocks();
  $scope.profit = $scope.cash - 10000000;

  var date = 0;

  $scope.currentValue = function(sym, quantity){
    return StocksService.stocks[StocksService.stockFromSym(sym)][date].price * quantity;
  };

  $scope.$watch(function() {
      return PortfolioService.getCash();
    },
    function(newValue) {
      $scope.cash = newValue;
      $scope.profit = $scope.cash - 10000000;
    });

    $scope.$watch(function() {
        return DatePickerService.date;
      },
      function(newValue) {
        date = newValue;
        console.log($scope.currentValue('AAPL', 5))
      });


  // console.log($scope.purchasedStocks);
}]);
