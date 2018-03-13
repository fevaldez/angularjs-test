(function () {
'use strict';

    angular.module('NarrowItDownApp', [])
    .controller('NarrowItDownController', NarrowItDownController)
    .service('MenuSearchService', MenuSearchService)
    .directive('foundItems', FoundItemsDirective)
    .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");

    function FoundItemsDirective() {
        var ddo = {
            templateUrl: 'foundItems.html',
            scope: {
                items: '<',
                onRemove: '&',
                isDirty: '<'
            },
            controller: FoundItemsDirectiveController,
            controllerAs: 'list',
            bindToController: true
        };

        return ddo;
    }
    
    function FoundItemsDirectiveController() {
        var list = this;

        list.cookiesInList = function () {
            for (var i = 0; i < list.items.length; i++) {
            var name = list.items[i].name;
            if (name.toLowerCase().indexOf("cookie") !== -1) {
                return true;
            }
            }

            return false;
        };
    }

    NarrowItDownController.$inject = ['MenuSearchService'];
    function NarrowItDownController(MenuSearchService) {
        var menu = this;
        const empty = [];
        menu.found = empty;
        menu.searchTerm ="";
        menu.dirty = false;
        
        menu.search = function () {
            !menu.dirty && (menu.dirty = true);
            if (menu.searchTerm && menu.searchTerm.length) {
                const promise = MenuSearchService.getMatchedMenuItems(menu.searchTerm);
                promise.then((result)=>{
                    menu.found = result;
                });
            } else {
                menu.found = empty;
            }
        }

        menu.remove = function(index) {
            !menu.dirty && (menu.dirty = true);
            menu.found.splice(index, 1);
        };
    };

    MenuSearchService.$inject = ['$http', 'ApiBasePath'];
    function MenuSearchService($http, ApiBasePath) {
        var service = this;
        var errorHandling = (x) => console.log(x);
        service.results = [];

        service.getMatchedMenuItems = function (searchTerm) {
            if(searchTerm && searchTerm.length) {
                return $http({
                    method: "GET",
                    url: (ApiBasePath + "/menu_items.json")
                }).then((result) => {
                    return result.data.menu_items.filter((item) => {
                        return item.name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1;
                    });
                }).catch(errorHandling);
            }
        };
    }

})();
