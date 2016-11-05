
import {IRootScopeService } from '../index.run';


export class HelloController {

    public accounts: Array<string>;
    public receivingAccount: string;


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
        public $firebaseObject: any,
   
    ) {

        // this.accounts = this.$rootScope.App.EthereumService.accounts;

        this.watchForAccounts();

    }

      public watchForAccounts = () => {
        this.$rootScope.$watch(() => {
            return this.$rootScope.App.EthereumService.accounts
        }, (accounts) => {
            this.$log.debug('got accounts: ', accounts);
            this.accounts = accounts;
        })
    }



}


