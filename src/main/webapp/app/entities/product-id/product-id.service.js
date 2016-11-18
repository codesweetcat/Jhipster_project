(function() {
    'use strict';
    angular
        .module('firstjhipsterApp')
        .factory('ProductId', ProductId);

    ProductId.$inject = ['$resource'];

    function ProductId ($resource) {
        var resourceUrl =  'api/product-ids/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    if (data) {
                        data = angular.fromJson(data);
                    }
                    return data;
                }
            },
            'update': { method:'PUT' }
        });
    }
})();
