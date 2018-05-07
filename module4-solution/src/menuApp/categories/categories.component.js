(function () {
'use strict';

angular.module('MenuApp')
.component('categoriesList', {
  templateUrl: 'src/menuApp/categories/categorieslist.template.html',
  bindings: {
    categories: '<'
  }
});

})();
