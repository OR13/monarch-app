import {IRootScopeService} from './index.run';

/** @ngInject */
export function monarchApp(): angular.IDirective {

    return {
        restrict: 'A',
        controller: MonarchAppController,
        controllerAs: 'etherCareAppCtrl'
    };

}

/** @ngInject */
export class MonarchAppController {
    public bodyClass: string;

    constructor(
        public $state: angular.ui.IStateService,
        public $window: angular.IWindowService,
        private $scope: angular.IScope,
        private $log: angular.ILogService,
        public $rootScope: IRootScopeService,
        private $mdSidenav: angular.material.ISidenavService
    ) {

        this.bodyClass = $state.current.name;
        // this.$log.warn($state.current)

        $rootScope.$watch(() => {
            return $state.current.name;
        }, (stateName: string) => {

            if (stateName) {
                $log.debug('state: ', stateName)
                this.bodyClass = stateName;
                // this.$log.log($state.current)
            }

        })
    }
}
