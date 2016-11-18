(function() {
    'use strict';

    angular
        .module('firstjhipsterApp')
        .controller('ProductIdController', ProductIdController);

    ProductIdController.$inject = ['$scope', '$state', 'ProductId'];

    function ProductIdController ($scope, $state, ProductId) {
        var vm = this;
        
        vm.productIds = [];

        loadAll();

        function loadAll() {
            ProductId.query(function(result) {
                vm.productIds = result;
            });
        }
    }
})();
