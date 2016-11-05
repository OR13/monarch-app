
import {IRootScopeService} from '../index.run';
import {SecurityService} from './security.service';

export class EthereumService {

    public web3: any;

    public w: any;

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
        this.web3 = new this.w.Web3();

        this.web3 = new this.w.Web3(new this.w.Web3.providers.HttpProvider("http://localhost:8545"));

        this.accounts = this.web3.eth.accounts;

        this.$log.debug( " expect accounts: ", this.accounts)
        // this.watchForAccounts();

        //
        //
        //
        // if (this.w.web3) {
        //     // this.watchForAccounts();
        //     this.accounts = this.w.web3.eth.accounts;
        //     // this.$rootScope.App.isMetaMaskInstalled = true;
        // }

    }

    public watchForAccounts = () => {
        this.$rootScope.$watch(() => {
            return this.web3.eth.accounts;
        }, (accounts) => {
            this.$log.debug('got accounts: ', accounts);
            this.accounts = accounts;
        })
    }



}
