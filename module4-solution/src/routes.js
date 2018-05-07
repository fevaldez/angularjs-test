(function() {
'use strict';

angular.module('MenuApp')
.config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RoutesConfig($stateProvider, $urlRouterProvider) {

  // Redirect to home page if no other URL matches
  $urlRouterProvider.otherwise('/');

  // *** Set up UI states ***
  $stateProvider
  // Home page
  .state('home', {
    url: '/',
    templateUrl: 'src/menuApp/menuapp.template.html',
    controller: 'MenuAppController as MenuApp'
  })
  
  // Categories page
  .state('categories', {
    url: '/categories',
    templateUrl: 'src/menuApp/categories/categories.template.html',
    controller: 'CategoriesController as Categories',
    resolve: {
      categories: ['MenuDataService', function (MenuDataService) {
        return MenuDataService.getAllCategories();
      }]
    }
  })
  
  // Category Items page
  .state('items', {
    url: '/items/{categoryShortName}',
    templateUrl: 'src/menuApp/items/items.template.html',
    controller: 'ItemsController as Items',
    resolve: {
      items: ['$stateParams','MenuDataService',
        function ($stateParams, MenuDataService) {
          return MenuDataService.getItemsForCategory($stateParams.categoryShortName);
        }]
    }
  })
}

})();