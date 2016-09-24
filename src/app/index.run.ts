
import {EthereumService} from './demo/ethereum.service'
import {IpfsService} from './demo/ipfs.service'
import {MonarchService} from './demo/monarch.service'

export interface IMonarchConfig {
    Version: string;
    EthereumService: EthereumService;
    IpfsService: IpfsService;
    MonarchService: MonarchService;
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
    MonarchService: MonarchService
) {

    var w = <any>window;

    $rootScope.App = <IMonarchConfig>{};

    $rootScope.App.Version = '0.0.0';

    $rootScope.App.EthereumService = EthereumService;
    $rootScope.App.IpfsService = IpfsService;
    $rootScope.App.MonarchService = MonarchService;

    $rootScope.$on('$stateChangeStart', function (evt, to, params) {
        if (to.redirectTo) {
            evt.preventDefault();
            $state.go(to.redirectTo, params, { location: 'replace' })
        }
    });

    // $log.debug('MonarchService.CarePlan', $rootScope.App.MonarchService.CarePlan);

}
