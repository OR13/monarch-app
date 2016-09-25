
import {EthereumService} from './com/ethereum.service'
import {IpfsService} from './com/ipfs.service'
import {MonarchService} from './com/monarch.service'

import {UserService} from './user/user.service'


export interface IMonarchConfig {
    Version: string;
    EthereumService: EthereumService;
    IpfsService: IpfsService;
    MonarchService: MonarchService;
    firebaseConfig: any;
    firebase: any;
    UserService: any;
    isMetaMaskInstalled: boolean;
    isIPFSInstalled: boolean;
    isInstallationComplete: boolean;
}

export interface IRootScopeService extends angular.IRootScopeService {
    App: IMonarchConfig

}

/** @ngInject */
export function runBlock(
    $location: any,
    $timeout: angular.ITimeoutService,
    $log: angular.ILogService,
    $rootScope: IRootScopeService,
    $state: any,
    $mdToast: any,
    EthereumService: EthereumService,
    IpfsService: IpfsService,
    MonarchService: MonarchService,
    UserService: UserService
) {

    var w = <any>window;

    $rootScope.App = <IMonarchConfig>{};

    $rootScope.App.Version = '0.0.0';

    $rootScope.App.EthereumService = EthereumService;
    $rootScope.App.IpfsService = IpfsService;
    $rootScope.App.MonarchService = MonarchService;

    $rootScope.App.firebaseConfig = {
        apiKey: "AIzaSyDIXrTv0TD9zdaCy5n_QXm6_VMaS-1B3sQ",
        authDomain: "transmute-industries.firebaseapp.com",
        databaseURL: "https://transmute-industries.firebaseio.com",
        storageBucket: "transmute-industries.appspot.com",
        messagingSenderId: "1068223304219"
    };
    $rootScope.App.firebase = w.firebase.initializeApp($rootScope.App.firebaseConfig);
    $rootScope.App.Version = '0.0.0';
    $rootScope.App.UserService = UserService;

    var w: any = window;
 
    $rootScope.$watch(() => {
        return $rootScope.App.isMetaMaskInstalled && $rootScope.App.isIPFSInstalled;
    }, (isComplete: boolean) => {
        $rootScope.App.isInstallationComplete = isComplete;
    });

    $rootScope.$on('$stateChangeStart',  (evt, to, params)=> {

        $rootScope.App.isMetaMaskInstalled = w.web3 !== undefined;

        if (!$rootScope.App.isInstallationComplete) {
            $log.debug('meta mask is disabled... ')
            $timeout(() => {
                var t = $mdToast.simple();
                t.content(`You must install some dependencies.`);
                t.position('top right');
                $mdToast.show(t);
                $state.go('install');
            }, 1 * 1000)

        }

        if (to.redirectTo) {
            evt.preventDefault();
            $state.go(to.redirectTo, params, { location: 'replace' })
        }

    });

    // $log.debug('MonarchService.CarePlan', $rootScope.App.MonarchService.CarePlan);

}
