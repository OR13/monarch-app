
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

        this.$log.debug('LOL: ', this.w.Uport)

        let web3 = new Web3()
        let options = {
            ipfsProvider: {
                host: 'ipfs.infura.io',
                port: '5001',
                protocol: 'https',
                root: ''
            }
        }
        let uport = new Uport('MyDApp', options)
        let rpcUrl = "http://localhost:8545"
        let uportProvider = uport.getUportProvider(rpcUrl)

        web3.setProvider(uportProvider)

        uport.getUserPersona()
            .then((persona) => {
                let profile = persona.getProfile()
                console.log(profile)
            })

        // if (!this.w.web3) {


        //     this.$timeout(() => {


        //     }, 3 * 1000)

        // }

    }



}