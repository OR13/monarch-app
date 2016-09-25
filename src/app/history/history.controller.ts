
import {IRootScopeService } from '../index.run';

import {UserService} from '../user/user.service'

declare var Keen: any;

export class HistoryController {

    init_complete: boolean;
    activity_instance_captures: any;

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
        public UserService: UserService,
        public keen_project_id: string,
        public keen_read_key: string,
        private $firebaseObject: any
    ) {

        $log.log('HistoryController...')


        this.$scope.$watch(() => {
            return this.$rootScope.App.UserService.user;
        }, (user) => {
            if (user && !this.init_complete) {
                this.init(user);
            }
        })

    }


    public init = (user) => {

        var ref = this.$rootScope.App.firebase.database().ref('/accounts/' + user.uid + '/activity_instance_captures');

        var syncObject = this.$firebaseObject(ref);

        syncObject.$bindTo(this.$scope, "historyCtrl.activity_instance_captures");


    }



}