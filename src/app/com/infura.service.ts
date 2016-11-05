
import { IRootScopeService } from '../index.run';
import { SecurityService } from './security.service';


declare var Web3: any;
declare var Uport: any;

export class InfuraService {

    public w: any;
    public web3: any;

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

        // this.web3 = new Web3();

        // this.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));


        //   this.$log.debug('LOL: ', this.w.Uport)

        //   this.$timeout(() => {

        //     let options = {
        //         ipfsProvider: {
        //             host: 'ipfs.infura.io',
        //             port: '5001',
        //             protocol: 'https',
        //             root: ''
        //         }
        //     }
        //     let uport = new Uport('MyDApp', options)

        //     let rpcUrl = "https://localhost:8545"

        //     let uportProvider = uport.getUportProvider(rpcUrl)

        //     this.web3.setProvider(uportProvider)

        //     $log.debug('window: ', this.web3)

        //         // uport.getUserPersona()
        //         //     .then((persona) => {
        //         //         let profile = persona.getProfile()
        //         //         console.log(profile)
        //         //     })

        //     }, 3 * 1000)

        if (!this.web3) {


        }

    }



}
