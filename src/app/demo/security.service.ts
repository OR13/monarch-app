
import {IRootScopeService} from '../index.run';

declare var sjcl: any;

export class SecurityService {

    /** @ngInject */
    constructor(
        private $timeout: angular.ITimeoutService,
        private $log: angular.ILogService,
        private $http: angular.IHttpService,
        private $window: angular.IWindowService,
        private $q: angular.IQService,
        private $mdToast: angular.material.IToastService,
        private $state: any,
        private $rootScope: IRootScopeService,
        private localStorageService: any
    ) {


    }

    public init = () => {
        this.$log.debug('SecurityService.init()', sjcl)

        // var password = "password";
        // var plain_text = "Hello World!";

        // var cipher_text = this.encrypt(password, plain_text);

        // this.$log.debug('plain_text: ', plain_text);
        // this.$log.debug('cipher_text: ', cipher_text);

        // var recovered_plain_text = this.decrypt(password, cipher_text);

        // this.$log.debug('recovered_plain_text: ', recovered_plain_text);

        // this.localStorageService.set('password', 'passord');
    }


    public saveAccountSecret = (accountSecret: string) => {
        this.localStorageService.set('AccountSecret', accountSecret);
    }

    public getAccountSecret = () => {
        return this.localStorageService.get('AccountSecret');
    }

    public encryptObject = (passord: string, object: any) => {
        var plain_text = JSON.stringify(object);
        var cipher_text = sjcl.encrypt(passord, plain_text);
        var encrypted_object = JSON.parse(cipher_text);
        return encrypted_object;
    }

    public decryptObject = (passord: string, cipher_text: string) => {
        var plain_text = sjcl.decrypt(passord, JSON.stringify(cipher_text));
        return JSON.parse(plain_text);
    }

}