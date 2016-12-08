/** @ngInject */
export function routerConfig($stateProvider: any, $urlRouterProvider: angular.ui.IUrlRouterProvider) {
  $stateProvider

   .state('welcome', {
      url: '/welcome',
      templateUrl: 'app/welcome/welcome.html',
      controller: 'WelcomeController',
      controllerAs: 'welcomeCtrl'
    })

    .state('hello', {
      url: '/hello',
      templateUrl: 'app/hello/hello.html',
      controller: 'HelloController',
      controllerAs: 'helloCtrl'
    })

     .state('metacoin', {
      url: '/metacoin',
      templateUrl: 'app/metacoin/metacoin.html',
      controller: 'MetaCoinController',
      controllerAs: 'metaCoinCtrl'
    })

     .state('eth-lightwallet', {
      url: '/eth-lightwallet',
      templateUrl: 'app/eth-lightwallet/eth-lightwallet.html',
      controller: 'EthLightWalletController',
      controllerAs: 'ethLightWalletCtrl'
    })

    .state('feed', {
      url: '/feed',
      templateUrl: 'app/feed/feed.html',
      controller: 'FeedController',
      controllerAs: 'feedCtrl'
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

    .state('install', {
      url: '/install',
      templateUrl: 'app/dependencies/install/install.html',
      controller: 'InstallDependenciesController',
      controllerAs: 'installDependenciesCtrl'
    })

    .state('history', {
      url: '/history',
      templateUrl: 'app/history/history.html',
      controller: 'HistoryController',
      controllerAs: 'historyCtrl'
    })

    .state('pulse', {
      url: '/pulse',
      templateUrl: 'app/pulse/pulse.html',
      controller: 'PulseController',
      controllerAs: 'pulseCtrl'
    })

  $urlRouterProvider.otherwise('/welcome');
}
