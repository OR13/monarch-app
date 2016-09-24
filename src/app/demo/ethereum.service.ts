
import {IRootScopeService} from '../index.run';
import {SecurityService} from './security.service';

export class EthereumService {

    public web3: any;

    public w: any;

    public isOnline: boolean;

    public accounts: Array<string>;

    /** @ngInject */
    constructor(
        private $timeout: angular.ITimeoutService,
        private $log: angular.ILogService,
        private $http: angular.IHttpService,
        private $window: angular.IWindowService,
        private $q: angular.IQService,
        private $mdToast: angular.material.IToastService,
        private $state: any,
        private $rootScope: IRootScopeService
    ) {

        this.w = window;
        this.web3 = this.w.web3;

        this.isOnline = this.web3 !== undefined;

        if (this.isOnline) {
            // this.watchForAccounts();

            this.accounts = this.w.web3.eth.accounts;
        }




    }

    // public watchForAccounts = () => {
    //     this.$rootScope.$watch(() => {
    //         return this.w.web3.eth.accounts;
    //     }, (accounts) => {
    //         this.$log.debug('got accounts: ', accounts);
    //     })
    // }



}