/** @ngInject */
export function routerConfig($stateProvider: any, $urlRouterProvider: angular.ui.IUrlRouterProvider) {
  $stateProvider
    .state('demo', {
      url: '/demo',
      templateUrl: 'app/demo/demo.html',
      controller: 'DemoController',
      controllerAs: 'demoCtrl'
    });

  var w: any = window;
  $urlRouterProvider.otherwise('/demo');
}
