
import {IRootScopeService } from '../../index.run';

import {UserService} from '../../user/user.service'


declare var ace: any;
export class InstallDependenciesController {

    public isInstallationComplete: boolean;

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

        $log.log('InstallDependenciesController...')

        this.watchDependencies();

    }


    public watchDependencies = () => {

        this.$scope.$watch(() => {
            return this.$rootScope.App.isMetaMaskInstalled && this.$rootScope.App.isIPFSInstalled;
        }, (isComplete: boolean) => {
            this.isInstallationComplete = isComplete;
        });

    }


    public aceLoaded = (_editor) => {

        _editor.setReadOnly(true);

        // Editor part
        var _session = _editor.getSession();
        var _renderer = _editor.renderer;



        // Options

        _session.setUndoManager(new ace.UndoManager());
        _renderer.setShowGutter(false);

        // Events
        // _editor.on("changeSession", function () { });
        // _session.on("change", function () { });
    };
}