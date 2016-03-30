fideligard.controller('StocksCtrl', ['$scope', 'StocksService', 'DatePickerService', '$uibModal', function($scope, StocksService, DatePickerService, $uibModal) {

  StocksService.fillStocks();
  $scope.stocks = StocksService.stocks;

  $scope.date = DatePickerService.date;

  $scope.$watch(function() {
      return DatePickerService.date;
    },
    function(newValue) {
      $scope.date = newValue;
    });

  $scope.open = function(){

    var tradeModal = $uibModal.open({
      animation: true,
      templateUrl: 'templates/trades.html',
      controller: 'TradesCtrl',
      resolve: {
        buyStock: function(){
          return null;
        }
      }
    });

  };

}]);
