(function () {
'use strict';

  var ToBuyList = [
      { name: "Milk", quantity: 2 },
      { name: "Donuts", quantity: 10 },
      { name: "Cookies", quantity: 5 },
      { name: "Chocolate", quantity: 20 },
      { name: "Chips", quantity: 8 }
  ];
  var AlreadyBoughtList = [];

  angular.module('ShoppingListCheckOff', [])
  .service('ShoppingListService', ShoppingListService)
  .controller('ToBuyController', ToBuyController)
  .controller('AlreadyBoughtController', AlreadyBoughtController);

  ToBuyController.$inject = ['$scope', 'ShoppingListService'];
  AlreadyBoughtController.$inject = ['$scope', 'ShoppingListService'];

  function ToBuyController($scope, ShoppingListService) {

    ShoppingListService.setItemsToBuy(ToBuyList);
    $scope.list = ShoppingListService.getItemsToBuy();

    $scope.buy = function(index) {
      ShoppingListService.buy(index);
    }
  }

  function AlreadyBoughtController($scope, ShoppingListService) {
    $scope.list = ShoppingListService.getItemsBought();
  }

  function ShoppingListService() {
    var service = this;

    // List of shopping items
    var itemsToBuy = itemsToBuy || [];
    var itemsBought = [];

    service.addItem = function (items, itemName, quantity) {
      var item = {
        name: itemName,
        quantity: quantity
      };

      items.push(item);
    };

    service.buy = function(index) {
      var item = itemsToBuy[index];

      this.addItem(itemsBought, item.name, item.quantity);
      this.removeItem(itemsToBuy, index);
    }

    service.removeItem = function (items, itemIndex) {
      items.splice(itemIndex, 1);
    };

    service.setItemsToBuy = function(items) {
      itemsToBuy = items;
    }

    service.getItemsToBuy = function() {
      return itemsToBuy;
    }

    service.getItemsBought = function () {
      return itemsBought;
    };
  }

})();
