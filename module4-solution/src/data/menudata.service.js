(function () {
'use strict';

angular.module('Data')
.service('MenuDataService', MenuDataService);

MenuDataService.$inject = ['$http', '$timeout', 'ApiBasePath']
function MenuDataService($http, $timeout, ApiBasePath) {
    const service = this;

    service.getAllCategories = function () {
    return $timeout(function () {
        return $http.get(`${ApiBasePath}/categories.json`).then(function (response) {
            return response.data;
        });
    }, 0);
    };

    service.getItemsForCategory = function(categoryShortName) {
    return $timeout(function () {
        return $http.get(`${ApiBasePath}/menu_items.json?category=${categoryShortName}`).then(function (response) {
            return response.data;
        })
    }, 0);
    };
}

})();