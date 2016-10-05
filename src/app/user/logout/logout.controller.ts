
import {IRootScopeService } from '../../index.run';

import {UserService} from '../user.service'

export class LogoutController {

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

        $log.log('LogoutController...', UserService)

        this.logoutUser();

    }

    public logoutUser = () => {
        this.$log.log('LogoutController.logoutUser')
        this.UserService.logout().then(() => {
            this.$state.go('hello');
        })
    }

}