import {IRootScopeService} from '../../../index.run';

import {IUser, IActivitySpec, ActivityInstanceStatus, ComponentTypes, IActivityInstance} from '../../../com/monarch.service';

/** @ngInject */
export class BooleanInputV0Controller {

    public instance: IActivityInstance;
    public user: IUser;


    constructor(
        public $window: angular.IWindowService,
        private $scope: angular.IScope,
        private $log: angular.ILogService,
        public $rootScope: IRootScopeService,
        private $mdSidenav: angular.material.ISidenavService,
        private $sce: angular.ISCEService
    ) {

    }

    public submit = (bit: number) => {
        this.$log.debug('user snapshot: ', this.user)

        this.instance.capture.value = bit;

        var indexOfInst = this.user.activity_instances.indexOf(this.instance);

        //remove this instance
        this.user.activity_instances.splice(indexOfInst, 1);

        this.$rootScope.App.MonarchService.captureAll(this.user, this.instance);

        
    }

}