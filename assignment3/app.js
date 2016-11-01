(function () {
  'use strict';

  angular.module("NarrowItDownApp", [])
  .controller("NarrowItDownController", NarrowItDownController)
  .service("MenuSearchService", MenuSearchService)
  .directive("foundItems", FoundItemsDescription);

  NarrowItDownController.$inject = ["MenuSearchService"];

  function NarrowItDownController (MenuSearchService) {
    var self = this;

    this.found = [];
    this.run = false;

    this.hasItems = function() {

      return self.found.length;
    }

    this.getItemList = function (searchTerm) {
      MenuSearchService.getMatchedMenuItems(searchTerm).then(function (result) {
        self.run = true;
        if (result.length > 0) {
          self.found = result;
        } else {
          self.found = [];
        }
      });
    };

    this.removeItem = function (index) {
      self.found.splice(index, 1)
    };
  }

  MenuSearchService.$inject = ["$http"];
  function MenuSearchService ($http) {
    var self = this;

    this.getMatchedMenuItems = function (searchTerm) {

      return $http({
        method: "GET",
        url: "https://davids-restaurant.herokuapp.com/menu_items.json"
      }).then(function (result) {

        var found = [];

        result.data.menu_items.forEach(function (item) {
                  if (!searchTerm) { //- lists everything on the menu if the search term is empty
                    found.push(item);
                    return true;
                  }

                  var searchWords = searchTerm.split(' ');
                  var f = item.description.match(new RegExp("(" + searchWords.join(")|(") + ")", "gi"));
                  if (f && f.length >= searchWords.length) {
                    found.push(item);
                  }
                });

        return found;
      });
    }
  }

  function FoundItemsDescription () {

    var ddo = {
      templateUrl: "partials/foundItems.html",
      scope: {
        found: "<",
        removeItem: "&"
      }
    };

    return ddo;
 }

})();
