fideligard.factory('PortfolioService', ['DatePickerService', function(DatePickerService){

  var obj = {};

  var _currentCash = 10000000;
  var _purchasedStocks = [{symbol: 'AAPL',
                           price: 2765.65,
                          quantity: 5,
                          transactions:
                            [{date: DatePickerService.date, quantity: 5, price: 553.13}]
                          }];

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
    var amt = _checkStocks(stock.symbol)[0];
    var stkIdx = _checkStocks(stock.symbol)[1];
    var stk = {date: date,
               symbol: stock.symbol,
               price: stock.price * quantity,
               quantity: quantity,
               transactions: [{date: date, quantity: quantity, price: stock.price}]};
    if(amt){
      _purchasedStocks[stkIdx].transactions.push({quantity: quantity, date: date, price: stock.price});
      _purchasedStocks[stkIdx].price += (quantity * stock.price);
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
