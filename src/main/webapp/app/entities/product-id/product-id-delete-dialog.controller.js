(function() {
    'use strict';

    angular
        .module('firstjhipsterApp')
        .controller('ProductIdDeleteController',ProductIdDeleteController);

    ProductIdDeleteController.$inject = ['$uibModalInstance', 'entity', 'ProductId'];

    function ProductIdDeleteController($uibModalInstance, entity, ProductId) {
        var vm = this;

        vm.productId = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;
        
        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            ProductId.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
