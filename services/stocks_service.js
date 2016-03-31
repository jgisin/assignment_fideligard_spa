fideligard.factory('StocksService', ['$q', '$http', function($q, $http) {

  var obj = {};
  obj.stocks = [];
  var requests = [];

  var _stockSymbols = ['LULU', 'DOW', 'GM', 'WMT', 'F', 'NFLIX', 'AAPL', 'SNDK', 'TEVA', 'HMC', 'KO', 'PEP'];


  var _singleStockOneYear = function(raw_data) {
    var daily_data = raw_data["query"]["results"]["quote"].reverse();
    var msDay = 86400000;
    var results = {'symbol': daily_data[0]["Symbol"]};
    var counter = 0;
    var lastVals = {};
    for (var i = 1388534400000; i <= 1419984000000; i+= 86400000) {
      // add a symbol for every single day
      results[i] = {'symbol': daily_data[0]["Symbol"],
                    'price': lastVals['close'],
                    'one_day': lastVals['one_day'],
                    'seven_day': lastVals['seven_day'],
                    'thirty_day': lastVals['thirty_day']};

      // check if we've run out of days
      if (daily_data[counter]) {

        var msFromData = new Date(daily_data[counter]["Date"]).getTime();
        if (Number(msFromData) === Number(i)) {
          // create object
          var close = daily_data[counter]["Close"];

          if (counter >= 1){
            results[i]['one_day'] = close - results[i - 1 * msDay]["price"];
          }
          if (counter >= 7){
            results[i]['seven_day'] = close - results[i - 7 * msDay]["price"];
          }
          if (counter >=30){
            results[i]['thirty_day'] = close - results[i - 30 * msDay]["price"];
          }

          if(Number(close) !== lastVals['close']){
            results[i]['price'] = Number(close);
            lastVals['close'] = Number(close);
            lastVals['one_day'] = results[i]['one_day'];
            lastVals['seven_day'] = results[i]['seven_day'];
            lastVals['thirty_day'] = results[i]['thirty_day'];
          }
        counter++;
        }
      }
    }
    return results;
  };

  var _getStock = function(symb){
    requests.push(
    $http({
      method: 'GET',
      url: 'http://query.yahooapis.com/v1/public/yql?q=select * from   yahoo.finance.historicaldata where  symbol    = "' + symb + '" and startDate = "2014-01-01" and endDate   = "2014-12-31" &format=json&diagnostics=true&env=store://datatables.org/alltableswithkeys&callback='
    }).then(function successCallback(response){
      obj.stocks.push(_singleStockOneYear(response.data));
    })
  );
  };

  obj.stockFromSym = function(sym){
    var stkIdx = 0;
    obj.stocks.forEach(function(stk, index){
      if(stk['symbol'] === sym){
        stkIdx = index;
      }
    });
    return stkIdx;
  };

  obj.fillStocks = function(){
    _stockSymbols.forEach(function(symb){
      _getStock(symb);
    });
    return $q.all(requests)
    .then(function(response){
      console.log(obj.stocks);
    });

  };


  return obj;
}]);
