/** @ngInject */
export function routerConfig($stateProvider: any, $urlRouterProvider: angular.ui.IUrlRouterProvider) {
  $stateProvider
    .state('demo', {
      url: '/demo',
      templateUrl: 'app/demo/demo.html',
      controller: 'DemoController',
      controllerAs: 'demoCtrl'
    })

    .state('login', {
      url: '/login',
      templateUrl: 'app/user/login/login.html',
      controller: 'LoginController',
      controllerAs: 'loginController'
    })

    .state('logout', {
      url: '/logout',
      templateUrl: 'app/user/logout/logout.html',
      controller: 'LogoutController',
      controllerAs: 'logoutController'
    })

      .state('register', {
      url: '/register',
      templateUrl: 'app/user/register/monarch/register.html',
      controller: 'RegisterController',
      controllerAs: 'registerCtrl'
    })

     .state('metamask', {
      url: '/metamask',
      templateUrl: 'app/user/register/metamask/register.html',
      controller: 'RegisterMetaMaskController',
      controllerAs: 'registerMetaMaskCtrl'
    })
  $urlRouterProvider.otherwise('/demo');
}
