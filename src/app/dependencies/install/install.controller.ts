
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

        // REDIRECT LOOP
        // this.watchDependencies();

    }


    public watchDependencies = () => {

        this.$scope.$watch(() => {
            return this.$rootScope.App.isInstallationComplete;
        }, (isComplete: boolean) => {
            this.isInstallationComplete = isComplete;
            this.$state.go('feed');
        });

    }

    public aceLoaded = (_editor) => {

        _editor.setReadOnly(true);

        // Editor part
        var _session = _editor.getSession();
        var _renderer = _editor.renderer;

        var text_val = `
# Install from https://ipfs.io/

# Configure 
ipfs config --json API.HTTPHeaders.Access-Control-Allow-Origin "[\"http://localhost:3000\", "http://monarch.transmute.industries\"]" 

# Run 
ipfs daemon
        `;

        _editor.setValue(text_val);


        // Options

        _session.setUndoManager(new ace.UndoManager());
        _renderer.setShowGutter(false);

        // Events
        // _editor.on("changeSession", function () { });
        // _session.on("change", function () { });
    };
}