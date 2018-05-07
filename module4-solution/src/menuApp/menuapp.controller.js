(function () {
'use strict';

angular.module('MenuApp')
.controller('MenuAppController', MenuAppController);

function MenuAppController() {
    const MenuApp = this;

    MenuApp.categoriesList = ['x','y','z'];
    MenuApp.itemsList = [];
}

})();