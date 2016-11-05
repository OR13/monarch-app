
import { IRootScopeService } from '../index.run';

declare var HookedWeb3Provider: any;
declare var Web3: any;
declare var lightwallet: any;
declare var async: any;

var web3 = new Web3();
var global_keystore;


export class EthLightWalletController {


    public numAddr: number;

    public userEntropy: string;

    public sendFrom: string;
    public sendTo: string;
    public sendValueAmount: number;

    public functionCaller: string;

    public contractAddr: string;
    public contractAbi: string;
    public functionName: string;
    public functionArgs: string;


    public txhash: string;

    public addresses: any;

    public hide_generateRandomSeed: boolean;
    public hide_deriveKeyFromPassword: boolean;
    public hide_sendEth: boolean;

    public randomSeed: string;

    /* @ngInject */
    constructor(
        public $scope: any,
        public $mdSidenav: any,
        public $http: angular.IHttpService,
        public $log: angular.ILogService,
        public $rootScope: IRootScopeService,
        public $timeout: angular.ITimeoutService,
        public $state: angular.ui.IStateService,
        public toastr: any
    ) {
        $log.log('EthLightWalletController...')
        this.numAddr = 10;

        this.hide_deriveKeyFromPassword = true;
        this.hide_sendEth = true;

    }

    public newAddresses = (password) => {

        if (password == '') {
            password = prompt('Enter password to retrieve addresses', 'Password');
        }
        var numAddr = this.numAddr

        lightwallet.keystore.deriveKeyFromPassword(password, (err, pwDerivedKey) => {
            global_keystore.generateNewAddress(pwDerivedKey, numAddr);
            var addresses = global_keystore.getAddresses();

            this.addresses = addresses;

            this.sendFrom = '0x0aa0894839cc227adb7e4c17d3b8e12f8aab9ecd'; // this.addresses[0];
            this.sendTo = this.addresses[1];




            this.getBalances();
        })
    }

    public getBalances = () => {

        var addresses = global_keystore.getAddresses();
        this.$log.debug('Retrieving addresses...');
        async.map(addresses, web3.eth.getBalance, (err, balances) => {
            async.map(addresses, web3.eth.getTransactionCount, (err, nonces) => {
                for (var i = 0; i < addresses.length; ++i) {
                    this.$log.debug(addresses[i], (balances[i] / 1.0e18), nonces[i]);
                }
            })

        })
    }



    public generateRandomSeed = () => {
        var extraEntropy = angular.copy(this.userEntropy);
        this.userEntropy = '';
        this.randomSeed = lightwallet.keystore.generateRandomSeed(extraEntropy);

        // var password = prompt(infoString, 'Password');

        this.hide_generateRandomSeed = true;
        this.hide_deriveKeyFromPassword = false;

    }

    public deriveKeyFromPassword = (password: string) => {
        lightwallet.keystore.deriveKeyFromPassword(password, (err, pwDerivedKey) => {
            global_keystore = new lightwallet.keystore(
                this.randomSeed,
                pwDerivedKey);

            this.newAddresses(password);
            this.setWeb3Provider(global_keystore);
            this.getBalances();

            this.hide_deriveKeyFromPassword = true;
            this.hide_sendEth = false;

            this.$scope.$apply();
        })
    }

    // public setSeed = () => {
    //     var password = prompt('Enter Password to encrypt your seed', 'Password');

    //     lightwallet.keystore.deriveKeyFromPassword(password, function (err, pwDerivedKey) {
    //         global_keystore = new lightwallet.keystore(
    //             document.getElementById('seed').value,
    //             pwDerivedKey);
    //         document.getElementById('seed').value = ''

    //         this.newAddresses(password);
    //         this.setWeb3Provider(global_keystore);

    //         this.getBalances();
    //     })
    // }

    // public showSeed = () => {
    //     var password = prompt('Enter password to show your seed. Do not let anyone else see your seed.', 'Password');
    //     lightwallet.keystore.deriveKeyFromPassword(password, function (err, pwDerivedKey) {
    //         var seed = global_keystore.getSeed(pwDerivedKey);
    //         alert('Your seed is: "' + seed + '". Please write it down.')
    //     })
    // }

    public sendEth = () => {
        var fromAddr = this.sendFrom
        var toAddr = this.sendTo

        var value = this.sendValueAmount * 1.0e18
        var gasPrice = 50000000000
        var gas = 50000

        web3.eth.sendTransaction({ from: fromAddr, to: toAddr, value: value, gasPrice: gasPrice, gas: gas }, (err, txhash) => {
            console.log('error: ' + err)
            console.log('txhash: ' + txhash)
            this.txhash = txhash;
            this.$scope.$apply();
        })
    }

    public functionCall = () => {
        var fromAddr = this.functionCaller;
        var contractAddr = this.contractAddr;
        var abi = JSON.parse(this.contractAbi)
        var contract = web3.eth.contract(abi).at(contractAddr)
        var functionName = this.functionName
        var args = JSON.parse('[' + this.functionArgs + ']')
        var value = this.sendValueAmount * 1.0e18
        var gasPrice = 50000000000
        var gas = 3141592
        args.push({ from: fromAddr, value: value, gasPrice: gasPrice, gas: gas })
        var callback = (err, txhash) => {
            console.log('error: ' + err)
            console.log('txhash: ' + txhash)

            this.txhash = txhash;
        }
        args.push(callback)
        contract[functionName].apply(this, args)
    }


    public setWeb3Provider = (keystore) => {
        var web3Provider = new HookedWeb3Provider({
            host: "http://localhost:8545",
            transaction_signer: keystore
        });
        web3.setProvider(web3Provider);
    }

}