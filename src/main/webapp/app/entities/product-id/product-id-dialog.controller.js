(function() {
    'use strict';

    angular
        .module('firstjhipsterApp')
        .controller('ProductIdDialogController', ProductIdDialogController);

    ProductIdDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'ProductId', 'WishList'];

    function ProductIdDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, ProductId, WishList) {
        var vm = this;

        vm.productId = entity;
        vm.clear = clear;
        vm.save = save;
        vm.wishlists = WishList.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.productId.id !== null) {
                ProductId.update(vm.productId, onSaveSuccess, onSaveError);
            } else {
                ProductId.save(vm.productId, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('firstjhipsterApp:productIdUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


    }
})();
