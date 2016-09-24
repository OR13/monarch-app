
import {EthereumService} from './demo/ethereum.service'
import {IpfsService} from './demo/ipfs.service'
import {MonarchService} from './demo/monarch.service'

import {UserService} from './user/user.service'


export interface IMonarchConfig {
    Version: string;
    EthereumService: EthereumService;
    IpfsService: IpfsService;
    MonarchService: MonarchService;
    firebaseConfig: any;
    firebase: any;
    UserService: any;
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
        apiKey: "AIzaSyBmqo71zTPpZ9aF-RNCtv4XuQl86rL9Qw0",
        authDomain: "project-6582009982322667069.firebaseapp.com",
        databaseURL: "https://project-6582009982322667069.firebaseio.com",
        storageBucket: "project-6582009982322667069.appspot.com",
    };
    $rootScope.App.firebase = w.firebase.initializeApp($rootScope.App.firebaseConfig);
    $rootScope.App.Version = '0.0.0';
    $rootScope.App.UserService = UserService;


    $rootScope.$on('$stateChangeStart', function (evt, to, params) {
        if (to.redirectTo) {
            evt.preventDefault();
            $state.go(to.redirectTo, params, { location: 'replace' })
        }
    });

    // $log.debug('MonarchService.CarePlan', $rootScope.App.MonarchService.CarePlan);

}
