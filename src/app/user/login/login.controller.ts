
import {IRootScopeService } from '../../index.run';

import {UserService} from '../user.service'

export class LoginController {

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

        $log.log('LoginController...', UserService)

    }


    public loginWithGithub = () => {
        this.$log.log('LoginController.loginWithGithub')
        this.UserService.loginWithGithub().then(() => {
            this.$state.go('feed');
        });
    }

}