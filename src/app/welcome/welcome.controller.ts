
import { IRootScopeService } from '../index.run';

export class WelcomeController {

    /* @ngInject */
    constructor(
        public $scope: angular.IScope,
        public $mdSidenav: angular.material.ISidenavService,
        public $http: angular.IHttpService,
        public $log: angular.ILogService,
        public $rootScope: IRootScopeService,
        public $timeout: angular.ITimeoutService,
        public $interval: angular.IIntervalService,
        public $sce: angular.ISCEService,
        public $mdDialog: any,
        public toastr: any,
        public $firebaseObject: any
    ) {

        // this.accounts = this.$rootScope.App.EthereumService.accounts;

      
    }



}


