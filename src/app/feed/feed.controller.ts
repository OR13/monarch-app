
import {IRootScopeService } from '../index.run';

import {IUser, IActivitySpec, ActivityInstanceStatus, ComponentTypes, IActivityInstance} from '../com/monarch.service';

declare var KeenAsync: any;

export class FeedController {

    public user: IUser;

    public ct: any;

    public account: any;
    public init_complete: boolean;
    public activity_instances: any;

    /* @ngInject */
    constructor(
        public $scope: angular.IScope,
        public $mdSidenav: angular.material.ISidenavService,
        public $http: angular.IHttpService,
        public $log: angular.ILogService,
        public $rootScope: IRootScopeService,
        public $timeout: angular.ITimeoutService,
        public $interval: angular.IIntervalService,
        public $sce: angular.ISCEService,
        public $mdDialog: any,
        public toastr: any,
        public $firebaseObject: any
    ) {

        this.ct = ComponentTypes;
        this.activity_instances = null;
        this.init_complete = false;


        this.$scope.$watch(() => {
            return this.$rootScope.App.UserService.user;
        }, (user) => {
            if (user && !this.init_complete) {
                this.init(user);
            }
        })

    }



    public init = (user) => {
        this.$rootScope.App.firebase.database().ref('/accounts/' + user.uid)
            .once('value').then((snapshot) => {

                var account = snapshot.val();

                this.account = account;



                if (!account) {
                    this.$rootScope.App.firebase.database().ref('accounts/' + user.uid).set({
                        uid: user.uid,
                        ethereum_accounts: this.$rootScope.App.EthereumService.accounts,
                        name: 'Janet Perkins',
                        image: '/assets/img/avatar.jpeg',
                        activity_suite: this.$rootScope.App.MonarchService.ActivitySuite,
                        activity_instances: []
                    });
                    this.$timeout(() => {
                        this.init(user);
                    }, 1 * 1000);
                } else {
                    this.$log.debug('syncActivityInstances once...');
                    if (!account.activity_instances) {
                        this.$rootScope.App.MonarchService.schedule(account)
                        this.$timeout(() => {
                            this.init(user);
                        }, 1 * 1000);

                    } else {
                        var ref = this.$rootScope.App.firebase.database().ref('/accounts/' + user.uid + '/activity_instances');

                        var syncObject = this.$firebaseObject(ref);

                        syncObject.$bindTo(this.$scope, "feedCtrl.activity_instances");

                        // this.$scope.$watch(() => {
                        //     var b: any = this.$scope;
                        //     return b.testBinding;
                        // }, (data) => {
                        //     this.$log.debug('WHAT data', data)
                        // })

                        var w: any = window;
                        const qr = new w.QRious({
                            element: document.getElementById('ethereum_account_qr_code'),
                            value: this.account.ethereum_accounts[0]
                        })

                        this.$log.debug('qr ', qr)


                    }

                    this.init_complete = true;
                }

                // this.$log.debug(' loaded account: ', account)

            });
    }

}


