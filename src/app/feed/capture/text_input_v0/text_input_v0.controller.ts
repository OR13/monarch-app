import {IRootScopeService} from '../../../index.run';

import {IUser, IActivitySpec, ActivityInstanceStatus, ComponentTypes, IActivityInstance} from '../../../com/monarch.service';

/** @ngInject */
export class TextInputV0Controller {

    public instance: IActivityInstance;


    constructor(
        public $window: angular.IWindowService,
        private $scope: angular.IScope,
        private $log: angular.ILogService,
        public $rootScope: IRootScopeService,
        private $mdSidenav: angular.material.ISidenavService,
        private $sce: angular.ISCEService

    ) {

    }

    public submit = () => {


        this.$rootScope.App.MonarchService.captureInstance(this.instance);


    }

}