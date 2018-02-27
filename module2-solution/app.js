(function() {
'use-strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListChekOffService', ShoppingListChekOffService);

ToBuyController.$inject = ['ShoppingListChekOffService'];
function ToBuyController(ShoppingListChekOffService) {
  var toBuyList = this;

  toBuyList.items = ShoppingListChekOffService.getAvailableItems();

  toBuyList.buyItem = function (itemIndex) {
    ShoppingListChekOffService.buyItem(itemIndex);
  };
}

AlreadyBoughtController.$inject = ['ShoppingListChekOffService'];
function AlreadyBoughtController(ShoppingListChekOffService) {
  var boughtList = this;

  boughtList.items = ShoppingListChekOffService.getBoughtItems();    
}

function ShoppingListChekOffService() {
    var service = this;
    
    // List of shopping items
    var toBuyItems = [{
            name: "XBox",
            quantity: 3
        },{
            name: "PS4",
            quantity: 99
        },{
            name: "Nintendo Switch",
            quantity: 11
        },{
            name: "Atari",
            quantity: 1
        },{
            name: "Sega",
            quantity: 2
        },{
            name: "Nintendo Wii",
            quantity: 5
        }
    ];
    var boughtItems = [];

    service.buyItem = function (itemIdex) {
        //remove item from buyList and 
        //use destructuring assignment syntax to extract that item and push it to boughtList
        var [item] = toBuyItems.splice(itemIdex, 1);
        boughtItems.push(item);
    };
    
    service.getAvailableItems = function () {
        return toBuyItems;
    };

    service.getBoughtItems = function () {
        return boughtItems;
    };
}
})();