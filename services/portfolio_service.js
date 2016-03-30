fideligard.factory('PortfolioService', ['StocksService', 'DatePickerService', function(StocksService, DatePickerService){

  var obj = {};

  var _currentCash = 10000000;
  var _purchasedStocks = [{date: 1388534400000, symbol: 'AAPL', price: 553.13, quantity: 5}];

  obj.getCash = function(){
    return _currentCash;
  };

  obj.getStocks = function(){
    return _purchasedStocks;
  };

  obj.changeCash = function(amt){
    _currentCash += amt;
  };

  obj.buyStock = function(date, stock, quantity){
    var amt = _checkStocks(stk.symbol)[0];
    var stkIdx = _checkStocks(stk.symbol)[1];
    var stk = {date: date, symbol: stock.symbol, price: stock.price, quantity: quantity};
    if(amt){
      _purchasedStocks[stkIdx].quantity += quantity;
    }
    else{
      _purchasedStocks.push(stk);
    }
  };

  var _checkStocks = function(sym){
    var quant = 0;
    var stkIdx = 0;
    _purchasedStocks.forEach(function(stk, index){
      if(stk.symbol === sym){
        quant = stk.quantity;
        stkIdx = index;
      }
      else{
        quant = false;
        stkIdx = false;
      }
    });
    return [quant, stkIdx];
  };

  return obj;

}]);
