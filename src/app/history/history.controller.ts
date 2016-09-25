
import {IRootScopeService } from '../index.run';

import {UserService} from '../user/user.service'

declare var Keen: any;

export class HistoryController {

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
        public UserService: UserService,
        public keen_project_id: string,
        public keen_read_key: string) {

        $log.log('HistoryController...')

        this.renderPageViews();

    }


    public loadHistory = () => {
        // this.$log.log('HistoryController.loginWithGithub')
        // this.UserService.loginWithGithub().then(() => {
        //     this.$state.go('feed');
        // });
    }

    //   public renderLast100PatientSnapshots = () => {

    //     var client = new Keen({
    //         projectId: this.keen_project_id,
    //         readKey: this.keen_read_key,
    //     });


    //     // Configure a Dataviz instance
    //     var chart = new Keen.Dataviz()
    //         .el('#chart_1')
    //         .colors(["#6ab975"])
    //         .height(180)
    //         .type('metric')
    //         .prepare();

    //     // Run a query
    //     client
    //         .query('count', {
    //             event_collection: "instance_snapshot",
    //             targetProperty: "instance.capture.value",
    //             timeframe: "this_14_days",
    //             timezone: "UTC"
    //         })
    //         .then(function (res) {
    //             // Handle the result
    //             chart
    //                 .data(res)
    //                 .render();
    //         })
    //         .catch(function (err) {
    //             // Handle errors
    //             chart.message(err.message);
    //         });
    // }

    public renderPageViews = () => {

        var client = new Keen({
            projectId: this.keen_project_id,
            readKey: this.keen_read_key,
        });


        // Configure a Dataviz instance
        var chart = new Keen.Dataviz()
            .el('#chart_2')
            .colors(["#6ab975"])
            .height(180)
            .type('area')
            .prepare();

        // Run a query
        client
            .query('count', {
                event_collection: 'pageviews',
                interval: 'daily',
                timeframe: 'this_14_days'
            })
            .then(function (res) {
                // Handle the result
                chart
                    .data(res)
                    .render();
            })
            .catch(function (err) {
                // Handle errors
                chart.message(err.message);
            });
    }

}