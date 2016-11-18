(function() {
    'use strict';

    angular
        .module('firstjhipsterApp')
        .controller('ProductIdDetailController', ProductIdDetailController);

    ProductIdDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'ProductId', 'WishList'];

    function ProductIdDetailController($scope, $rootScope, $stateParams, previousState, entity, ProductId, WishList) {
        var vm = this;

        vm.productId = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('firstjhipsterApp:productIdUpdate', function(event, result) {
            vm.productId = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
