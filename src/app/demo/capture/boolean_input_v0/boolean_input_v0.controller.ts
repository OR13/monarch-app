import {IRootScopeService} from '../../../index.run';

import {IPatient, IActivitySpec, ActivityInstanceStatus, ComponentTypes, IActivityInstance} from '../../monarch.service';

/** @ngInject */
export class BooleanInputV0Controller {

    public instance: IActivityInstance;
    public patient: IPatient;


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
        this.$log.debug('patient snapshot: ', this.patient)

        this.instance.capture.value = bit;

        var indexOfInst = this.patient.activity_instances.indexOf(this.instance);

        //remove this instance
        this.patient.activity_instances.splice(indexOfInst, 1);

        this.$rootScope.App.MonarchService.captureAll(this.patient, this.instance);

        
    }

}