fideligard.directive('portfolioStock', function(){

  return {
    templateUrl: '/directives/templates/portfolioDirective.html',
    restrict: 'A',
    scope: {
      stock: "=",
    }
  };

});
