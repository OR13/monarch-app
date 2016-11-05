
import { IRootScopeService } from '../index.run';


export interface IMetaCoin {
    getBalance: any;
    sendCoin: any;
}

// export interface MetaCoin {
//     getBalance: (account :string) => ng.IPromise<any>;
// }

export interface IMonarchTruffleApp {
    metaCoin: IMetaCoin;
}

export class MetaCoinController {

    public account: string;
    public status: string;
    public balance: number;
    public accounts: Array<string>;
    public sendingAmmount: number;
    public receivingAccount: string;

    public monarchTruffleApp: IMonarchTruffleApp;


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

        this.watchForAccounts();

        this.$rootScope.App.EthereumService.web3.eth.getAccounts((err, accounts) => {
            if (err != null) {
                alert("There was an error fetching your accounts.");
                return;
            }

            if (accounts.length == 0) {
                alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
                return;
            }

            var w: any = window;
            this.monarchTruffleApp = w.monarchTruffleApp;

            this.$timeout(() => {
                this.refreshBalances();
            }, 500)

        });
    }


    public watchForAccounts = () => {
        this.$rootScope.$watch(() => {
            return this.$rootScope.App.EthereumService.accounts
        }, (accounts) => {
            // this.$log.debug('got ac  counts: ', accounts);
            this.accounts = accounts;
            this.account = this.accounts[0]

        })
    }

    public setStatus = (message: string) => {
        this.status = message;
    }


    public refreshBalances = () => {
        this.monarchTruffleApp.metaCoin.getBalance.call(this.account, { from: this.account })
            .then((value) => {
                this.balance = value.valueOf();
                this.setStatus(this.balance + ' balance retrieved ' + new Date());
            }).catch((e) => {
                console.log(e);
                this.setStatus("Error getting balance; see log.");
            });
    }

    public sendCoin = () => {

        this.setStatus("Initiating transaction... (please wait)");

        this.monarchTruffleApp.metaCoin.sendCoin(this.receivingAccount, this.sendingAmmount, { from: this.account });

        this.setStatus("Transaction complete!");

        this.refreshBalances();

    }

}


