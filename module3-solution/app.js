(function () {
'use strict';

    angular.module('NarrowItDownApp', [])
    .controller('NarrowItDownController', NarrowItDownController)
    .service('MenuSearchService', MenuSearchService)
    // .directive('shoppingList', ShoppingListDirective)
    .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");

    NarrowItDownController.$inject = ['MenuSearchService'];
    function NarrowItDownController(MenuSearchService) {
        var menu = this;
        menu.found = [];
        menu.searchTerm ="";
        
        menu.search = function () {
            const promise = MenuSearchService.getMatchedMenuItems(menu.searchTerm);
            promise.then((result)=>{
                menu.found = result;
            });
        }
    };

    MenuSearchService.$inject = ['$http', 'ApiBasePath'];
    function MenuSearchService($http, ApiBasePath) {
        var service = this;
        var errorHandling = (x) => console.log(x);
        service.results = [];

        service.getMatchedMenuItems = function (searchTerm) {
            return $http({
                method: "GET",
                url: (ApiBasePath + "/menu_items.json")
            }).then((result) => {
                return result.data.menu_items.filter((item) => {
                    return item.name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1;
                });
            }).catch(errorHandling);
        };
    }

})();
