import {IRootScopeService} from '../../../index.run';

import {IUser, IActivitySpec, ActivityInstanceStatus, ComponentTypes, IActivityInstance} from '../../../com/monarch.service';

/** @ngInject */
export class ContentViewV0Controller {

    public instance: IActivityInstance;
    public video_url: string;


    constructor(
        public $window: angular.IWindowService,
        private $scope: angular.IScope,
        private $log: angular.ILogService,
        public $rootScope: IRootScopeService,
        private $mdSidenav: angular.material.ISidenavService,
        private $sce: angular.ISCEService

    ) {
        this.video_url = $sce.trustAsResourceUrl(this.instance.activity_spec.schema_config.video_url);
    }

    public submit = (rating: number) => {

        this.instance.capture.value = rating;

        this.$rootScope.App.MonarchService.captureInstance(this.instance);
    }

}