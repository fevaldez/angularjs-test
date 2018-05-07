(function () {
'use strict';

angular.module('MenuApp')
.controller('CategoriesController', CategoriesController);

CategoriesController.$inject = ['categories'];
function CategoriesController(categories) {
    const self = this;

    self.categoriesList = categories;
    self.itemsList = [];
}

})();