/// <reference path="../../.tmp/typings/tsd.d.ts" />

import { config } from '../app/index.config';
import { routerConfig } from '../app/index.route';
import { runBlock } from '../app/index.run';
import { FeedController } from '../app/feed/feed.controller';

import { SecurityService} from '../app/com/security.service';
import { EthereumService} from '../app/com/ethereum.service';
import { IpfsService} from '../app/com/ipfs.service';

import { MonarchService} from '../app/com/monarch.service';
import { UserService} from '../app/user/user.service';

import { LoginController} from '../app/user/login/login.controller';
import { LogoutController} from '../app/user/logout/logout.controller';
import { RegisterController} from '../app/user/register/monarch/register.controller';
import { InstallDependenciesController} from '../app/dependencies/install/install.controller';

import { HistoryController} from '../app/history/history.controller';
import { PulseController} from '../app/pulse/pulse.controller';


import { appNavbar } from '../app/navbar/navbar';
import { monarchApp } from '../app/app.directive'



import { ContentViewV0Controller } from '../app/feed/capture/content_view_v0/content_view_v0.controller'
import { ecContentViewV0 } from '../app/feed/capture/content_view_v0/content_view_v0.directive'


import { TextInputV0Controller } from '../app/feed/capture/text_input_v0/text_input_v0.controller'
import { ecTextInputV0 } from '../app/feed/capture/text_input_v0/text_input_v0.directive'


import { BooleanInputV0Controller } from '../app/feed/capture/boolean_input_v0/boolean_input_v0.controller'
import { ecBooleanInputV0 } from '../app/feed/capture/boolean_input_v0/boolean_input_v0.directive'

declare var moment: moment.MomentStatic;
declare var jQuery: any;


angular.module('monarchApp', [
    'ngMaterial',
    'ngAnimate',
    'ngCookies',
    'ngSanitize',
    'ngMessages',
    'ngAria',
    'ngResource',
    'angularMoment',
    'ui.router',
    'toastr',
    'LocalStorageModule',
    'ui.ace',
    'firebase',
    'angular-clipboard'
])

    .constant('moment', moment)
    .constant('keen_project_id', '57e6bb3f8db53dfda8a70c6a')
    .constant('keen_read_key', 'CD887804EA83FC44352DBF6A88DABB0E096C7BDBE3087C684B55CDE7A444856771AD9C60E9A0DC7BE22B6EF9A4C23EAE95D540775DE2C43250AE9F98B5E3B64D43B74A249AFF999F668E5557D257C709725C609A5623E0EA6C3E2055F515A0E7')
    .constant('keen_write_key', 'AFAF1531EC4B1A99E879B8EB86DD3A53D8724A6FE1FAB0A06E8133EBF66CF957475FB96CB64880EEA8C8E203C4A1273BECF44AE5CDD2189789C6F62509E922D7530AAA74577E6FFA5F26542B49869FF46513DF9B24FD85F57584E8CC50EA36B2')


    .config(config)
    .config(routerConfig)


    .run(runBlock)

    .service('EthereumService', EthereumService)
    .service('SecurityService', SecurityService)
    .service('MonarchService', MonarchService)
    .service('UserService', UserService)


    .service('IpfsService', IpfsService)

    .controller('FeedController', FeedController)


    .controller('LoginController', LoginController)
    .controller('LogoutController', LogoutController)
    .controller('RegisterController', RegisterController)
    .controller('InstallDependenciesController', InstallDependenciesController)

    .controller('HistoryController', HistoryController)
    .controller('PulseController', PulseController)


    .controller('ContentViewV0Controller', ContentViewV0Controller)
    .directive('ecContentViewV0', ecContentViewV0)

    .controller('TextInputV0Controller', TextInputV0Controller)
    .directive('ecTextInputV0', ecTextInputV0)

    .controller('BooleanInputV0Controller', BooleanInputV0Controller)
    .directive('ecBooleanInputV0', ecBooleanInputV0)

    .directive('appNavbar', appNavbar)
    .directive('monarchApp', monarchApp)












