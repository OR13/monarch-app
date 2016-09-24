import {IRootScopeService} from '../index.run';

/** @ngInject */
export function appNavbar(): angular.IDirective {

  return {
    restrict: 'E',
    scope: {},
    templateUrl: 'app/navbar/navbar.html',
    controller: NavbarController,
    controllerAs: 'vm',
    bindToController: true
  };

}

/** @ngInject */
export class NavbarController {

  constructor(
    private $window: angular.IWindowService,
    private $scope: angular.IScope,
    private $log: angular.ILogService,
    private $rootScope: IRootScopeService,
    private $mdSidenav: angular.material.ISidenavService
   
  ) {


  }

  


}
