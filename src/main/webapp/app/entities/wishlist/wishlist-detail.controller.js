(function() {
    'use strict';

    angular
        .module('firstjhipsterApp')
        .controller('WishlistDetailController', WishlistDetailController);

    WishlistDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'Wishlist', 'User'];

    function WishlistDetailController($scope, $rootScope, $stateParams, previousState, entity, Wishlist, User) {
        var vm = this;

        vm.wishlist = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('firstjhipsterApp:wishlistUpdate', function(event, result) {
            vm.wishlist = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
