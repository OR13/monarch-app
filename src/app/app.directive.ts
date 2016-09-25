import {IRootScopeService} from './index.run';

/** @ngInject */
export function monarchApp(): angular.IDirective {

    return {
        restrict: 'A',
        controller: MonarchAppController,
        controllerAs: 'monarchAppCtrl'
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
        public $timeout: angular.ITimeoutService,
        public $rootScope: IRootScopeService,
        private $mdSidenav: angular.material.ISidenavService
    ) {

        this.bodyClass = $state.current.name;
        // this.$log.warn($state.current)

        this.$rootScope.App.UserService.loadSessionUser();

        $rootScope.$watch(() => {
            return $state.current.name;
        }, (stateName: string) => {

            if (stateName) {
                // $log.debug('state: ', stateName)
                this.bodyClass = stateName;
                // this.$log.log($state.current)
            }

            // var isMetaMaskEnabled = this.$rootScope.App.UserService.isMetaMaskInstalled();

            // if (isMetaMaskEnabled) {
            //    // no-op
            // } else {
            //     $timeout(() => {
            //         $state.go('metamask')
            //     }, 25)

            // }

        })
    }
}
