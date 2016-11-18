(function() {
    'use strict';

    angular
        .module('firstjhipsterApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('product-id', {
            parent: 'entity',
            url: '/product-id',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'ProductIds'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/product-id/product-ids.html',
                    controller: 'ProductIdController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
            }
        })
        .state('product-id-detail', {
            parent: 'entity',
            url: '/product-id/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'ProductId'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/product-id/product-id-detail.html',
                    controller: 'ProductIdDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                entity: ['$stateParams', 'ProductId', function($stateParams, ProductId) {
                    return ProductId.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'product-id',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('product-id-detail.edit', {
            parent: 'product-id-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/product-id/product-id-dialog.html',
                    controller: 'ProductIdDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['ProductId', function(ProductId) {
                            return ProductId.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('product-id.new', {
            parent: 'product-id',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/product-id/product-id-dialog.html',
                    controller: 'ProductIdDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                productId: null,
                                price: null,
                                productIdTwo: null,
                                priceTwo: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('product-id', null, { reload: 'product-id' });
                }, function() {
                    $state.go('product-id');
                });
            }]
        })
        .state('product-id.edit', {
            parent: 'product-id',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/product-id/product-id-dialog.html',
                    controller: 'ProductIdDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['ProductId', function(ProductId) {
                            return ProductId.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('product-id', null, { reload: 'product-id' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('product-id.delete', {
            parent: 'product-id',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/product-id/product-id-delete-dialog.html',
                    controller: 'ProductIdDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['ProductId', function(ProductId) {
                            return ProductId.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('product-id', null, { reload: 'product-id' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
