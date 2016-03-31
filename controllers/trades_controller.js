fideligard.controller('TradesCtrl', ['$scope', '$uibModalInstance', 'PortfolioService', 'stock', 'date', function($scope, $uibModalInstance, PortfolioService, stock, date){

  // console.log(stock, date);
  $scope.stock = stock;
  $scope.date = date;
  $scope.buySell = 1;
  $scope.cash = PortfolioService.getCash();

  var d = new Date();
  d.setTime(date);

  $scope.dateString = d;

  $scope.buyStock = function(date, stock, quantity){
    var amount = stock.price * quantity;
    PortfolioService.buyStock(date, stock, quantity * $scope.buySell *-1);
    PortfolioService.changeCash(amount * $scope.buySell);
    $uibModalInstance.dismiss();
  };

}]);
