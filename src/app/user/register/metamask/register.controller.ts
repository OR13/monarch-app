
import {IRootScopeService } from '../../../index.run';

import {UserService} from '../../user.service'

export class RegisterMetaMaskController {

    /* @ngInject */
    constructor(
        public $scope: any,
        public $mdSidenav: any,
        public $http: angular.IHttpService,
        public $log: angular.ILogService,
        public $rootScope: IRootScopeService,
        public $timeout: angular.ITimeoutService,
        public $state: angular.ui.IStateService,
        public toastr: any,
        public UserService: UserService) {

        $log.log('RegisterMetaMaskController...')

    }


    // public registerUser = () => {
    //     this.$log.debug('Register the user...')
    // }

}