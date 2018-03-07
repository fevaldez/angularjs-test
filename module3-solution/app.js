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
            promise.then(()=>{
                menu.found = MenuSearchService.results;
            });
        }
    };

    MenuSearchService.$inject = ['$http', 'ApiBasePath'];
    function MenuSearchService($http, ApiBasePath) {
        var service = this;
        var errorHandling = (x) => console.log(x);
        service.results = [];

        function filterResults(response, searchTerm) {
            var promise = response;
            return promise.then(function(array) {
                if (array && array.data) {
                    const data = array.data.menu_items;
                    service.results = data.filter((item) => {
                        return item.name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1;
                    });
                }
            })
            .catch(errorHandling);
        };

        service.getMatchedMenuItems = function (searchTerm) {
            var response = $http({
            method: "GET",
            url: (ApiBasePath + "/menu_items.json")
            });

            return response.then(filterResults(response, searchTerm)).catch(errorHandling);
        };
    }

})();
