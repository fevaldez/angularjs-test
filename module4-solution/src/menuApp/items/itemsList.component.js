(function () {
'use strict';

angular.module('MenuApp')
.component('itemsList', {
  templateUrl: 'src/menuApp/items/itemsList.template.html',
  bindings: {
    items: '<'
  }
});

})();
